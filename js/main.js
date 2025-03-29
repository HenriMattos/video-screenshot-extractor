const ui = new UIController();
const videoHandler = new VideoHandler(ui.elements.videoPlayer);
let extractor = null;

ui.elements.videoInput.addEventListener('change', async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
        await videoHandler.loadVideo(file);
        const config = ui.getConfig();
        if (config) {
            extractor = new ScreenshotExtractor(videoHandler, config);
        }
    } catch (error) {
        ui.showModal('Erro', 'Não foi possível carregar o vídeo: ' + error.message);
    }
});

ui.elements.previewBtn.addEventListener('click', async () => {
    if (!extractor) {
        ui.showModal('Aviso', 'Por favor, selecione um vídeo primeiro.');
        return;
    }
    try {
        const frames = await extractor.preview((current, total) => ui.setProgress(current, total));
        ui.showPreviews(frames);
        ui.resetProgress();
    } catch (error) {
        ui.showModal('Erro', 'Erro durante a pré-visualização: ' + error.message);
    }
});

ui.elements.extractBtn.addEventListener('click', async () => {
    if (!extractor) {
        ui.showModal('Aviso', 'Por favor, selecione um vídeo primeiro.');
        return;
    }
    const config = ui.getConfig();
    if (!config) return;
    extractor.config = config;
    ui.toggleCancelButton(true);
    extractor.reset();
    try {
        await extractor.extract((current, total) => ui.setProgress(current, total));
        ui.resetProgress();
        ui.toggleCancelButton(false);
    } catch (error) {
        ui.showModal('Erro', 'Erro durante a extração: ' + error.message);
    }
});

ui.elements.cancelBtn.addEventListener('click', () => {
    ui.showModal('Confirmar Cancelamento', 'Tem certeza que deseja cancelar a extração?', () => {
        extractor?.cancel();
        ui.toggleCancelButton(false);
        ui.resetProgress();
    });
});