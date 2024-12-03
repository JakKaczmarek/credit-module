import { registerLocaleData } from '@angular/common';
import localeFrCH from '@angular/common/locales/fr-CH';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

registerLocaleData(localeFrCH, 'fr-CH');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    { provide: LOCALE_ID, useValue: 'fr-CH' },
  ]
};
