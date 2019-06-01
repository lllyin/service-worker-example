function hello(){
  console.log('main.js');
}
hello();

if('serviceWorker' in navigator){
  console.log('serviceWorker is support');

  navigator.serviceWorker
    .register('../sw_cached_site.js')
    .then(res => {
      console.log('service worker registed')
    })
    .catch( err => {
      console.log('service worker registe error', err)
      
    })
}