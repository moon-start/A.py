// 獲取當前 URL
var currentURL = window.location.href;
// 指定目標 URL
// var targetURL = "http://localhost/moon-start/pages/index.html";

        
// 獲取檔名
var fileName = currentURL.substring(currentURL.lastIndexOf('/') + 1);
var targetURL = "http://localhost/moon-start/pages/"+fileName;

// 檢查是否需要導向
if (  window.location.href  !== targetURL) {
    // 導向至目標 URL
window.location.href = targetURL;
}
