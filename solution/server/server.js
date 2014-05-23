// Include The 'net' Module
var net = require("net");

// Include The 'sentiment' Module
var sentiment = require("sentiment");

// Create a TCP Server Instance and set an event listener & handler for the TCP connection event emitted by the server
var tcpServer = net.createServer(function(conn) {
	
  // Connection Information for Prefix Logging
  var connLogPrefix = "[" + conn.remoteAddress + ":" + conn.remotePort + "]";
    
  console.log(connLogPrefix, " Connected.");

  // Set an event listener & handler for the TCP data event emitted by the connection
  conn.on("data", function(data) {
    console.log(connLogPrefix, " Got Some Data: ", data);
		
    sentiment(data, function(error, score) {
      if (score) {
        // Write the processed score back to the client connection
        conn.write("Sentiment Score: " + score + "\r\n");
      }
    });
  });

  // Set an event listener & handler for the TCP end event emitted by the connection 
  conn.on("end", function(data) {
    console.log(connLogPrefix, " Bye.");
  });
	
  // Set the Connection Encoding to UTF-8
  conn.setEncoding("utf-8");
});

// Set an event listener & handler for error event emitted by the server
tcpServer.on("error", console.error);

// Listen on port 3000
tcpServer.listen(process.env.PORT || 3000, function() {
    console.log("TCP Server Started. Listening on Port " + tcpServer.address().port);
});
