 // Cache 
 console.log('I am inside the sw.js');

 var cacheVersion = 'v1.0';
   // list the files to be cached.
  var cacheFileList = [
  './',
  './index.html',
  './logo-mobile.png'
  ]


//Install
// Whicle service-worker is installing , we will catch the event and will do some task  like caching
self.addEventListener('install', function(event){
  console.log('Installing Service Worker........');
  event.waitUntil(
    caches.open('static')
      .then(function (cache) {  
	     console.log('Adding all the files to cache........');
         cache.addAll(cacheFileList);
     })
);
});

 
//Acivate
// It manges the old cache ie it will delete the old cache and will keep current cache
self.addEventListener('activate', function(){
  console.log('SW Activated');
});
 //fetch
 // It controls the network request. It control our request.
 //It will decide if request shld go through network or through cache.
 self.addEventListener('fetch', function(event) {
    event.respondWith(
    caches.match(event.request)
        .then(function(res) {
            if (res){
                return res;
            } else{
                return fetch(event.request);
            }
        })
    );
});