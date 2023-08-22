const cameraButtons = document.querySelectorAll('.camera-button');
let stream;
let videoElement; // Store the video element globally

async function accessCamera() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: true
        });

        videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.autoplay = true;

        // Append the video element to the body
        document.body.appendChild(videoElement);

        if (videoElement.requestFullscreen) {
            videoElement.requestFullscreen();
        }

        // Attach the event listener for stopping the camera
        cameraButtons.forEach(button => {
            button.addEventListener('click', stopCamera);
        });
    } catch (error) {
        console.error('Gagal mengakses kamera:', error);
    }
}

function stopCamera() {
    if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }
    if (videoElement) {
        videoElement.remove();
    }
}

document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        stopCamera();
    }
});

cameraButtons.forEach(button => {
    button.addEventListener('click', accessCamera);
});
