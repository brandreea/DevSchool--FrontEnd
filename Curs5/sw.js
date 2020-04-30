self.addEventListener('install',function(event){
    console.log("Service worker has been installed.");
});

self.addEventListener('fetch', event=>{
    console.log("Service worker has fetched a resource.");
});