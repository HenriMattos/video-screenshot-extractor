/**
 * Classe responsável por manipular o elemento de vídeo e capturar frames.
 */
class VideoHandler {
    constructor(videoElement) {
        this.video = videoElement;
    }

    async loadVideo(file) {
        this.video.src = URL.createObjectURL(file);
        await new Promise(resolve => {
            this.video.onloadedmetadata = resolve;
        });
    }

    getDuration() {
        return this.video.duration || 0;
    }

    async captureFrame(time, quality = 0.5, format = 'jpeg') {
        this.video.currentTime = time;
        await new Promise(resolve => this.video.onseeked = resolve);
        const canvas = document.createElement('canvas');
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;
        canvas.getContext('2d').drawImage(this.video, 0, 0);
        return canvas.toDataURL(`image/${format}`, quality);
    }
}