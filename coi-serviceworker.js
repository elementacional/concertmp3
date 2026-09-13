let coi = {
  shouldRegister: () => true,
  shouldDeregister: () => false,
  coepCredentialless: () => false,
  doCoep: () => true,
  quiet: false,
};

if (typeof window !== 'undefined') {
  const script = document.currentScript;
  if (script) {
    coi = {
      shouldRegister: () => script.getAttribute('data-coi-register') !== 'false',
      shouldDeregister: () => script.getAttribute('data-coi-deregister') === 'true',
      coepCredentialless: () => script.getAttribute('data-coi-coep-credentialless') === 'true',
      doCoep: () => script.getAttribute('data-coi-coep') !== 'false',
      quiet: script.getAttribute('data-coi-quiet') === 'true',
    };
  }
}

const n = navigator;
if (coi.shouldDeregister() && n.serviceWorker && n.serviceWorker.controller) {
  n.serviceWorker.controller.postMessage({ type: 'deregister' });
}

if (coi.shouldRegister() && n.serviceWorker) {
  n.serviceWorker.register(window.location.href).then(
    (registration) => {
      !coi.quiet && console.log('COOP/COEP Service Worker registered', registration);
      registration.addEventListener('updatefound', () => {
        !coi.quiet && console.log('Reloading page to apply COOP/COEP headers...');
        window.location.reload();
      });
    },
    (err) => {
      !coi.quiet && console.error('COOP/COEP Service Worker failed to register:', err);
    }
  );
}

if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
  self.addEventListener('install', () => self.skipWaiting());
  self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

  self.addEventListener('fetch', (event) => {
    const request = event.request;
    if (request.cache === 'only-if-cached' && request.mode !== 'same-origin') {
      return;
    }

    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 0) {
            return response;
          }

          const newHeaders = new Headers(response.headers);
          newHeaders.set('Cross-Origin-Opener-Policy', 'same-origin');
          if (coi.doCoep()) {
            newHeaders.set(
              'Cross-Origin-Embedder-Policy',
              coi.coepCredentialless() ? 'credentialless' : 'require-corp'
            );
          }

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
