class UIController {
    constructor() {
        this.elements = {
            videoInput: document.getElementById('videoInput'),
            interval: document.getElementById('interval'),
            format: document.getElementById('format'),
            quality: document.getElementById('quality'),
            prefix: document.getElementById('prefix'),
            videoPlayer: document.getElementById('videoPlayer'),
            previewBtn: document.getElementById('previewBtn'),
            extractBtn: document.getElementById('extractBtn'),
            cancelBtn: document.getElementById('cancelBtn'),
            progress: document.getElementById('progress'),
            previewContainer: document.querySelector('.preview-container'),
            modal: document.getElementById('modal'),
            modalTitle: document.getElementById('modalTitle'),
            modalMessage: document.getElementById('modalMessage'),
            modalClose: document.getElementById('modalClose'),
            modalConfirm: document.getElementById('modalConfirm')
        };
        this.initModal();
    }

    getConfig() {
        const interval = Number(this.elements.interval.value);
        if (interval < 0.1 || interval > 60) {
            this.showModal('Erro', 'O intervalo deve estar entre 0.1 e 60 segundos.');
            return null;
        }
        return {
            interval,
            format: this.elements.format.value,
            quality: Number(this.elements.quality.value),
            prefix: this.elements.prefix.value || 'screenshot'
        };
    }

    setProgress(current, total) {
        this.elements.progress.style.width = `${(current / total) * 100}%`;
    }

    resetProgress() {
        this.elements.progress.style.width = '0';
    }

    toggleCancelButton(enable) {
        this.elements.cancelBtn.disabled = !enable;
    }

    showPreviews(frames) {
        this.elements.previewContainer.innerHTML = '';
        frames.forEach((dataUrl, index) => {
            const img = new Image();
            img.src = dataUrl;
            img.alt = `Pré-visualização do frame ${index + 1}`;
            img.className = 'preview-img';
            this.elements.previewContainer.appendChild(img);
        });
    }

    showModal(title, message, onConfirm = null) {
        this.elements.modalTitle.textContent = title;
        this.elements.modalMessage.textContent = message;
        this.elements.modal.classList.add('show');
        if (onConfirm) {
            this.elements.modalConfirm.style.display = 'block';
            this.elements.modalConfirm.onclick = () => {
                onConfirm();
                this.closeModal();
            };
        } else {
            this.elements.modalConfirm.style.display = 'none';
        }
    }

    closeModal() {
        this.elements.modal.classList.remove('show');
    }

    initModal() {
        this.elements.modalClose.addEventListener('click', () => this.closeModal());
    }
}