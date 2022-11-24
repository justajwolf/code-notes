# fileserver

This is a simple static files hosted service.

when you want to deploy a file Hosted service, it is easy and the best way for you.

see [justajwolf/go/fileserver](https://github.com/justajwolf/go/tree/main/fileserver).

## Build

```bash
# build current dir to make the cli file named fileserver.
$ go build .

# see help
$ fileserver -h
Usage of fileserver:
  -c string
        set start, to exec fileserver in a daemon. set stop, to quit the daemon. the default is start a normal process.
  -d string
        files dir. (default "./")
  -m string
        debug is a dev mode. (default "release")
  -p string
        listen to port. (default "1090")
```

## Usage

The following demo is executed in `ubuntu`.

### Announcements

If `"-c"` is not set flag, or value is not `"start"` or `"stop"`. it will setup a server only in current process that is not a daemon service.

Besides, `"-m"` is `release` by default. if u want to show log, only set the flag value to `debug`.

You can try it like:

```bash
# start a simple server in current process. when you exit the shell, this server will quit.
$ fileserver
hosting a dir(./) and listening port(1090) ...

# use other port
$ fileserver -p 9999
hosting a dir(./) and listening port(9999) ...

# use other dir
fileserver -p 9999 -d /home/www
hosting a dir(/home/www) and listening port(9999) ...
```

### Steps

> Notes: we assume that the current user is `root`. if not, so you need to consider whether to use the prefix, `sudo`.

```bash
# clone repo to local.
$ git clone git@github.com:justajwolf/go.git

# enter into the dir of fileserver.
$ cd go/fileserver

# build the cli file of fileserver into "/usr/bin". (the dir is included by $PATH, so it can use the cli file directly after building.)
$ go build -o /usr/bin .

# start daemon service. (it will set auto startup when power on.)
$ fileserver -c start -p 9999 -d /home/www
● fileserver.service - Files server daemon
     Loaded: loaded (/lib/systemd/system/fileserver.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2022-01-11 23:33:27 CST; 590ms ago
   Main PID: 557345 (fileserver)
      Tasks: 6 (limit: 18947)
     Memory: 3.2M
     CGroup: /system.slice/fileserver.service
             └─557345 /usr/bin/fileserver -m release -p 9999 -d /home/www

Jan 11 23:33:27 xxx-pc systemd[1]: Started Files server daemon.
Jan 11 23:33:27 xxx-pc fileserver[557345]: hosting a dir(/home/www) and listening port(9999) ...
start fileserver daemon success.

# stop daemon
$ fileserver -c stop
stop fileserver daemon success.
```

## License

The License is [MIT](../LICENSE).
