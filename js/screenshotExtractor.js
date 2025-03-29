/**
 * Classe para extrair e gerenciar screenshots de vídeo.
 */
class ScreenshotExtractor {
    constructor(videoHandler, config) {
        this.videoHandler = videoHandler;
        this.config = config;
        this.isCancelled = false;
    }

    async preview(onProgress) {
        const { interval, format } = this.config;
        const duration = this.videoHandler.getDuration();
        const frames = [];
        const total = Math.ceil(duration / interval);

        for (let time = 0; time < duration; time += interval) {
            const dataUrl = await this.videoHandler.captureFrame(time, 0.5, format);
            frames.push(dataUrl);
            onProgress(frames.length, total);
        }
        return frames;
    }

    async extract(onProgress) {
        const { interval, format, quality, prefix } = this.config;
        const duration = this.videoHandler.getDuration();
        const totalFrames = Math.floor(duration / interval);
        const zip = new JSZip();

        for (let i = 0; i < totalFrames; i++) {
            if (this.isCancelled) break;
            const time = i * interval;
            const dataUrl = await this.videoHandler.captureFrame(time, quality / 100, format);
            const base64Data = dataUrl.split(',')[1];
            zip.file(`${prefix}_${i}.${format}`, base64Data, { base64: true });
            onProgress(i + 1, totalFrames);
        }

        if (!this.isCancelled) {
            const blob = await zip.generateAsync({ type: 'blob' });
            saveAs(blob, `${prefix}.zip`);
        }
    }

    cancel() {
        this.isCancelled = true;
    }

    reset() {
        this.isCancelled = false;
    }
}