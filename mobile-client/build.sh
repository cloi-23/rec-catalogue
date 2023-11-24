#!/bin/sh

# Variables
DEVICE_ID=192.168.1.45:58526
BUILD_TYPE="${2:-debug}" # debug by default, can be overridden with 'release'
# KEYSTORE_PATH=/home/cloi/jimi-one/mobile-client/jimi-one-key.keystore
# KEY_ALIAS=jimi-one-alias
# KEYSTORE_PASSWORD=cloi123
# KEY_PASSWORD=cloi123
# Check if device IP is provided
if [ -z "$DEVICE_ID" ]; then
    echo "Please provide a device IP as the first argument."
    exit 1
fi

# Build the Ionic app
ionic build 

# Check if the Ionic app was built successfully
if [ $? -ne 0 ]; then
    echo "Error building Ionic app!"
    exit 1
fi

# Add Android platform to the project (if not added)
ionic capacitor add android

# Copy web assets to the Android platform
ionic capacitor copy android

# Navigate to the Android directory
cd android

# Build the Android app using Gradle
if [ "$BUILD_TYPE" = "debug" ]; then
    ./gradlew assembleDebug
else
    # Verifying the APK
    echo "Signing the APK..."
    ./gradlew signReleaseBundle -Pandroid.injected.signing.store.file="$KEYSTORE_PATH" -Pandroid.injected.signing.store.password="$KEYSTORE_PASSWORD" -Pandroid.injected.signing.key.alias="$KEY_ALIAS" -Pandroid.injected.signing.key.password="$KEY_PASSWORD"
fi

# Check if the APK was built successfully
if [ $? -eq 0 ]; then
    echo "APK built successfully!"
else
    echo "Error building APK!"
    exit 1
fi

# Install the APK on the specified device
adb -s $DEVICE_ID uninstall io.ionic.starter
adb -s $DEVICE_ID install app/build/outputs/apk/$BUILD_TYPE/app-debug.apk

# Check if the APK was installed successfully
if [ $? -eq 0 ]; then
    echo "APK installed successfully! 👍"
else
    echo "Error installing APK!"
    exit 1
fi