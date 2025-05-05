# Tizen Build Guide

This guide provides step-by-step instructions for building and deploying the IPTV OTT App to a Samsung Tizen TV.

## Prerequisites

1. Install Tizen Studio with TV Extension
2. Configure Samsung Certificate for signing
3. Enable Developer Mode on your Samsung TV

## Building the Application

### Method 1: Using Tizen Studio GUI

1. Open Tizen Studio
2. Import the project:
   - Click File > Import > Tizen > Tizen Project
   - Browse to the project directory
   - Select the project and click Finish

3. Build the project:
   - Right-click on the project in Project Explorer
   - Select Build Project

4. Run on Emulator or Device:
   - Right-click on the project
   - Select Run As > Tizen Web Application
   - Choose your target device or emulator

### Method 2: Using Tizen CLI

1. Navigate to your project directory in Command Prompt:
   ```
   cd C:\Users\pandamimini\Desktop\nsdev\tizen-iptv-app
   ```

2. Build the web application:
   ```
   tizen build-web -out .buildResult
   ```
   Note: The `-out` parameter specifies the output directory. In this case, it will create a `.buildResult` directory in your project folder.

3. Package the application:
   ```
   tizen package -t wgt -o . -- .buildResult
   ```
   This will create a `.wgt` file in your current directory.

4. Install on a connected device:
   ```
   tizen install -n iptv-app.wgt -t T-samsung-5.5
   ```
   Replace `T-samsung-5.5` with your target device profile.

## Common Issues and Solutions

### Issue: "The syntax of the command is incorrect"

When running:
```
tizen build-web -out <C:\Users\pandamimini\Desktop\nsdev\tizen-iptv-app>
```

**Solution:**
Remove the angle brackets and use quotes if the path contains spaces:
```
tizen build-web -out "C:\Users\pandamimini\Desktop\nsdev\tizen-iptv-app\.buildResult"
```

### Issue: "No argument is allowed: ./.buildResult"

**Solution:**
Make sure you're using the correct syntax for the `-out` parameter:
```
tizen build-web -out .buildResult
```

### Issue: Certificate errors

**Solution:**
1. Open Certificate Manager in Tizen Studio
2. Create a new Samsung certificate profile
3. Follow the wizard to generate or import certificates

## Testing on TV

1. Enable Developer Mode on your Samsung TV:
   - Go to Apps
   - Press 1, 2, 3, 4, 5 in sequence on the remote
   - Enable Developer Mode
   - Set the IP address of your development machine

2. Connect to the TV from Tizen Studio:
   - Open Device Manager in Tizen Studio
   - Click "Scan" to find your TV
   - Select your TV and click "Connect"

3. Install the application:
   - Right-click on the project
   - Select Run As > Tizen Web Application
   - Choose your connected TV

## Alternative: Direct Import to Tizen Studio

If you're having issues with the CLI, you can also:

1. Create a new Tizen Web Project in Tizen Studio
2. Copy your project files (src, public, etc.) into the new project
3. Update the config.xml file with your application settings
4. Build and run from Tizen Studio directly

This approach bypasses the need to use the Tizen CLI tools.
