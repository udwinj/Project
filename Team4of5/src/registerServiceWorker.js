// In production, we register a service worker to serve assets from local cache.

// This lets the app load faster on subsequent visits in production, and gives
// it offline capabilities. However, it also means that developers (and users)
// will only see deployed updates on the "N+1" visit to a page, since previously
// cached resources are updated in the background.

// To learn more about the benefits of this model, read https://goo.gl/KwvDNy.
// This link also includes instructions on opting out of this behavior.
import * as firebase from 'firebase';

export default function register() {
  //process.env.NODE_ENV === 'production'
  if (process.env.NODE_ENV === 'development' && 'serviceWorker' in navigator) {
     console.log('public url:' + process.env.PUBLIC_URL);
    window.addEventListener('load', () => {
      navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`).then(function (register) {
        console.log('register1:' + register);
      }).catch(function (err) {
        console.log('err1:' + err);
      });
      console.log('register1');
      //navigator.serviceWorker.register('./firebase-messaging-sw.js');
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
      navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
          console.log('register2');
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            console.log('register3');
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                console.log('register4');
                if (navigator.serviceWorker.controller) {
                  // At this point, the old content will have been purged and
                  // the fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in your web app.
                  console.log('New content is available; please refresh.');
                } else {
                  // At this point, everything has been precached.
                  // It's the perfect time to display a
                  // "Content is cached for offline use." message.
                  console.log('Content is cached for offline use.');
                }
              }
            };
          };
        })
        .catch(error => {
          console.error('Error during service worker registration:', error);
        });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

