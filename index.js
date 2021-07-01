#!/usr/bin/env node
const { exec } = require('child_process');
const fs = require('fs');
const glob = require('glob');
const isWsl = require('is-wsl');

try {
  const cwd = process.cwd();
  const modulesResults = glob.sync(`${cwd}/**/node_modules`);

  modulesResults.forEach((modulesPath) => {
    if (
      modulesPath.indexOf('node_modules') ===
      modulesPath.lastIndexOf('node_modules')
    ) {
      // shell command
      const platform = process.platform;
      const command = () => {
        switch (platform) {
          case 'win32':
            return `Set-Content -Path '${modulesPath}' -Stream com.dropbox.ignored -Value 1`;
          case 'darwin':
            return `xattr -w com.dropbox.ignored 1 "${modulesPath}"`;
          case 'linux':
            return isWsl
              ? `powershell.exe -Command "Set-Content -Path '${modulesPath.replace(
                  `/mnt/${modulesPath.split('/')[2]}`,
                  `${modulesPath.split('/')[2]}:`
                )}' -Stream com.dropbox.ignored -Value 1"`
              : `attr -s com.dropbox.ignored -V 1 ${modulesPath}`;
          default:
            throw new Error('Could not identify your OS');
        }
      };

      // execute shell command
      exec(command(), (error, _stdout, stderr) => {
        if (error) {
          throw error;
        }
        if (stderr) {
          throw stderr;
        }

        console.log(`Dropbox is now ignoring ${modulesPath}`);
      });
    }
  });

  console.log('Complete.');
} catch (error) {
  console.log(`Error: ${error.message}`);
}
