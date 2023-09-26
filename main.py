# import os
# import sys
# import subprocess

# if not os.environ.get("VIRTUAL_ENV"):
#     # Get the path to the current script
#     script_path = os.path.abspath(__file__)

#     # Calculate the project directory by going up one level from the script's location
#     project_directory = os.path.dirname(os.path.dirname(script_path))

#     # Check if a virtual environment named "venv" exists in the project directory
#     venv_directory = os.path.join(project_directory, "venv")
#     if os.path.isdir(venv_directory):
#         # Construct the activation command based on the platform
#         if sys.platform == "win32":
#             activate_script = "Scripts/activate"
#         else:
#             activate_script = "bin/activate"

#         # Activate the virtual environment
#         activate_cmd = os.path.join(venv_directory, activate_script)
#         subprocess.call(activate_cmd, shell=True)

# from tensorflow.keras.models import load_model
# import os
# from deep_learning_pipeline import Model_Pipeline
# import json

# model = load_model(os.path.join('model', 'water_problem_classifier.h5'))
# pipeline = Model_Pipeline()
# answer = pipeline.predict(model)

# # print(answer)


# def predict():
#     temp = answer
#     return temp
# # file_name = 'temp.json'
# #
# # with open(file_name, "w") as json_file:
# #     json.dump(temp, json_file)
# # print('Data Written to Json file.')
# # print(type(os.path.join('temp.json')))


from tensorflow.keras.models import load_model
import os
from deep_learning_pipeline import Model_Pipeline

model = load_model(os.path.join('model', 'water_problem_classifier.h5'))
pipeline = Model_Pipeline()
answer = pipeline.predict(model)
print(answer)
# def predict():
#     print(answer)
#     return answer
# predict()


