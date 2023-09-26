import os
import subprocess
import sys
import re

def activate_virtualenv(virtualenv_name):
    if sys.platform == "win32":
        activate_script = os.path.join(virtualenv_name, "Scripts", "activate")
        return activate_script
    else:
        activate_script = os.path.join(virtualenv_name, "bin", "activate")
        return f'source "{activate_script}"'
    
virtualenv_name = "venv"  # Replace with your virtual environment name
activate_cmd = activate_virtualenv(virtualenv_name)

def pred():
    output = subprocess.check_output(f'"{activate_cmd}" && python main.py', shell=True, encoding='utf-8')
    pattern = r'\d+s'
    
    # Use regex to filter out lines that match the pattern
    output_lines = output.splitlines()
    output = "".join(line for line in output_lines if not re.search(pattern, line))
    print(output)
    return output
pred()