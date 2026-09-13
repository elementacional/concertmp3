// coi-serviceworker.js
if (typeof window !== 'undefined') {
  if (window.location.hostname !== 'localhost' && window.location.protocol !== 'https:') {
    console.warn('COOP/COEP exige HTTPS.');
  } else {
    const script = document.currentScript;
    const coi = {
      shouldRegister: () => true,
      shouldDeregister: () => false,
      coepCredentialless: () => false,
      doCoep: () => true,
      quiet: false,
    };

    if (navigator.serviceWorker) {
      // Registra o Service Worker garantindo o caminho relativo correto
      navigator.serviceWorker.register(new URL('coi-serviceworker.js', import.meta.url || window.location.href)).then(
        (registration) => {
          !coi.quiet && console.log('COOP/COEP Service Worker registrado com sucesso:', registration.scope);
          registration.addEventListener('updatefound', () => {
            window.location.reload();
          });
        },
        (err) => {
          !coi.quiet && console.error('Falha ao registrar COOP/COEP Service Worker:', err);
        }
      );
    }
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
          newHeaders.set('Cross-Origin-Embedder-Policy', 'require-corp');

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
