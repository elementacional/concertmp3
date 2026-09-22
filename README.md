# Concert Audio v2.0 - Studio Stereo HD

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Web Audio API](https://img.shields.io/badge/Web_Audio_API-00E676?style=for-the-badge&logo=webrtc&logoColor=black)
![MP3 320kbps](https://img.shields.io/badge/MP3-320_kbps_Stereo-brightgreen?style=for-the-badge)

O **Concert Audio v2.0** é uma aplicação web leve e autônoma desenvolvida para unificação de áudio, crossfade inteligente, equalização global em tempo real e exportação em alta fidelidade **MP3 320 kbps Stereo Preservado**. 

Projetado como uma solução **Single-Page Application (SPA)** sem necessidade de backend ou instalação de dependências externas.

---

## 📸 Interface da Aplicação

A interface conta com um design moderno estilo *Dark Studio*, inspirado nos principais players e DAWs digitais:

- **Controle de Crossfade Dinâmico:** Regule o tempo de transição suave entre músicas de 1s a 15s.
- **Equalizador de 3 Bandas:** Ajustes de Graves, Médios e Agudos em tempo real.
- **Visualizador de Forma de Onda (Waveform):** Apresentação visual espelhada e responsiva com marcadores de faixas.
- **Fila de Reprodução Inteligente:** Numeração dinâmica, reprodução/pausa individual por faixa e funcionalidade *Drag-and-Drop* para reordenamento.

---

## ✨ Principais Funcionalidades

### 1. Processamento e Unificação de Áudio Stereo
- **Preservação de Áudio Stereo HD:** Mantém a separação perfeita dos canais L e R originais durante o mix e a exportação.
- **Crossfade Configurável:** Aplica curvas suaves de fading (*linear ramp*) entre o encerramento de uma faixa e o início da seguinte.
- **Geração de Master MP3 a 320 kbps:** Utiliza a biblioteca `lamejs` rodando em um **Web Worker** dedicado (execução assíncrona, evitando o travamento da interface).

### 2. Equalizador Global em Tempo Real
- **Graves (250 Hz):** Filtro *Low-Shelf* (-12 dB a +12 dB).
- **Médios (1.5 kHz):** Filtro *Peaking* (-12 dB a +12 dB).
- **Agudos (4 kHz):** Filtro *High-Shelf* (-12 dB a +12 dB).
- *Dica:* A amplitude do equalizador afeta em tempo real tanto o áudio emitido quanto o tamanho visual das ondas do gráfico.

### 3. Fila de Reprodução / Edição Avançada
- **Botões Play/Pause Minimalistas por Faixa:** Toque qualquer faixa da lista individualmente sem perder a posição geral.
- **Numeração Sequencial Garantida (1..N):** Atualização dinâmica da lista ao adicionar, remover ou reordenar arquivos.
- **Exportação de Playlist (`.txt`):** Gere um arquivo de texto simples com os nomes das músicas e suas respectivas durações.
- **Limpeza Rápida:** Botão para resetar a playlist e parar reproduções ativas instantaneamente.

---

## 🚀 Como Executar o Projeto

Como o aplicativo utiliza unicamente tecnologias web nativas (`HTML5`, `CSS3`, `JavaScript` e `Web Audio API`), não é necessário instalar `node_modules` ou servidores complexos.

1. Baixe o arquivo `index.html`.
2. Abra o arquivo diretamente em qualquer navegador moderno (Google Chrome, Microsoft Edge, Mozilla Firefox ou Safari).
3. Selecione suas músicas e aproveite!

---

## 🛠️ Tecnologias Utilizadas

- **Web Audio API:** Para manipulação de nós de áudio (`AudioContext`, `BiquadFilterNode`, `GainNode` e `OfflineAudioContext`).
- **HTML5 Canvas:** Renderização da onda sonora (*waveform*) em tempo real com alta performance (`requestAnimationFrame`).
- **Web Workers:** Execução do algoritmo de codificação MP3 em segundo plano sem bloquear a UI.
- **LameJS (v1.2.1):** Codificador MP3 em JavaScript de alta performance carregado via CDN.

---

## 📜 Licença

Este projeto é disponibilizado abertamente para uso pessoal e profissional. Sinta-se à vontade para modificar e aprimorar conforme sua necessidade!