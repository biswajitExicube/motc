import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ToolbarComponent } from './toolbar/toolbar';
import { Tab } from './tab/tab';

// For Language Change

import { HttpClientModule, HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { SearchBar } from './searchBar/searchBar';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
    declarations : [
        ToolbarComponent,
        Tab,
        SearchBar
    ],
    imports : [
        IonicModule,
        TranslateModule.forRoot({
          loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
          }
        }),
    ],
    exports : [
        ToolbarComponent,
        Tab,
        SearchBar
    ]
})

export class ComponentsModule {};