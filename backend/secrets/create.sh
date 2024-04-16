#!/usr/bin/env bash

# cleanup
DIRECTORY=$(dirname $0)
rm -r $DIRECTORY/*.txt

# go through each line of secrets.ini for each line that is /\w = .*/ write to a file

while read -r line; 
do     
if [[ $line =~ ^[a-zA-Z0-9_]+\ =\ .+$ ]]; then
    echo $line
    key=$(echo $line | awk '/.+/ {print $1}')
    value=$(echo $line | awk '/.+/ {print $3}')
    echo -n "$value" > $DIRECTORY/$key.txt
    fi; 
done < $DIRECTORY/secrets.ini