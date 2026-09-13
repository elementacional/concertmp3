// coi-serviceworker.js - Versão Autossuficiente para GitHub Pages
const coi = {
  shouldRegister: () => true,
  shouldDeregister: () => false,
  coepCredentialless: () => false,
  doCoep: () => true,
  quiet: false,
};

if (typeof window !== 'undefined') {
  if (window.location.hostname !== 'localhost' && window.location.protocol !== 'https:') {
    console.warn('COOP/COEP exige conexões HTTPS.');
  } else if (navigator.serviceWorker) {
    // Garante que o caminho do script considere a subpasta do GitHub Pages (/concertmp3/)
    const currentScriptPath = document.currentScript ? document.currentScript.src : new URL('coi-serviceworker.js', window.location.href).href;

    navigator.serviceWorker.register(currentScriptPath).then(
      (registration) => {
        !coi.quiet && console.log('COOP/COEP Service Worker registrado no escopo:', registration.scope);
        
        // Se houver atualização no worker, recarrega para aplicar os cabeçalhos
        registration.addEventListener('updatefound', () => {
          !coi.quiet && console.log('Recarregando página para ativar cabeçalhos de segurança...');
          window.location.reload();
        });
      },
      (err) => {
        !coi.quiet && console.error('Falha ao registrar COOP/COEP Service Worker:', err);
      }
    );
  }
}

if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

  self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') return;

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 0) return response;

          const newHeaders = new Headers(response.headers);
          newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
          newHeaders.set(
            'Cross-Origin-Embedder-Policy',
            coi.coepCredentialless() ? 'credentialless' : 'require-corp'
          );

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
          });
        })
        .catch((e) => console.error(e))
    );
  });
}
