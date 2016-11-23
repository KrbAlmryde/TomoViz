(function() {
    let width = window.innerWidth,
        height = window.innerHeight,
        socket = io();

    console.log("I am awaken");
    socket.emit("hello", "the client")
    socket.on("hello", d =>{
        console.log("We got a hello from:", d);
        socket.emit("client-ready", null)
    })

    socket.on("server-images", data => {
        console.log("we got some data,", data);
        let div = d3.select("div.container")
    })

})()




function generateImageButton() {

}


/*
      <div class="row">
        <div class="col-md-4">
          <h2>Agar</h2>
          <p>
          <img class="img-thumbnail" alt="static image data" src="./images/agar.PNG" data-holder-rendered="true" style="width: 400px; height: 400px;">
          </p>
          <p><a class="btn btn-default" href="http:sage2rtt.evl.uic.edu:8080" role="button" target="_blank"> Visualize &raquo;</a></p>
        </div>
        <div class="col-md-4">
          <h2>Redwood Bark</h2>
          <p>
            <img class="img-thumbnail" alt="static image data" src="./images/redwood.PNG" data-holder-rendered="true" style="width: 400px; height: 400px;">

          </p>
          <p><a class="btn btn-default" href="http:sage2rtt.evl.uic.edu:8080" role="button" target="_blank" > Visualize &raquo;</a></p>
       </div>
        <div class="col-md-4">
          <h2>Dark matter </h2>
          <p>
          <img class="img-thumbnail" alt="static image data" src="./images/scivis.PNG" data-holder-rendered="true" style="width: 400px; height: 400px;">

          </p>
          <p><a class="btn btn-default" href="http:sage2rtt.evl.uic.edu:8080" role="button" target="_blank"> Visualize &raquo;</a></p>
        </div>
      </div>
*/