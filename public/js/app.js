(function() {
    let width = window.innerWidth,
        height = window.innerHeight,

        socket = io()

        socket.on("hello", d =>{
            console.log("We got a hello and a thing:", d);
            socket.emit("client-ready", null)
        })

        socket.on("server-images", data => {
            console.log("we got some data,", data);
            let div = d3.select("#anchor")
        })

})()

