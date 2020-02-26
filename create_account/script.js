var pw_flag = 0;
var pw2_flag = 0;
var mail_flag = 0;
var name_flag = 0;
const nu = "@u.northwestern.edu";
const nu2 = "@northwestern.edu";



document.getElementById("username").addEventListener('change', function(){
    const username = document.getElementById("username").value;
    console.log(username.length);
    if (username.length == 0){
        name_flag = 0;
    }
    else {
        name_flag = 1;
    }
    checkinput();
})

document.getElementById('submit').addEventListener('click', function(){

    alert('Congratulations! We have sent a confirmation mail to you. Please check your mailbox.')


})


document.getElementById("pw").addEventListener('change',function(){
    // console.log('change!');
    const pw = document.getElementById("pw").value;
    if (pw.length < 8 ) {
        document.getElementById("pw-status").style.display = "initial";
        document.getElementById("pw-status").innerText = "Too short.";
        document.getElementById("pw-status").style.color = "red";
        pw_flag = 0;
    }
    else {
        document.getElementById("pw-status").style.display = "initial";
        document.getElementById("pw-status").innerText = "Good.";
        document.getElementById("pw-status").style.color = "green";
        pw_flag = 1;
    }
    checkinput();

})

document.getElementById("pw_confirm").addEventListener('change',function(){
    confirmPW();
    checkinput();

})


document.getElementById("mail").addEventListener('change',function(){
    confirmMail();
    checkinput();

})


const confirmPW = () => {

    const pw = document.getElementById("pw").value;
    const pw_confirm = document.getElementById("pw_confirm").value;
 
    if (pw === pw_confirm && pw.length != 0) {
        document.getElementById("pw2-status").style.display = "initial";
        document.getElementById("pw2-status").innerText = "Password match.";
        document.getElementById("pw2-status").style.color = "green";
        pw2_flag = 1;
    }
    else {
        document.getElementById("pw2-status").style.display = "initial";
        document.getElementById("pw2-status").innerText = "Passwords does not match.";
        document.getElementById("pw2-status").style.color = "red";
        pw2_flag = 0;
    }

}

const confirmMail = () => {

    const mail = document.getElementById("mail").value;

    if( mail.endsWith(nu) || mail.endsWith(nu2)) {
        document.getElementById("mail-status").style.display = "initial";
        document.getElementById("mail-status").innerText = "Valid e-mail address.";
        document.getElementById("mail-status").style.color = "green";
        mail_flag = 1;
    }
    else {
        // alert('Plese use northwestern e-mail');
        document.getElementById("mail-status").style.display = "initial";
        document.getElementById("mail-status").innerText = "Please use northwestern e-mail address.";
        document.getElementById("mail-status").style.color = "red";
        mail_flag = 0;
    }

}

const checkinput = () => {



    if ( pw_flag === 1 && pw2_flag === 1 && mail_flag === 1 && name_flag === 1) {
        console.log('good!');
        document.getElementById("submit").disabled = false;
    }
    else {
        console.log('not good!');
        document.getElementById("submit").disabled = true;
    }


}