import matplotlib.pyplot as plt
import numpy as np
import os
import cv2
import imghdr
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Dense, Flatten
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.metrics import Precision, Recall
from tensorflow.keras.models import load_model
import tensorflow as tf


class Model_Pipeline:
    def __init__(self):
        self.img_path = 'test_images'
        self.img_extn = ['jpeg', 'JPEG', 'png', 'PNG' 'jpg', 'JPG', 'bmp', 'BMP']
        self.image = None
    
    def load_image(self, path_of_img):
        tip = imghdr.what(path_of_img)
        
        if tip not in self.img_extn:
            input_image_path = path_of_img
            
            from PIL import Image
            
            # Open the non-JPG image
            input_image = Image.open(input_image_path) 
            
            # Get the file name and extension from the input image path
            file_name, file_extension = os.path.splitext(input_image_path)
            
            # Save as JPG with the same file name
            output_image_path = f'{file_name}.jpg'
            input_image.save(output_image_path, 'JPEG')
        
        self.image = cv2.imread(path_of_img)
        # plt.imshow(self.image)
    
            
    def resize_image(self, target_size=(256, 256)):
        self.image = tf.image.resize(self.image, target_size)

    def delete_test_images(self):
        for image in os.listdir(os.path.join('test_images')):
            img_path = img_path = os.path.join('test_images', image)
            os.remove(img_path)

    def get_prediction(self, yhat):
        ct = 0
        maxi = -1e20
        i = -1
        for ele in yhat[0]:
            if ele > maxi:
                i = ct
                maxi = ele
            ct = ct+1
        return i
    
    def predict(self, model):
        # Check if the image exist and is of correct format in jpg, png, bmp, jpeg.
        image_exist = 0
        
        for image in os.listdir(os.path.join('test_images')):
            img_path = os.path.join('test_images', image)
            # print(img_path)
            
            if os.path.exists(img_path):
                image_exist = 1
                self.load_image(img_path)
                
                # Now we have the image, lets resize it.
                self.resize_image()                
                
                # Now let's predict the image as a correct water problem.
                yhat = model.predict(np.expand_dims(self.image/255, 0))
                ans = self.get_prediction(yhat)
                # self.delete_test_images()
                if(ans == 0):
                    return 0  #pond
                elif ans == 1:
                    return 1  #drainage
                elif ans == 2:
                    return 2  #flood
                else:
                    return 3 #burst pipe/infrastructure problem
            
        if image_exist == 0:
            return -1
        
    
    


# # In[18]:


# pipe = Model_Pipeline()
# pipe.predict(test_new_model)
# # print(pipe.image)


# # In[20]:


# import pickle
# pickle.dump(pipe, open(os.path.join('model', 'pipeline.pkl'), 'wb'))