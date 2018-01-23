# #!/bin/sh
  cd android && ./gradlew assembleRelease
  react-native run-android --variant=release
