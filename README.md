# Concert MP3 Player 🎵

**Concert MP3** é um player de áudio e unificador de faixas baseado em web (100% client-side), projetado para criar transições contínuas de *crossfade* entre faixas MP3 em tempo real, além de permitir o download da playlist unificada e a exportação do repertório em texto.

Ideal para DJs, montagem de sets de apresentação, compilações musicais e playlists personalizadas sem a necessidade de instalar softwares pesados ou enviar arquivos para servidores externos.

---

## 🚀 Funcionalidades

* **Player Local Interativo:** Visualização de forma de onda (waveform) unificada com suporte a clique direto na linha do tempo (*seeking*).
* **Crossfade em Tempo Real:** Ajuste dinâmico de 1 a 15 segundos de transição entre as faixas durante a reprodução.
* **Organização Drag & Drop:** Reordene as músicas da playlist facilmente arrastando os itens na lista.
* **Exportação da Playlist (.txt):** Botão minimalista para baixar a relação das músicas formatada com nome e duração total.
* **Unificação de Áudio sem Perdas:** Processamento via **FFmpeg WebAssembly (FFmpeg.wasm)** diretamente no navegador, combinando os arquivos MP3 em uma única faixa final sem perda de qualidade original.
* **Privacidade Absoluta:** Nenhum arquivo é enviado para servidores. Todo o processamento de áudio ocorre localmente na máquina do usuário.

---

## 💻 Tecnologias Utilizadas

* **HTML5 / CSS3:** Interface responsiva em modo escuro estilo player moderno.
* **JavaScript ES6+:** Manipulação DOM e controle de eventos de arrastar/soltar (*Drag & Drop*).
* **Web Audio API:** Manipulação, decodificação e ganho de volume para o crossfade dinâmico em tempo real.
* **FFmpeg.wasm (`v0.11.6`):** Motor de codificação de mídia compilado para WebAssembly para junção e exportação de áudio.
* **coi-serviceworker:** Injeção dinâmica de cabeçalhos de segurança (`COOP/COEP`) para liberação do `SharedArrayBuffer` em ambientes estáticos.

---

## 🌐 Como Publicar no GitHub Pages

Para hospedar esta aplicação gratuitamente no **GitHub Pages**:

1. Suba os arquivos do seu projeto (`index.html` e `README.md`) para o seu repositório no GitHub.
2. No seu repositório, vá até a aba **Settings** (Configurações).
3. Na barra lateral esquerda, clique em **Pages**.
4. Em **Build and deployment** > **Branch**, selecione a branch `main` (ou `master`) e a pasta `/ (root)`.
5. Clique em **Save**.
6. Aguarde alguns minutos e o seu link estará disponível no topo da página.

> **Nota de Compatibilidade:** O script `coi-serviceworker` integrado no `<head>` do arquivo `index.html` garante que a aplicação execute o FFmpeg sem falhas de permissão de memória no GitHub Pages.

---

## 📂 Estrutura de Arquivos do Repositório

```text
.
├── index.html     # Código-fonte completo (HTML, CSS e JavaScript integrados)
└── README.md      # Documentação do projeto