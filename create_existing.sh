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
init_script="https://github.com/krs-10/VanillaJsSeed/blob/master/init.sh"
default_repo_name="ClonedVanillaJsSeed"
default_branch="master"

read -rp "Enter the link to your existing Github repo (required): " args_repo
repo=${args_repo:?"This is a required value."}
repo=`ask_continue $repo "repo source link"`


# Setting the clone directory location
default_repo_gitname=${repo##*/}
echo "$default_repo_gitname"
default_repo_name=${default_repo_gitname%.git}
default_dir="$PWD/$default_repo_name"

read -rp "Enter your directory location - remember, it is relative to this folder! (default is $default_dir): " args_dir
dir=${args_dir:-$default_dir}

# echo "$dir"


if [ "$dir" == '.' ] || [ "$dir" == './' ] || [ "$dir" == "$PWD" ]
then
    $dir='.'
else
    if [[ ! -d "$dir" ]] 
    then
        mkdir "$dir"
        cd "$dir"
    fi
fi


# Cloning shallowly from VanillaJsSeed repo
git clone --depth 1 $repo_base_url .

# Removing VanillaJsSeed .git folder
rm -rf .git

git init
git add .

# creating an initial commit
git commit -m "Pulling in VanillaJS source"

# asking for user's branch
read -rp "Enter your repo's target branch. NOTE: this creates a new branch. If this branch already exists/has unresolved commits, it'll error out! (default is $default_branch): " args_branch
branch=${args_branch:-$default_branch}
branch=`ask_continue $branch "repo branch"`

git checkout -b $branch
git remote add origin $repo
git push -u origin $branch

echo "All done! :D"
