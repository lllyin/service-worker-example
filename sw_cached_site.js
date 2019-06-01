const cacheName = "v3";


// 监听Install事件
self.addEventListener('install', e => {
  console.log('[Cache All Site]service worker installed')
})

// 监听Activate事件
self.addEventListener('activate', e => {
  console.log('[Cache All Site]service worker activated')
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
  console.log('[Cache All Site]Service Worker: Fetching', e.request);
  e.respondWith(
    // 读取缓存
    fetch(e.request)
      .then(res => {
        // 对http response复制一份
        const resClone = res.clone();
        // 打开cache
        caches
          .open(cacheName)
          .then(cache => {
            // 将数据放入缓存中
            cache.put(e.request, resClone);
          })
        return res;
      })
      .catch(() => caches.match(e.request).then(res => res))
  )
})