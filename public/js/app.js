(function() {
    let width = window.innerWidth,
        height = window.innerHeight,
        socket = io();

    console.log("I am awaken");
    socket.emit("client-ready", null);
    socket.on("server-images", response => {
        console.log("we got some data,", response);
        generateContainer(response.data, "#viz");

    })

})()

function generateContainer(data, pattern) {
    let div = d3.select(pattern)
    for(let i=0; i<data.length; i+=3) {
        let row = addRow(div)
        data.slice(i,i+3).map( img => {
            console.log("img",img);
            let imgURL = img.split("/public/")[1]
            console.log("imgURL", imgURL);
            appendToRow(row, column(imgURL))

        })

    }
    div.append('hr')
    div.append('footer').append('p').html('Developers: Kitware folks, Shiwangi Singh, Kyle Almryde')
}

function addRow(container) {
    return container.append('div')
        .attr('class', 'row')
}

function appendToRow(row, col) {
    row.node().appendChild( col.node() )
}

// g.evl.uic.edu:57880/wallcology/default/runs/portal/index2.html?broker=ltg.evl.uic.edu&app_id=wallcology&run_id=default&TYPE=teacher&INSTANCE=0#

function column(img) {
    /*------------------------------------------------------------------------*
     *
     *  Purpose: Generates a generic bootstrap col-MD, requires classing
     *           Appends Image
     *
     *    Input:
     *
     *   Output: A detached d3.selection object containing the
     *
     *------------------------------------------------------------------------*/

    // let name = img.split('.')[0].split('/')[1]
    console.log("column", img);
    let colMD4 = d3.select(document.createElement('div'))
        .attr('class', 'col-md-4')
        .attr('id', img)


    // TODO: strip out image name
    colMD4.append('h2')
        .html(img) // img's name

    colMD4.append('p')
      .append('img')
        .attr('class', 'img-thumbnail')
        .attr('alt', 'Click '+img+' to view data')
        .attr('src', img)
        .attr("data-holder-rendered", true)
        .style('width', '400px')
        .style('height', '400px')
        .on('click', ev => {
            console.log("opening page with", img, "data!", "http://131.193.183.212:8008" );
            window.open().location.replace("http://131.193.183.212:8008")

        })
    return colMD4


} // End of column


/*
      <div class="row"> // The ROW
        <div class="col-md-4"> // The COLUMN (4-1 wide)
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
