// Guarda o app no aparelho para abrir sem internet.
// Ao alterar index.html, aumente o número da versão abaixo.
const VERSAO = "agenda-v1";
const ARQUIVOS = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS))); self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;
  if (url.hostname.endsWith("google.com") || url.hostname.endsWith("googleusercontent.com") || url.pathname.endsWith(".csv")) return; // planilha: sempre da rede
  if (url.origin === location.origin) {
    // app: rede primeiro (pega atualizações), cache se estiver sem internet
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(VERSAO).then(x => x.put(e.request, c)); return r; }).catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
  } else if (url.hostname.includes("fonts.g")) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const c = res.clone(); caches.open(VERSAO).then(x => x.put(e.request, c)); return res; })));
  }
});
