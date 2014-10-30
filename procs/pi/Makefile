CC = gcc
CFLAGS = -c -g -Wall -Wextra
LFLAGS = -g -Wall -Wextra

INPUTFILESIZEMEGABYTES = 1

KILO = 1024
MEGA = $(shell echo $(KILO)\*$(KILO) | bc)
INPUTFILESIZEBYTES = $(shell echo $(MEGA)\*$(INPUTFILESIZEMEGABYTES) | bc)
INPUTBLOCKSIZEBYTES = $(KILO)
INPUTBLOCKS = $(shell echo $(INPUTFILESIZEBYTES)\/$(INPUTBLOCKSIZEBYTES) | bc)

.PHONY: all clean

all: pi-sched

pi-sched: pi-sched.o
	$(CC) $(LFLAGS) $^ -o $@ -lm

pi-sched.o: pi-sched.c
	$(CC) $(CFLAGS) $<

clean: testclean
	rm -f pi-sched
	rm -f *.o
	rm -f *~

testclean:
	rm -f rwoutput*
