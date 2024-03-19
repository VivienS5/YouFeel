import { ApplicationConfig ,importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app-routing.module'; 
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { HttpClientModule,provideHttpClient,withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync('noop'), provideAnimationsAsync(), provideAnimationsAsync(),provideCharts(withDefaultRegisterables()),importProvidersFrom(HttpClientModule),provideHttpClient(withFetch())]
}