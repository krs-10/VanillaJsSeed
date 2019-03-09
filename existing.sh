#!/bin/bash

set -e

ask_continue () {
    finalvalue=${@:1:$#-1}
    label="${!#}"
    while true; do
        read -rp "Your entered $finalvalue as your $label. Does that look right? (y/n/q): " input        
        case $input in
            [yY]*)
				result=$finalvalue
                echo $result
                break
                ;;
            [nN]*)
                read -p "Please re-enter your $label: " finalvalue
                echo >&2
                ;;
			[qQ]*)
				echo "Quitting setup"
				exit 1
				;;
             *)
                echo 'Invalid input; please try again' >&2
        esac
    done
}

# default values
repo_base_url="https://github.com/krs-10/VanillaJsSeed.git"
default_repo_name="NewVanillaJsSeed"
default_dir="../NewVanillaJsSeed"
default_branch="master"

read -rp "Enter the link to your existing Github repo (required): " args_existing_repo
existing_repo=${args_existing_repo:?"This is a required value."}
existing_repo=`ask_continue $existing_repo "username"`

read -rp "Enter your directory location - remember, it is relative to this folder! (default is $default_dir): " args_dir
dir=${args_dir:-$default_dir}

echo "Cloning Vanilla JS into $dir"
rm -rf "$dir"
mkdir "$dir"
cd "$dir"
git clone --depth 1 $repo_base_url .


# echo "Removing old .git folder..."
rm -rf .git

# echo "Initiating git..."
git init
git add .

# # creating an initial commit
git commit -m "Pulling in VanillaJS source"

# # asking for user's branch
read -rp "Enter your repo's target branch (default is $default_branch): " args_branch
branch=${args_branch:-$default_branch}
branch=`ask_continue $branch "repo branch"`

git remote add origin $existing_repo

git push -u origin $branch

echo "All done! :D"
