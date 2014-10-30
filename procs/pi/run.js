var child = require('child_process'),
    getrusage = require('rusage').getrusage;

var RUSAGE_CHILDREN = require('rusage').RUSAGE_CHILDREN;

var args = process.argv.slice(2);
var scheduler = args[0];

var iterations = 100000000;
var bytesToCopy = 102400;
var blocksize = 1024;

var cmd = './procs/pi/pi-sched 100000000 ' + scheduler;

var proc = child.exec(cmd, function (error, stdout, stderr) {
  var ru = getrusage(RUSAGE_CHILDREN);
  ru['pid'] = proc.pid;
  console.log(JSON.stringify(ru));
});
