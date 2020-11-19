import json
import sys, os
from argparse import Namespace

# ----------------------------------------------------------------------------------------------- #

# Get the required window size and objects
data = sys.argv[1]
params = json.loads(data)

textData = params['text']
lineData = params['line']
rectData = params['rectangle']
progressData = params['progress']


for textObject in textData:
    textInfo = Namespace(**textObject)
    print(textInfo.message)