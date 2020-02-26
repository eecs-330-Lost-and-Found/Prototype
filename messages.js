var reply1 = ""
var reply2 = ""
var reply3 = ""
var message_1 = "Hi,<br /> I'm joker, I think I found your phone, please reply me in this board.<br />2020.1.20"
var message_2 = "Hi,<br /> I'm kkkk, I think the wallet you find is mine, please contact me when you are free.<br />2020.2.20"
var message_3 = "Hi,<br /> I'm david, could you sell the phone you found to me? I can give you more!<br />2020.1.23"


const message1 = () => {
    document.getElementById("messagearea").innerHTML = message_1
    document.getElementById('replyarea').innerHTML = reply1
}

const message2 = () => {
    document.getElementById("messagearea").innerHTML = message_2
    document.getElementById('replyarea').innerHTML = reply2
}

const message3 = () => {
    document.getElementById("messagearea").innerHTML = message_3
    document.getElementById('replyarea').innerHTML = reply3
}


const submitButton = document.getElementById("submit");

submitButton.onclick = (ev) => {
    t = document.getElementById('track_template');

    if (document.getElementById('messagearea').innerHTML == "") {
        document.getElementById('replyarea').innerHTML = "please choose a message to reply."
    }
    else if (document.getElementById('comment').value == "")
    {
        document.getElementById('replyarea').innerHTML = "please leave a comment."
    }
    else if (document.getElementById('comment_author').value == "" && !document.getElementById('anonymous').checked) {
        document.getElementById('replyarea').innerHTML = "please leave your name."
    }
    else
    {
        if (document.getElementById('anonymous').checked) {
            document.getElementById('replyarea').innerHTML = document.getElementById('comment').value + "<br /> by  anonymous";
        }
        else {
            document.getElementById('replyarea').innerHTML = document.getElementById('comment').value + "<br /> by  " + document.getElementById('comment_author').value;
        }
    }
}

const sort1 = () => {

    if (document.getElementById('sort').value == "date") {
        message_1 = "Hi,<br /> I'm joker, I think I found your phone, please reply me in this board.<br />2020.1.20" 
        message_2 = "Hi,<br /> I'm david, could you sell the phone you found to me? I can give you more!<br />2020.1.23"
        message_3 = "Hi,<br /> I'm kkkk, I think the wallet you find is mine, please contact me when you are free.<br />2020.2.20"
        document.getElementById('message1').innerHTML = "Message1<br />from joker"
        document.getElementById('message2').innerHTML = "Message1<br />from david"
        document.getElementById('message3').innerHTML = "Message1<br />from kkkk"
    }

    else {
        message_1 = "Hi,<br /> I'm david, could you sell the phone you found to me? I can give you more!<br />2020.1.23"
        message_2 = "Hi,<br /> I'm joker, I think I found your phone, please reply me in this board.<br />2020.1.20"
        message_3 = "Hi,<br /> I'm kkkk, I think the wallet you find is mine, please contact me when you are free.<br />2020.2.20"
        document.getElementById('message1').innerHTML = "Message1<br />from david"
        document.getElementById('message2').innerHTML = "Message1<br />from joker"
        document.getElementById('message3').innerHTML = "Message1<br />from kkkk"

    }

}