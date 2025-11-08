import os
import shutil
import random
import math

# ---CONFIGURATION---
#1. Set the path to the unorganized dataset folder
SOURCE_DIR = "archive"

#2. Set the path for the new, organised dataset
OUTPUT_DIR = "Coconut_dataset"

#3. Set the split ratio (0.2 = 20% for testing)
TEST_SPLIT_RATIO = 0.2
# ----------------------

# Create the out directories (train and test)
train_dir = os.path.join(OUTPUT_DIR, "train")
test_dir = os.path.join(OUTPUT_DIR, "test")

os.makedirs(train_dir, exist_ok=True)
os.makedirs(test_dir, exist_ok=True)

print(f"Splitting dataset from {SOURCE_DIR} into {OUTPUT_DIR}...")

#Get a list of all class folders (e.g., 'CCI_Caterpillars', 'Healthy_Leaves', etc.)
try:
    classes = [d for d in os.listdir(SOURCE_DIR) if os.path.isdir(os.path.join(SOURCE_DIR, d))]
    print(f"Found classes: {classes}\n")
except FileNotFoundError:
    print(f"ERROR: Source directory '{SOURCE_DIR}' not found.")
    print("Please download the dataset and palce it in the same folder a this script.")
    exit()
    
# Loop over each class folder
for class_name in classes:
    print(f"--- Processing class: {class_name} ---")
    
    # Create matching subfolders in train and test
    train_class_dir = os.path.join(train_dir, class_name)
    test_class_dir = os.path.join(test_dir, class_name)
    os.makedirs(train_class_dir, exist_ok=True)
    os.makedirs(test_class_dir, exist_ok=True)
    
    #Get a list of all image files for this class
    source_class_dir = os.path.join(SOURCE_DIR, class_name)
    all_files = [f for f in os.listdir(source_class_dir) if f.endswith(('.jpg', '.jpeg','.png'))]
    
    # Shuffle the list randomly
    random.shuffle(all_files)
    
    # Calculate the split index
    split_index = math.floor(len(all_files) * (1 - TEST_SPLIT_RATIO))
    
    # Split the list into train and test sets
    train_files = all_files[:split_index]
    test_files = all_files[split_index:] 
    
    # Copy fiels into the new directories
    for f in train_files:
        shutil.copy(os.path.join(source_class_dir, f), os.path.join(train_class_dir, f))
        
    for f in test_files:
        shutil.copy(os.path.join(source_class_dir, f), os.path.join(test_class_dir, f))
    
    print(f"Total: {len(all_files)} | Train: {len(train_files)} | Test: {len(test_files)}\n")
 
print("--- DONE ---")
print(f"New dataset created at '{OUTPUT_DIR}'") 
                     