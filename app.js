// Include the cluster module
var cluster = require("cluster");

// Code to run if we're in the master process
if (cluster.isMaster) {
  // Count the machine's CPUs
  var cpuCount = require("os").cpus().length;

  // Create a worker for each CPU
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }

  // Listen for terminating workers
  cluster.on("exit", function(worker) {
    // Replace the terminated workers
    console.log("Worker " + worker.id + " died :(");
    cluster.fork();
  });

  // Code to run if we're in a worker process
} else {

  const express = require("express");
  const bodyParser = require("body-parser");
  const mutationRoutes = require("./routes/mutation");
  const statsRoutes = require("./routes/stats");
  const app = express();

  app.use(bodyParser.json()); // application/json

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  });

  app.use("/mutation", mutationRoutes);
  app.use("/stats", statsRoutes);

  var port = process.env.PORT || 8080;

  var server = app.listen(port, function() {
    console.log("Server running at http://127.0.0.1:" + port + "/");
  });
}
