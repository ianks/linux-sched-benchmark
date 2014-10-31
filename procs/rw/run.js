var child = require('child_process'),
    fs = require('fs'),
    glob = require('glob'),
    _ = require('lodash'),
    getrusage = require('rusage').getrusage,
    RandBytes = new require('randbytes'),
    RUSAGE_CHILDREN = require('rusage').RUSAGE_CHILDREN;

var randomSource = RandBytes.urandom.getInstance();


var args = process.argv.slice(2);
var scheduler = args[0];

var rand = Math.floor((Math.random() * 100000) + 1);
var rwinput = 'procs/rw/rwinput-' + rand;

var cmd = './procs/rw/rw 10240 1024 ' + rwinput + ' procs/rw/rwoutput ' + scheduler;

randomSource.getRandomBytes(1000000, function (buff) {
  fs.writeFile(rwinput, buff, function(err) {
    if(err) throw err;

    var proc = child.exec(cmd, function (error, stdout, stderr) {
      var ru = getrusage(RUSAGE_CHILDREN);
      ru['pid'] = proc.pid;

      console.log(JSON.stringify(ru));

      fs.unlink(rwinput, function(err) {
        if (err) throw err
      });

      glob("procs/rw/**", function (er, files){
        files.forEach(function(file){
          if (file.indexOf("rwoutput") > -1) {
            fs.unlink(file, function(err) {
              if (err) throw err
            });
          }
        });
      });
    });
  });
});
//
// var cmd = './procs/rw/rw 10240 1024 ' + rwinput + ' procs/rw/rwoutput ' + scheduler;
//
// var proc = child.exec(cmd, function (error, stdout, stderr) {
//
//   var ru = getrusage(RUSAGE_CHILDREN);
//   ru['pid'] = proc.pid;
//
//   console.log(JSON.stringify(ru));
//
//   fs.unlink(rwinput, function(err) {
//     if (err) throw err
//   });
//
//   glob("procs/rw/**", function (er, files){
//     files.forEach(function(file){
//       if (file.indexOf("rwoutput") > -1) {
//         fs.unlink(file, function(err) {
//           if (err) throw err
//         });
//       }
//     });
//   });
// });
