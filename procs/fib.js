'use strict';

var RUSAGE_SELF = require('rusage').RUSAGE_SELF;
var getrusage = require('rusage').getrusage;

function fib(x) {
  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return fib(x-1)+fib(x-2);
  }
}

fib(40);
var ru = getrusage(RUSAGE_SELF);
console.log(ru);
