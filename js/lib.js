function ajaxRequest(url, callback) {
    var XHR = null;
    if (XMLHttpRequest) {
        XHR = new XMLHttpRequest();
    } else {
        XHR = new ActiveXObject("Microsoft.XMLHTTP"); 
    }
    XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 || XHR.readyState == "complete") {
            if (XHR.status == 200) {
            //if (XHR.status == 0) {
                callback(XHR); 
            } else {
                alert("Unable to connect to the server");
            }
            
        }
    }
    XHR.open("GET", url, true);
    XHR.send(null);
}
function JSONPRequest(url) {
    var s = document.createElement('script');
    s.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(s);
}