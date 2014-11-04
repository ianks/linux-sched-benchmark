Scheduler Benchmark
===================

### Install it:
1. `git clone https://github.com/ianks/linux-sched-benchmark.git`
2. `npm install`

### Run it:
1. Gain ability to run node in sudo here: [nodenv-sudo](https://github.com/ianks/nodenv-sudo)
2. Run the script: `nodenv sudo node main.js <path/to/process> <num_processes> <typeof_scheduler>`
3. The output will be saved as a csv file inside of the data folder.

### Details:
Here, the path the process is the location of either: 
  1. I/O bound process (i.e a file that reads and writes to disk)
  2. CPU bound process (i.e. a file that computes n-digits of pi)
  3. Hybrid process (mix of both types specified above)

The scheduler types that were tested were: 
  1. SCHED_RR (Real Time) 
  2. SCHED_FIFO (Real Time)
  3. SCHED_OTHER (Completely Fair).

### Example:
`nodenv sudo node main.js procs/pi 15 SCHED_FIFO`

Output file: data/SCHED_FIFO/pi-15.csv
