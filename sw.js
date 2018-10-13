console.log("Service Worker: Registered");

self.addEventListener('install', function(event) {

  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/data/restaurants.json',
        '/js/dbhelper.js',
        '/js/main.js',
        '/js/restaurant_info.js',
        '/css/styles.css',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {

  event.respondWith(
    caches.match(event.request).then(function(response) {
      if(response) {
        console.log('found ', event.request , ' in cache');
        return response;
      }
      else {
        console.log(event.request , ' not found in cache, fetching..');
        return fetch(event.request)
                  .then(function(response){
                    const resp = response.clone();
                    caches.open('v1').then(function(cache){
                      cache.put(event.request, resp);
                    })
                    return response;
                  })
                  .catch(function(err){
                    console.error(err);
                  });
      }
    })
  );
});
