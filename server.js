// Server things
let express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    sh = require('shelljs'),
    // File loading and management stuff
    // d3 = require('d3'),
    Promise = require('promise'),
    fs = require('fs'),
    // configure our ports
    port = process.env.PORT || 5000

// ====================== Begin Function Definitions ======================

// ================  DATA MANAGEMENT FUNCTIONS  ==============
//  Idea here is to do all the data processing on the server side,
//  then just serve it up as needed or when specifically requested
//  rather than store it all on the browser...

function readFile(filename) {
    /*------------------------------------------------------------------------*
     *
     *  Purpose: A simple file reader
     *
     *
     *    Input: filename - String: Qualified filename
     *
     *   Output: returns a function with a resolve, reject parameters,
     *           yeidling a promise
     *
     *------------------------------------------------------------------------*/

    return function(resolve, reject) {
        fs.readFile(filename, 'utf8', function(err, data) {
            if (err) reject(data);
            resolve(data);
        });
    }

} // End of readFile

// =================== START OF MAIN ================

(function() {
    /*------------------------------------------------------------------------*
     *
     *  Purpose: 'Main' entry point into application.
     *
     *
     *    Input:
     *
     *   Output: none
     *
     *------------------------------------------------------------------------*/

    // ============== Setting up the Server ===============

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/public/index.html');
    });

    // not sure what this does
    app.get(/^(.+)$/, (req, res) => {
        res.sendFile(__dirname + '/public/' + req.params[0]);
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send("Something done gone'n broke yo");
    });

    server.listen(port, () => {
        console.log('Listening on ' + port);
    });


    io.on('connection', socket => {
        socket.on("hello", () => {
            socket.emit("hello", "the server")
        })

        socket.on('client-ready', () => {
            console.log("client is ready");

            let data = sh.ls("./data/*") // get list of all files in data dir
            console.log("getting data from data dir");
            socket.emit("server-images", {
                "data": data
            })
        })

    })


    // ============== Doing stuff with Data ===============
    // var deferred = [
    //     new Promise(readFile('data/standingWater.tsv')),
    //     new Promise(readFile('data/blueIslandElevation.json'))
    // ]

    // Promise.all(deferred).then(processDataResults);

})()
