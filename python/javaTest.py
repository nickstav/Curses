import json
import sys
from argparse import Namespace

data = sys.argv[1]
params = json.loads(data)

print(params['text'])

textData = Namespace(**params['text'])
#lineData = Namespace(**params['line'])
#rectData = Namespace(**params['rectangle'])
#progressData = Namespace(**params['progress'])