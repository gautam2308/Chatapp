//Node server which will handle socket io connection
const  io = require('socket.io')(8000)

const users = {};
//If any new users join,let other users connected to the server know;
io.on('connection',socket =>{
    // console.log("333333333333333");
    socket.on('new-user-joined',name =>{
        // console.log("name",name);
    users[socket.id]=name;
    socket.broadcast.emit('user-joined',name)
    })
    //If someone send a message ,broadcast it to other people
    socket.on('send',message =>{
        // console.log("senddddddddddd");
        socket.broadcast.emit('receive',{message:message,name :users[socket.id]})
    })
    //If someone Leave the cHat,let other know ;
    socket.on ('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})