import * as builder from 'electron-builder';
import * as fs from 'fs';
import * as fse from 'fs-extra';

const PRODUCT_NAME = 'sys-info';
const VERSION = '1.0.0';
const ext = 'exe';
const BUILD_FOLDER = `build-${VERSION}`;
const URL_DOWNLOAD = 'https://gestion-materiels.herokuapp.com';
async function main() {
  const opt: builder.CliOptions = {
    targets: builder.Platform.WINDOWS.createTarget(),
    config: {
      directories: {
        output: BUILD_FOLDER,
        // buildResources: `./`,
        // app: './'
      },
      buildVersion: '1.0.0',
      appId: 'com.myCompany.myApp',
      productName: 'myAppName',
      copyright: 'Copyright © 2019 myCompany',
      nsisWeb: {
        appPackageUrl : `${URL_DOWNLOAD}/download/${PRODUCT_NAME}.${ext}`,
        artifactName: `${PRODUCT_NAME}.${ext}`,
        // artifactName: `${PRODUCT_NAME} Web Setup ${VERSION}.${ext}`,
        allowElevation: true,
        allowToChangeInstallationDirectory: true,
        oneClick: false,
      },
      win: {
        artifactName: `${PRODUCT_NAME}-${VERSION}.${ext}`,
        asar: true,
        // icon: `${__dirname}/angular/src/assets/icon.png`,
        compression: "maximum",
        files: [
          './node_modules/@*',
          '!./build*',
          '!./angular*',
          './main.js',
          './dist/**/*'
        ],
        target: [
          {
            // target: 'portable',
            target: 'nsis-web',
            arch: [
              'ia32',
              // 'x64'
            ],
          }
        ],
      },
    },
  };

  try {
    if (fse.existsSync(`${__dirname}/${BUILD_FOLDER}`)) {
      // fs.unlinkSync(`${__dirname}/${BUILD_FOLDER}`)
      fse.removeSync(`${__dirname}/${BUILD_FOLDER}`)
      console.log(`${__dirname}/${BUILD_FOLDER} a ete supprimer avec success`);
    }
    
    const r = await builder.build(opt)
    console.log('Build OK!', r);

  } catch (e) {
    console.log('>>>>>>>>>>>>>>>>>>>>>> BuilderAPi begin trace')
    console.log(e)
    console.log('>>>>>>>>>>>>>>>>>>>>>> BuilderAPi end trace')
  }
}

//
main();