import json
import os


ext_services_path = os.environ["EXT_API_CREDENTIALS"]
with open(ext_services_path, 'r') as f:
  ext_services = json.load(f)


class Conf:
  answer_peer_id = "answer"
  call_peer_id = "call"
  try:
    skyway_key = ext_services['skyway']['key']
  except:
    skyway_key = None
  