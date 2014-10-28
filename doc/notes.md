### Get sched stats
    /proc/<pid>/schedstat

### To make it IO bound
  1) Wont actually read a file if its in cache

    read = open(fp, O_RDONLY| O_SYNC);
    open = open(fp, O_WRONLY | O_RDNY | O_SYNC |);

### Run more processes than cores
