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

set -e

# default values
repo_base_url=https://github.com/krs-10/VanillaJsSeed
repo_src_url=git@github.com:krs-10/VanillaJsSeed.git
dir="../NewVanillaJsDirectory"
new_branch="master"

echo -n "Enter your new directory (make sure it's relative to this folder!): "
read dir

dir=`ask_continue $dir "new directory"`

echo "Cloning Vanilla JS into $dir..."
git clone --depth 1 -b master $repo_src_url $dir
cd "$dir"

echo "Removing old .git folder..."
rm -rf .git

echo "Initiating git..."
git init
git add .

# creating an initial commit
git commit -m "Initial Commit"

# asking for and confirming user's repo
echo -n "Enter the source of your new repo: " 
read new_repo
new_repo=`ask_continue $new_repo "repo source"`

# asking for user's branch
echo -n "Enter your new branch: "
read new_branch
new_branch=`ask_continue $new_branch "repo branch (default is master)"`

git remote add origin $new_repo

echo "Pushing to $new_branch at $new_source ..."
git push -u origin $new_branch

echo "All done! :D"
