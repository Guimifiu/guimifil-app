#!/bin/bash
if [ "$TRAVIS_BRANCH" == "staging" ]; then
  cd platforms/ios
  fastlane beta
  cd ../android
  fastlane beta
fi
