'use strict';

var args = process.argv.slice(2);
var outfile = args[0] + '/getrusage_stats.json';

var fs = require('fs'),
    getrusage = require('rusage').getrusage,
    async = require('async'),
    child = require('child_process');

var output_arr = [];
var count = 0;
var num_processes = +args[1];

for(var i = 0; i < num_processes; i++) {
  // Fork a bunch of processes
  var cmd = 'node ' + args[0] + '/run.js';
  var ls = child.exec(cmd, function (error, stdout, stderr) {
    if (count == num_processes)

    count += 1;

    if (error) {
      console.log(error.stack);
      console.log('Make sure to enter the correct arguments (i.e. `node main.js procs/fib.js 50`');
      process.exit(1);
    }

    var output = JSON.parse(stdout);
    output_arr.push(output);

    count += 1;

    if (count == num_processes)
      record_results();
  });
}

// Write to a file
function record_results(){
  fs.appendFile(outfile, JSON.stringify(output_arr), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log('getrusage() stats was saved to: ' + outfile);
    }
  });
}
