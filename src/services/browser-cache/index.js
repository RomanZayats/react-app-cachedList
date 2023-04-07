export const saveDataToCache = (cacheName, payload) => {
  const url = window.location.origin;
  const data = new Response(JSON.stringify(payload));
  if ("caches" in window) {
    caches.open(cacheName).then((cache) => {
      cache
        .put(url, data)
        .catch((e) => console.log("BROWSER CACHE SAVING ERROR:", e));
    });
  }
};

export const getCachedDataByName = async (cacheName) => {
  const url = window.location.origin;
  const cacheStorage = await caches.open(cacheName);
  const cachedResponse = await cacheStorage.match(url);
  return await cachedResponse.json();
};
