import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { TermsPrivacyData } from '../../redux/core/terms_privacy_session';
import { TermsPrivacyAction } from '../../redux/actions/terms_privacy_action';


@IonicPage()
@Component({
  selector: 'page-terms-conditions',
  templateUrl: 'terms-conditions.html',
})
export class TermsConditionsPage {

  @select(['termsPrivacyData', 'termsPrivacyData'])
  readonly termsPrivacyData$ : Observable<TermsPrivacyData>;

  public direction : any;

  public termsData : any = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private menuCtrl: MenuController,
    public termsPrivacyAction : TermsPrivacyAction) {

      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        //console.log("en");
        this.termsPrivacyAction.termsPrivacyDataFetch('en');
      }else if(localLang == 'rtl'){
        //console.log("ar");
        this.termsPrivacyAction.termsPrivacyDataFetch('ar');
      }
      this.termsPrivacyData$.subscribe((data) => {
        if(data){
          //console.log(data);
          this.termsData = data;
        }
      })
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad TermsConditionsPage');
  }
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.termsPrivacyAction.termsPrivacyDataFetch('ar');
      }else if(this.direction == 'ltr'){
        this.termsPrivacyAction.termsPrivacyDataFetch('en');
      }
    });
  }

  openMenu(){
    let menuShow = localStorage.getItem('direction');
    if(menuShow == 'rtl'){
      this.menuCtrl.open('right');
      // this.menuCtrl.close();
    }else{
      this.menuCtrl.open('left');
      // this.menuCtrl.close();
    }
  }
}
