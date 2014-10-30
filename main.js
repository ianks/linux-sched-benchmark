'use strict';

var args = process.argv.slice(2);
var outfile = args[0] + '/getrusage_stats.json';


var fs = require('fs'),
    getrusage = require('rusage').getrusage,
    async = require('async'),
    child = require('child_process'),
    json2csv = require('json-2-csv'),
    path = require('path');

var output_arr = [];
var count = 0;
var num_processes = +args[1];
var folder = args[0];
var sched = args[2];
var filename = folder.split('/')[1] + '-' + num_processes + '.csv';
var output_file = path.join('data', sched, filename);

for(var i = 0; i < num_processes; i++) {
  // Fork a bunch of processes
  var cmd = 'node ' + folder + '/run.js ' + sched;
  var proc = child.exec(cmd, function (error, stdout, stderr) {
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

// Write to a csv file
function record_results(){
  var json2csvCallback = function (err, csv) {
    if (err) throw err;

    fs.writeFile(output_file, csv, function(err){
      if (err) throw err;
      console.log('file saved');
    });
  };

  json2csv.json2csv(output_arr, json2csvCallback)
}
