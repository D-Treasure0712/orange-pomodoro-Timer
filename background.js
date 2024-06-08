let popupWindow;

// 拡張機能がインストールされたときに実行される
chrome.runtime.onInstalled.addListener(function() {
  createPopupWindow();
});

// ポップアップウィンドウを作成する関数
function createPopupWindow() {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"),
    type: "detached_panel",
    width: 400,
    height: 600
  }, function(window) {
    popupWindow = window;
  });
}

// ポップアップウィンドウが閉じられたときに再度開く
chrome.windows.onRemoved.addListener(function(windowId) {
  if (windowId === popupWindow.id) {
    createPopupWindow();
  }
});