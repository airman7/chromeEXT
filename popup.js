const name = 'Mayanks Bookmarks';
document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('saveAllTabs');
  button.addEventListener('click', function() {
    var bookmarkFolder = {
      parentId: '1',
      title: name
    }
    chrome.bookmarks.create(bookmarkFolder, function(newFolder) {
      chrome.tabs.query({currentWindow: true}, function(tab) {
        for(i=0; i<tab.length; i++){
          var bookmark = {
            parentId: newFolder.id,
            url: tab[i].url,
            title: tab[i].title
          };
          chrome.bookmarks.create(bookmark, function(newBookmark) {});
        }
      });
    }); 
  }, false);
}, false);

document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('reloadTabs');
  button.addEventListener('click', function() {
    chrome.bookmarks.search(name, function(folder) {
      chrome.bookmarks.getChildren(folder[0].id, function(results) {
        for(i=0; i<results.length; i++){
          chrome.tabs.create({"url": results[i].url});
          chrome.bookmarks.remove(results[i].id, function(result) {});
        }
        chrome.bookmarks.remove(folder[0].id, function(result) {});
      });
    }); 
  }, false);
}, false);