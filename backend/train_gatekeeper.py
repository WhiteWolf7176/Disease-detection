import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

# --- CONFIGURATION ---
# POINT THIS TO YOUR NEW FOLDER
TRAIN_DIR = '../Gatekeeper_Data/train' 
TEST_DIR = '../Gatekeeper_Data/test'
IMG_SIZE = (150, 150)
BATCH_SIZE = 32

# 1. Data Generators (Data Augmentation)
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    horizontal_flip=True,
    fill_mode='nearest'
)

test_datagen = ImageDataGenerator(rescale=1./255)

train_generator = train_datagen.flow_from_directory(
    TRAIN_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='binary' # Important: Binary classification (Valid vs Invalid)
)

validation_generator = test_datagen.flow_from_directory(
    TEST_DIR,
    target_size=IMG_SIZE,
    batch_size=BATCH_SIZE,
    class_mode='binary'
)

# 2. Build Model (Transfer Learning with MobileNetV2 - Fast & Light)
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(150, 150, 3))
base_model.trainable = False # Freeze base model initially

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(128, activation='relu')(x)
x = Dropout(0.5)(x)
# Output layer: 1 neuron, sigmoid activation for binary classification (0 or 1)
predictions = Dense(1, activation='sigmoid')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# 3. Compile
model.compile(optimizer=Adam(learning_rate=0.0001),
              loss='binary_crossentropy',
              metrics=['accuracy'])

# 4. Train
print("Starting training...")
history = model.fit(
    train_generator,
    epochs=5, # 5 epochs is usually enough for such a distinct task
    validation_data=validation_generator
)

# 5. Save
model.save('gatekeeper_model.h5')
print("Gatekeeper Model Saved as 'gatekeeper_model.h5'")