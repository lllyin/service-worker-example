function hello(){
  console.log('main.js');
}
hello();

const serviceWorkerPath = location.href.indexOf('github.io') > -1 ? './sw_cached_site.js' : '../sw_cached_site.js';

if('serviceWorker' in navigator){
  console.log('serviceWorker is support');

  navigator.serviceWorker
    .register(serviceWorkerPath)
    .then(res => {
      console.log('service worker registed')
    })
    .catch( err => {
      console.log('service worker registe error', err)
      
    })
}