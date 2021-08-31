# skyway-js-test
## setting
- Save your key as json file. The format can be found in conf.py.
- Set environment variable.
```
export EXT_API_CREDENTIALS=YOUR_PATH_TO_THE_JSON_FILE
```
- Install required packages
```
python3 -m venv venv
source venv/bin/activate
```
(venv)
```
pip3 install -r requiremantes.txt
pip3 list
```
## start
- Run answer.py
(venv)
```
python3 answer.py &
```
- Access to 'http://127.0.0.1:8283/home'
- Run call.py
(venv)
```
python3 answer.py &
```
- Access to 'http://127.0.0.1:8284/home'
