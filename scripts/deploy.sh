#!/bin/bash
if [ $# -eq 0 ]
then
    echo "\$npm run deploy -- staging or \$npm run deploy -- production"
    exit
else
    case "$1" in
        production)
            echo "Deploying app in production mode"
            cd platforms/ios
            fastlane production
            cd ../android
            fastlane production
            ;;
        staging)
            echo "Deploying app in staging mode"
            cd platforms/ios
            fastlane beta
            cd ../android
            fastlane beta
            ;;
    esac
fi
