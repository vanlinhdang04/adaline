export default function localStorageDB() {
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  if (!indexedDB) {
    console.error('indexDB not supported');
    return;
  }
  var db,request = indexedDB.open('flexDB', 1);
  request.onsuccess = function(evt) {
    db = this.result;
  };
  request.onerror = function(event) {
    console.error('indexedDB request error');
    console.log(event);
  };

  request.onupgradeneeded = function(event) {
    db = null;
    var store = event.target.result.createObjectStore('s', {
      keyPath: 'k'
    });
    store.transaction.oncomplete = function (e){
      db = e.target.db; 
    };
  };
  function getValue(key, callback) {
    if(!db) {
      setTimeout(function () {
        getValue(key, callback);
      }, 100);
      return;
    }
    db.transaction('s').objectStore('s').get(key).onsuccess = function(event) {
      var result = (event.target.result && event.target.result.v) || null;
      callback(null,result);
    };
  }
  function setValue(k, v, callback) {
      if(!db) {
          setTimeout(function () {
              setValue(k,v, callback);
          }, 100);
          return;
      }
      let txn = db.transaction('s', 'readwrite'); 
      txn.oncomplete = function(event) {
        if(callback) callback();
      }
      txn.onerror = function(event){
        console.error("Can't set item",event);
        if(callback) callback("Can't set item")
      }
      txn.objectStore('s').put({
        k,v
      });
      txn.commit();
  }
  function removeValue(k,callback){
      if(!db) {
          setTimeout(function () {
              removeValue(k, callback);
          }, 100);
          return;
      }
      let txn = db.transaction('s', 'readwrite'); 
      txn.oncomplete = function(event) {
        if(callback) callback();
      }
      txn.onerror = function(event){
        console.error("Can't remove item",event);
        if(callback) callback("Can't remove item")
      }
      txn.objectStore('s').delete(k);
      txn.commit();
  }
  return {
    getItem: getValue,
    removeItem: removeValue,
    setItem: setValue
  }
}