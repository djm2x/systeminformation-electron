import * as builder from 'electron-builder';


async function main() {
  const opt: builder.CliOptions = {
    targets: builder.Platform.WINDOWS.createTarget(),
    config: {
      directories: {
        output: 'build07',
        // buildResources: `./`,
        // app: './dist'
      },
      buildVersion: '1.0.0',
      appId: 'com.myCompany.myApp',
      productName: 'myAppName',
      copyright: 'Copyright © 2019 myCompany',
      win: {
        artifactName: 'caisse.exe',
        asar: false,
        files: [
          '!./node_modules/@*',
          '!./build*',
          // './dist/main.js',
          './dist/**/*'
        ],
        target: [
          {
            target: 'portable',
            arch: [
              // 'ia32',
              'x64'
            ],
          }
        ],
        // icon: './src/favicon.ico'
      },
    },
  };

  try {
    const r = await builder.build(opt)
    console.log('Build OK!', r)
  } catch (e) {
    console.log(e)
  }
}

//
main();