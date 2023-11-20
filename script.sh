#!/bin/bash
STEP_INDEX=1

while IFS= read -r -u 3 line; do
    clear
    echo -n "$STEP_INDEX) "
    printf "%b\n" "$line\n"
    read -s -p "Press enter to continue."
    echo -e "\n"
    STEP_INDEX=$((STEP_INDEX+1))
done 3< steps.txt
 
clear
echo "The End."
