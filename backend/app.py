import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow import keras
from PIL import Image
import cv2  # OpenCV for BGR conversion

UPLOAD_FOLDER = "uploads"
IMG_SIZE = (150, 150)

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- Step 1: Load ALL Models (Including Gatekeeper) ---
print("Loading models...")
arecanut_model = keras.models.load_model("IntelImageClass_ResNet20v1_model.006.h5") 
coconut_model = keras.models.load_model("IntelImageClass(c)_ResNet20v1_model.008.h5")
# NEW: Load the Gatekeeper Model
gatekeeper_model = keras.models.load_model("gatekeeper_model.h5")
print("All models loaded.")

# --- Step 2: Define Class Names ---
arecanut_class_names = [
    'Stem cracking', 'Stem bleeding', 'Healthy Leaf', 
    'Yellow leaf disease', 'Healthy foot', 'Healthy Trunk', 
    'Mahali Koleroga', 'Bud borer', 'Healthy Nut'
]

coconut_class_names = [
    'Caterpillar Infestation', 'Catepillar Leaflets', 'Healthy Leaves', 
    'Wilt Disease (Leaf Drying)', 'Wilt Disease (Drooping)', 'Wilt Disease (Yellowing)'
]

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    # --- Step 3: Get Inputs ---
    image = request.files["image"]
    cropType = request.form.get("cropType") 

    if not cropType:
        return jsonify({"error": "No cropType specified"}), 400

    # --- Step 4: Choose the target disease model ---
    if cropType == "arecanut":
        target_model = arecanut_model
        class_names = arecanut_class_names
    elif cropType == "coconut":
        target_model = coconut_model
        class_names = coconut_class_names
    else:
        return jsonify({"error": f"Unknown cropType: {cropType}"}), 400

    # --- Step 5: Save & Pre-process ---
    image_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
    image.save(image_path)

    # Open with PIL (RGB)
    img = Image.open(image_path).resize(IMG_SIZE).convert("RGB")
    img_rgb = np.array(img) # Convert to NumPy array
    
    # =========================================================================
    # 🛡️ GATEKEEPER CHECK (AI Filter)
    # =========================================================================
    # Preprocess for Gatekeeper: Scale 0-1, Shape (1, 150, 150, 3)
    gatekeeper_input = np.expand_dims(img_rgb / 255.0, axis=0)
    
    # Predict Validity (0 = Invalid, 1 = Valid)
    validity_score = gatekeeper_model.predict(gatekeeper_input)[0][0]
    print(f"Gatekeeper Score (Valid=1.0): {validity_score:.4f}")

    # Threshold: If score is less than 0.5, it's likely "Invalid"
    if validity_score < 0.5:
        return jsonify({
            "error": "Image rejected by AI Gatekeeper. This does not look like a valid Arecanut or Coconut plant."
        }), 400
    # =========================================================================

    # =========================================================================
    # 🎨 COLOR CHECK (Existing Logic)
    # =========================================================================
    hsv_img = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2HSV)
    
    # Updated ranges to catch broad spectrum (Red-Yellow-Green)
    # Note: I'm keeping your broad ranges, but ensure they match what worked for you.
    green_mask = cv2.inRange(hsv_img, (30, 30, 30), (90, 255, 255))
    brown_mask = cv2.inRange(hsv_img, (10, 50, 50), (30, 255, 255))
    
    # You might want to use the broader range we discussed earlier if this fails for stems:
    # lower_plant = np.array([0, 20, 20]); upper_plant = np.array([100, 255, 255])
    # For now, keeping your existing code logic:
    plant_ratio = (np.sum(green_mask) + np.sum(brown_mask)) / (hsv_img.shape[0] * hsv_img.shape[1] * 255)
    
    if plant_ratio < 0.05: # If less than 5% of the image is plant-colored
         return jsonify({"error": "Please upload a clear image of a plant (Color Check Failed)."}), 400
    # =========================================================================

    # --- Step 6: Disease Prediction (If filters passed) ---
    
    # Convert RGB to BGR for the ResNet model (Fixing the Train/Serve Skew)
    img_bgr = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)
    
    # Normalize and add batch dimension
    img_array = np.expand_dims(img_bgr / 255.0, axis=0)
    
    prediction = target_model.predict(img_array)[0]

    result_index = int(np.argmax(prediction))
    result_label = class_names[result_index]

    response = {
        "disease": result_label,
        "scores": {class_names[i]: float(prediction[i]) for i in range(len(class_names))}
    }
    
    return jsonify(response)

if __name__ == "__main__":
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True)