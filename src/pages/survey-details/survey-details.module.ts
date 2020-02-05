import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyDetailsPage } from './survey-details';
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
    SurveyDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SurveyDetailsPage),
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
export class SurveyDetailsPageModule {}
