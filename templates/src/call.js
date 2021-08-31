let localStream;
const audioElm = document.getElementById('their-audio');
const body = document.getElementsByTagName('body')[0];
const callButton = document.getElementById('call');

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

callButton.addEventListener("click", () => {
    const mediaConnection = peer.call(
        theirID, 
        localStream,
        {
            audioCodec: "opus",
            audioReceiveEnabled: true,
        }
    );
    mediaConnection.on('stream', stream => {
        audioElm.srcObject = stream;
        audioElm.play();
        let callingDisplay = document.createElement('p');
        callingDisplay.innerText = "通話中です";
        callingDisplay.id = "calling-display"
        body.appendChild(callingDisplay);
    });
    mediaConnection.on('close', () => {
        try {
            let callingDisplay = document.getElementById('calling-display');
            callingDisplay.remove();
        } catch (e) {
            console.log(e);
        }
        window.alert('通話が切断されました');
    });
});
