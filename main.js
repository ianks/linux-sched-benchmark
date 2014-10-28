'use strict';

var args = process.argv.slice(2);
var outfile = args[0] + '/getrusage_stats.json';

var fs = require('fs'),
    getrusage = require('rusage').getrusage,
    async = require('async'),
    child = require('child_process');

for(var i = 0; i < +args[1]; i++) {
  // Fork a bunch of processes
  var cmd = 'node ' + args[0] + '/run.js';
  var ls = child.exec(cmd, function (error, stdout, stderr) {
    if (error) {
      console.log(error.stack);
      console.log('Make sure to enter the correct arguments (i.e. `node main.js procs/fib.js 50`');
      process.exit(1);
    }

    // Write to a file
    fs.appendFile(outfile, stdout, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('getrusage() stats was saved to: ' + outfile);
      }
    });
  });
}
