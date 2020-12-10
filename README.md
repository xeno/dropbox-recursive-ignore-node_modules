# Dropbox Ignore node_modules

This NodeJS script works as a CLI that tells Dropbox to ignore all node_modules directories. It searches recursively, so you only have to run it once.

As per [Dropbox Documentation](https://help.dropbox.com/en-us/files-folders/restore-delete/ignored-files) you can see the simple command used to do this.

## Usage

Install package globally.

```bash
npm i dropbox-recursive-ignore-node_modules -g
```

Using CLI, navigate to your primary Dropbox folder.

You may use the command `dropignore` or `di` for short.

```bash
cd ~/Dropbox
di
```

## Notes

- Should work with Windows, Windows with WSL, MacOS and Linux. Only tested on Windows with WSL.
- This will only ignore currently installed node_modules folders, so you'll have to run it again if you install a new project.

Forked from [tmackness/dropbox-ignore-node_modules](https://github.com/tmackness/dropbox-ignore-node_modules)
Many thanks to tmackness and dilincoln for their work on the original project.
