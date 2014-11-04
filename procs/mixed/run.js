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

var mixedinput = 'procs/mixed/mixedinput-' + process.pid;

var cmd = './procs/mixed/mixed 10240 1024 ' + mixedinput + ' procs/mixed/mixedoutput ' + scheduler;
var randomSource = RandBytes.urandom.getInstance();

randomSource.getRandomBytes(200000, function (buff) {
  fs.writeFile(mixedinput, buff, function(err) {
    if(err) throw err;

    // fork process
    var proc = child.exec(cmd, function (error, stdout, stderr) {
      var ru = getrusage(RUSAGE_CHILDREN);
      var mixedoutput = 'procs/mixed/rwoutput-' + proc.pid;
      ru['pid'] = proc.pid;

      console.log(JSON.stringify(ru));

      // remove mixedinput file
      fs.unlink(mixedinput, function(err) {
        if (err) throw err
      });

      // fs.unlink(mixedoutput, function(err) {
      //   if (err) throw err
      // })
    });
  });
});
