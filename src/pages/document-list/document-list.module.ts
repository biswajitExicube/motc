import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentListPage } from './document-list';
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
    DocumentListPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentListPage),
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
export class DocumentListPageModule {}
