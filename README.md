Scheduler Benchmark
===================

### Install it:
  1. Clone it.
  2. `npm install`

### Run it:
  1. Make a program which is either IO bound, CPU bound, or both.
    i.e. fib.js
  2. In your program, output the results of `getrusage`
    var args = process.argv.slice(2);
    var RUSAGE_SELF = require('rusage').RUSAGE_SELF;
    var getrusage = require('rusage').getrusage;
  3. Run the main script, specifying how many times to fork the process
    node main.js PROGRAM_NAME NUMBER_OF_PROCESSES
