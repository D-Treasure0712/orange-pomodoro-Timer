chrome.runtime.getURL("todolist.html", function(url) {
    fetch(url)
      .then(function(response) {
        return response.text();
      })
      .then(function(html) {
        // HTMLコンテンツを処理
      });
  });