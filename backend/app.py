import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow import keras
from PIL import Image
import cv2  # OpenCV for BGR conversion

UPLOAD_FOLDER = "uploads"
IMG_SIZE = (150, 150) # Make sure this matches your training!

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# --- Step 1: Load BOTH models ---
# (Make sure to rename your original model to this)
arecanut_model = keras.models.load_model("IntelImageClass_ResNet20v1_model.006.h5") 
coconut_model = keras.models.load_model("IntelImageClass(c)_ResNet20v1_model.008.h5")

# --- Step 2: Define BOTH class name lists ---
arecanut_class_names = [
    'Stem cracking', 'Stem bleeding', 'Healthy Leaf', 
    'Yellow leaf disease', 'Healthy foot', 'Healthy Trunk', 
    'Mahali Koleroga', 'Bud borer', 'Healthy Nut'
]

# TODO: YOU MUST REPLACE THIS LIST with your actual coconut disease folder names
coconut_class_names = [
    'CCI_Caterpillars', 'CCI_Leaflets', 'Healthy_Leaves', 
    'WCLWD_DryingOfLeaflets', 'WCLWD_Flaccidity', 'WCLWD_Yellowing'
]


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    # --- Step 3: Get BOTH the image and the cropType ---
    image = request.files["image"]
    
    # This line is NEW. It reads the "plant_type" from the form.
    cropType = request.form.get("cropType") 

    if not cropType:
        return jsonify({"error": "No cropType specified"}), 400

    # --- Step 4: Choose the correct model and classes ---
    if cropType == "arecanut":
        model = arecanut_model
        class_names = arecanut_class_names
    elif cropType == "coconut":
        model = coconut_model
        class_names = coconut_class_names
    else:
        return jsonify({"error": f"Unknown cropType: {cropType}"}), 400

    # --- Step 5: Pre-process the image (Same as before) ---
    # Save the image temporarily
    image_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
    image.save(image_path)

    # Open with PIL (RGB)
    img = Image.open(image_path).resize(IMG_SIZE).convert("RGB")
    
    # Convert to NumPy array (RGB)
    img_rgb = np.array(img)
    
    # Convert RGB to BGR for the model
    img_bgr = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2BGR)
    
    # Normalize and add batch dimension
    img_array = np.expand_dims(img_bgr / 255.0, axis=0)
    
    # --- Step 6: Predict (The rest of the code is the same!) ---
    prediction = model.predict(img_array)[0]

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