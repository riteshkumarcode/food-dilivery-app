@echo off
echo ================================================================
echo Generating Release Keystore for Swigaato Google Play Release
echo ================================================================
echo.

where keytool >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] 'keytool' command not found in your PATH.
    echo Please install Java JDK 17+ or run this from your JDK bin folder.
    pause
    exit /b 1
)

echo Generating play-store\swigaato-release-key.jks ...
keytool -genkey -v -keystore play-store\swigaato-release-key.jks -alias swigaato -keyalg RSA -keysize 2048 -validity 10000

echo.
echo Keystore created at play-store\swigaato-release-key.jks
echo Store this file and your passwords securely!
pause
