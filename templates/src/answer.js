let localStream;
const audioElm = document.getElementById('their-audio');
const body = document.getElementsByTagName('body')[0];

const peer = new Peer(myPeerId, {
    key: token,
    debug: 3,
    turn: true
});

navigator.mediaDevices.getUserMedia({video: false, audio: true})
.then( stream => {
    localStream = stream;
}).catch( error => {
    console.error("mediaDevice.getUserMedia() error:", error);
    return;
});

// This is JS sample code.
// 着信処理
peer.on('call', mediaConnection => {
    var answerButton = document.createElement('button');
    var rejectButton = document.createElement('button');
    answerButton.innerText = "応答";
    rejectButton.innerText = "拒否"
    body.appendChild(answerButton);
    body.appendChild(rejectButton);
    answerButton.addEventListener("click", () => {
        answerButton.remove();
        rejectButton.remove();
        mediaConnection.answer(
            localStream,
            {
                audioCodec: "opus",
                audioReceiveEnabled: true,
            }
        );
        var terminateButton = document.createElement('button');
        terminateButton.innerText = "終話";
        body.appendChild(terminateButton);
        terminateButton.addEventListener('click', () => {
            mediaConnection.close();
            terminateButton.remove();
            rejectButton.remove();
        });
        mediaConnection.on('stream', stream => {
            audioElm.srcObject = stream;
            audioElm.play();
            console.log("play steaming!!!");
        });
        mediaConnection.on('close', () => {
            terminateButton.remove();
            window.alert('通話が切断されました');
        });
    });
    rejectButton.addEventListener("click", async () => {
        mediaConnection.answer();
        const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await _sleep(1000);
        mediaConnection.close();
        answerButton.remove();
        rejectButton.remove();
    });
});
