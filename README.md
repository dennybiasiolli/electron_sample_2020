# electron_sample
example on how to convert a simple website to an electron app


## requirements and setup

Use Node.js LTS. Install instructions on Debian:

```sh
# Step 1 – Add Node.js PPA
sudo apt-get install curl software-properties-common
curl -sL https://deb.nodesource.com/setup_12.x | sudo bash -
# Step 2 – Install Node.js on Debian
sudo apt-get install nodejs
# Step 3 – Check Node.js Version
node -v
npm -v
```

Install wine for win32 packaging on Linux/MacOS. Install instructions on Debian:

```sh
# Step 1 – Prerequsites
sudo dpkg --add-architecture i386
wget -qO - https://dl.winehq.org/wine-builds/winehq.key | sudo apt-key add -
sudo apt-add-repository https://dl.winehq.org/wine-builds/debian/
# Step 2 – Install Wine on Debian 9
sudo apt-get update
sudo apt-get install --install-recommends winehq-stable
export PATH=$PATH:/opt/wine-stable/bin
# Step 3 – Check Wine Version
wine --version
```

Install reccomended packages on Linux:

```sh
sudo apt-get install --no-install-recommends -y libopenjp2-tools
```


Install dependency with `npm install`


## launch electron

```sh
npm run start
```


## Issue 1

Running electron from Linux can display the following error:

```sh
[24429:0111/231418.511876:FATAL:setuid_sandbox_host.cc(157)] The SUID sandbox
helper binary was found, but is not configured correctly.
Rather than run without sandboxing I'm aborting now.
You need to make sure that
/home/parallels/git/electron_sample_2020/node_modules/electron/dist/chrome-sandbox
is owned by root and has mode 4755.
```

A possible workaround can be this command:

`sudo sysctl kernel.unprivileged_userns_clone=1`


## Issue 2

Running on macOS with Parallels installed can display the following error:

```sh
(node:86432) UnhandledPromiseRejectionWarning: Error: Please ensure that you
are logged in "Windows 10" parallels virtual machine.
In the future please do not stop VM, but suspend.
```

A possible workaround can be configuring target for win in electron builder file:

```yaml
win:
    target: nsis
```
