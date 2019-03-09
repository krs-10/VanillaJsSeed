#!/bin/bash

ask_continue () {
    finalvalue=${@:1:$#-1}
    label="${!#}"
    while true; do
        read -p "Your entered $finalvalue as your $label. Does that look right? (y/n): " input        
        case $input in
            [yY]*)
                echo $finalvalue
                break
                ;;
            [nN]*)
                read -p "Please re-enter your $label: " finalvalue
                echo >&2
                ;;
             *)
                echo 'Invalid input; please try again' >&2
        esac
    done
}

# inputvalue="what is for lounch"
# testing=`ask_continue $inputvalue foobar`
# echo $testing

inputvalue="default input source"
inputvalue=`ask_continue $inputvalue "finalarg foonalgrarg"`
echo $inputvalue
# func_result="$(ask_continue) $inputvalue foobar"
# echo $func_result

