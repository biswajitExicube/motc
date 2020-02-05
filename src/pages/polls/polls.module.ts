import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PollsPage } from './polls';
import { ComponentsModule } from '../../component/component.module';

// For Language Change
import {HttpClient } from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    PollsPage,
  ],
  imports: [
    IonicPageModule.forChild(PollsPage),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    ComponentsModule
  ],
})
export class PollsPageModule {}
