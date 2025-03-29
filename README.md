# Video Screenshot Extractor

Uma aplicação web para extrair screenshots de vídeos em intervalos especificados, salvando-os em um arquivo ZIP.

## Funcionalidades
- Seleção de vídeo e configuração de intervalo, formato e qualidade.
- Pré-visualização dos frames antes da extração.
- Geração de um arquivo ZIP com os screenshots.

## Como Usar
1. Clone o repositório: `git clone https://github.com/seu-usuario/video-screenshot-extractor.git`
2. Abra o diretório: `cd video-screenshot-extractor`
3. Sirva os arquivos com um servidor local (ex.: `npx live-server`).
4. Acesse no navegador e selecione um vídeo.

## Dependências
- [JSZip](https://stuk.github.io/jszip/) (incluído em `lib/jszip.min.js`)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) (incluído em `lib/FileSaver.min.js`)

## Licença
MIT License