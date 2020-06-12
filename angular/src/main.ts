import { enableProdMode, StaticProvider } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

const port = '5000';
const host = 'http://localhost';

const apiUrl = `${host}:${port}/api`;
const url = `${host}:${port}`;

const providers: StaticProvider[] = [
  // { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  {
    provide: 'BASE_URL',
    useValue: environment.production ? 'https://gestion-material.herokuapp.com' : url,
  },
  {
    provide: 'API_URL',
    useValue: environment.production ? `https://gestion-material.herokuapp.com/api` : apiUrl,
  }
];


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
