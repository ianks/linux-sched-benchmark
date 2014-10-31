var child           = require('child_process'),
    process         = require('process'),
    fs              = require('fs'),
    glob            = require('glob'),
    _               = require('lodash'),
    getrusage       = require('rusage').getrusage,
    RandBytes       = new require('randbytes'),
    RUSAGE_CHILDREN = require('rusage').RUSAGE_CHILDREN;

var args = process.argv.slice(2);
var scheduler = args[0];

var rwinput = 'procs/rw/rwinput-' + process.pid;

var cmd = './procs/rw/rw 10240 1024 ' + rwinput + ' procs/rw/rwoutput ' + scheduler;
var randomSource = RandBytes.urandom.getInstance();

randomSource.getRandomBytes(100000, function (buff) {
  fs.writeFile(rwinput, buff, function(err) {
    if(err) throw err;

    // fork process
    var proc = child.exec(cmd, function (error, stdout, stderr) {
      var ru = getrusage(RUSAGE_CHILDREN);
      ru['pid'] = proc.pid;

      console.log(JSON.stringify(ru));

      // remove rqinput file
      fs.unlink(rwinput, function(err) {
        if (err) throw err
      });
    });
  });
});
