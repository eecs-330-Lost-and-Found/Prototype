const message1 = () => {
    document.getElementById("messagearea").innerHTML = "Hi,<br /> I'm joker, I think I found your phone, please reply me in this board."
}

const message2 = () => {
    document.getElementById("messagearea").innerHTML = "Hi,<br /> I'm kkkk, I think the wallet you find is mine, please contact me when you are free."
}

const message3 = () => {
    document.getElementById("messagearea").innerHTML = "Hi,<br /> I'm david, could you sell the phone you found to me? I can give you more!"
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
    else if (document.getElementById('comment_author').value == "") {
        document.getElementById('replyarea').innerHTML = "please leave your name."
    }
    else
    {
        document.getElementById('replyarea').innerHTML = document.getElementById('comment').value + "<br /> by  " + document.getElementById('comment_author').value;
    }
}