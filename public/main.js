//Conexion al servidor de socket
const socket = io()

// Join chat 
const { username } = Qs.parse(window.location.search, {
    ignoreQureyPrefix : true
})

socket.emit('join-chat', {username}) 