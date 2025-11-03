import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from tensorflow import keras
from PIL import Image

UPLOAD_FOLDER = "uploads"
IMG_SIZE = (150, 150)

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# ✅ Load model using keras.models.load_model
model = keras.models.load_model("IntelImageClass_ResNet20v1_model.006.h5")
class_names = ['Stem cracking', 'Stem bleeding', 'Healthy Leaf', 'Yellow leaf disease', 'Healthy foot', 'Healthy Trunk', 'Mahali Koleroga', 'Bud borer', 'Healthy Nut']



@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    image = request.files["image"]
    image_path = os.path.join(app.config["UPLOAD_FOLDER"], image.filename)
    image.save(image_path)

    img = Image.open(image_path).resize(IMG_SIZE).convert("RGB")
    img_array = np.expand_dims(np.array(img) / 255.0, axis=0)

    prediction = model.predict(img_array)[0]  # First row of predictions

    result_index = int(np.argmax(prediction))
    result_label = class_names[result_index]

    # Build response
    response = {
        "disease": result_label,
        "scores": {class_names[i]: float(prediction[i]) for i in range(len(class_names))}
    }

    return jsonify(response)

if __name__ == "__main__":
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True)
