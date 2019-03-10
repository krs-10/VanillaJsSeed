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

# Defining your GH username
read -rp "Enter your Github username (required): " args_user_name
user_name=${args_user_name:?"This is a required value."}
user_name=`ask_continue $user_name "username"`

# Defining your new repo name
read -rp "Enter the name of your new repo (default is $default_repo_name): " args_repo_name
user_repo_name=${args_repo_name:-$default_repo_name}

# Setting the clone directory location
default_dir="$PWD/$user_repo_name"
read -rp "Enter your directory location - remember, it is relative to this folder! (default is $default_dir): " args_dir
dir=${args_dir:-$default_dir}

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

repo="git@github.com:${user_name}/${user_repo_name}.git"

git clone --depth 1 $repo_base_url .

# echo "Removing old .git folder..."
rm -rf .git

# echo "Initiating git..."
git init
git add .

# # creating an initial commit
git commit -m "Initial Commit"

git remote add origin $repo

echo '================================='
echo "YOUR REPO INFO"

echo "Please go to https://github.com/new and enter the following info:"
echo "*******"
echo "Name: ${user_repo_name}"
echo "Owner: ${user_name}"
echo "Remote upstream: ${repo}"
echo "*******"

echo "Don't forget to clean out your package.json :)"
echo '================================='
