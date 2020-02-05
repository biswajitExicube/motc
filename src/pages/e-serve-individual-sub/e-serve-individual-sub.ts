import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-e-serve-individual-sub',
  templateUrl: 'e-serve-individual-sub.html',
})
export class EServeIndividualSubPage {

  public direction : any;
  public EServDetails : any;
  public currLang : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events) {
      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = 'en';
      }else{
        this.currLang = 'ar';
      }
      this.EServDetails = this.navParams.get('EServDetails');
      console.log(this.EServDetails);
  }

  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      // console.log(this.direction);
    });    
  }
}
