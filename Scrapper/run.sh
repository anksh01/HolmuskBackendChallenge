#!/bin/bash
for i in $( cat links.txt ); do
    node Scrapper_MyFitness.js $i
done
