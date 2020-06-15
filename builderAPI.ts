import * as builder from 'electron-builder';

const opt: builder.CliOptions = {
  targets: builder.Platform.WINDOWS.createTarget(),
  config: {
    directories: {
      output: 'build05',
      // buildResources: `./`,
      // app: './dist'
    },
    buildVersion: '1.0.0',
    appId: 'com.myCompany.myApp',
    productName: 'myAppName',
    copyright: 'Copyright © 2019 myCompany',
    win: {
      artifactName: 'app.exe',
      asar: false,
      files: [
        '!./node_modules/@*',
        '!./build*',
        './dist/main.js',
        './dist/**/*'
      ],
      target: [
        {
          target: 'portable',
          arch: [
            'ia32',
            // 'x64'
          ],
        }
      ],
      // icon: './src/favicon.ico'
    },
  },
};

builder.build(opt)
  .then(r => console.log('Build OK!', r))
  .catch(e => console.log(e));

