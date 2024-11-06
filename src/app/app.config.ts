import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { translateLoaderFactory } from './utils/translate-loader-factory.util';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: translateLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
  ],
};
