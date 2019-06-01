console.log('sw', this === self);

const cacheName = "v1";
// 预定义：要缓存的资源文件
const cacheAsserts = [
  'index.html',
  'about.html',
  '/css/style.css',
  'js/main.js'
]

// 监听Install事件
self.addEventListener('install', e => {
  console.log('service worker installed')
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service worker Cacheing Files');
        cache.addAll(cacheAsserts);
      })
      .then(() => {
        self.skipWaiting();
      })
  )
})

// 监听Activate事件
self.addEventListener('activate', e => {
  console.log('service worker activated')
  e.waitUntil(
    caches.keys().then(cacheNames => {
      console.log('cacheNames', cacheNames);
      return Promise.all(
        cacheNames.map(cache => {
          if(cache !== cacheName){
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      )
    })
  )
})

// 监听Fetch事件，能够监听客户端发起的所有的http请求
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    // 读取缓存
    fetch(e.request).catch(() => caches.match(e.request))
  )
})