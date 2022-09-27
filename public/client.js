const socket = io()
socket.on("server-message", (data) => {
    console.log(`recibi el mensaje ${data}`)
})

const input = document.querySelector("#chat-input")

input.addEventListener("input", () => {
    socket.emit("message", input.value)
})