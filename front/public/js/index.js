
let turn = "white";
let kee = document.querySelector('#test');

// ลูปนรก 1.30 ชม.
// function swapT(){
//     if (playerColor == turn && kee.style.display === 'none') {
//         kee.style.display = "none";
//     } else if (playerColor == turn && kee.style.display === 'block'){
//         kee.style.display = "none";
//     } else if (playerColor != turn && kee.style.display === 'none'){
//         kee.style.display = "block";
//     } else if (playerColor != turn && kee.style.display === 'block'){
//         kee.style.display = "block";
//     }
//     console.log ("สีคน "+playerColor +' สีเทิน '+turn)
// }

//swapT()



var urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('code')) {
    socket.emit('joinGame', {
        code: urlParams.get('code')
    });
}

let msg = document.querySelector('#msg');
let msgBtn = document.querySelector('#msgBtn');
let msgList = document.querySelector('#msg-list');
msgBtn.addEventListener('click', e => {
            console.log('ค่าก่อนส่ง '+ msg.value)
            console.log('สีค่าก่อนส่ง '+ playerColor)
            socket.emit('new_message', { msg: msg.value})
            socket.emit('turnChange', playerColor )
            msg.value = ''
            console.log('ค่าหลังส่ง'+msg.value)
            toggleSee();
        });
    
socket.on('receive_message', data => {
            console.log('จาก rcmsg' + data.msg )
            let listItem = document.createElement('li')
            listItem.textContent = data.msg;
            listItem.classList.add('list-group-item');
            msgList.appendChild(listItem) 
        });

socket.on('changeTurn', data => {
    console.log('เทินจากเซิฟ '+ data)
    turn = data;
    console.log(turn+'  '+turn);
    toggleSee();
});

socket.on('startGame', function() {
    toggleSee();
});




// function toggleSee() {
//     var x = document.getElementById("test");

//     if (x.style.display === "none") {
//         x.style.display = "block";
//     } else {
//         x.style.display = "none";
//     }
//     }