import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

/*
  Generated class for the AppDirectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppDirectionProvider {

  public direction : any;

  constructor(public http: HttpClient, public events: Events) {
    console.log('Hello AppDirectionProvider Provider');
    // this.direction = localStorage.getItem('direction');
    // console.log(this.direction);
  }
  changeDirection(){
    // if(this.direction == 'rtl'){
    //   this.events.publish('type:direction',  'rtl');
    // }else{
    //   this.events.publish('type:direction',  'ltr');
    // }
  }

}
