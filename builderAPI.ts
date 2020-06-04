import * as builder from 'electron-builder';

const productName = 'djapp';
const version = '1.0.0';
const ext = 'exe';
async function main() {
  const opt: builder.CliOptions = {
    targets: builder.Platform.WINDOWS.createTarget(),
    config: {
      directories: {
        output: 'build08',
        // buildResources: `./`,
        app: './'
      },
      buildVersion: '1.0.0',
      appId: 'com.myCompany.myApp',
      productName: 'myAppName',
      copyright: 'Copyright © 2019 myCompany',
      nsisWeb: {
        appPackageUrl : 'https://example.com/download/latest',
        artifactName: `${productName} Web Setup ${version}.${ext}`,
        allowElevation: true,
        allowToChangeInstallationDirectory: true,
      },
      win: {
        artifactName: 'caisse.exe',
        asar: false,
        files: [
          './node_modules/@*',
          '!./build*',
          '!./angular*',
          // './dist/main.js',
          './dist/**/*'
        ],
        target: [
          {
            target: 'nsis-web',
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

  try {
    const r = await builder.build(opt)
    console.log('Build OK!', r)
  } catch (e) {
    console.log(e)
  }
}

//
main();