from flask import Flask, render_template, send_from_directory
from flask_cors import CORS

from conf import Conf


app = Flask(__name__)
CORS(app, supports_credentials=True)


@app.route('/src/<filename>')
def src_contents(filename):
    return send_from_directory("./templates/src/", filename)

@app.route('/home', methods=["GET"])
def home():
    return render_template(
        'call.html',
        call_peer_id=Conf.call_peer_id,
        answer_peer_id=Conf.answer_peer_id,
        token=Conf.skyway_key
    )

if __name__=="__main__":
    app.run(
        host="127.0.0.1", 
        port=8284,
        debug=True
    )
