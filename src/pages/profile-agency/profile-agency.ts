import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { AgenctData } from '../../redux/core/agencyData';
import { AgencyAction } from '../../redux/actions/agenct_action';


@IonicPage()
@Component({
  selector: 'page-profile-agency',
  templateUrl: 'profile-agency.html',
})
export class ProfileAgencyPage {

  @select(['agencyData', 'agencyData'])
  readonly agencyData$ : Observable<AgenctData>;

  public direction : any;
  public showMenu : boolean = false;
  public fromFavCont : any;
  public agencyData : any = [];
  public contactDetails:any;

  public userId:any;
  public userName:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl : MenuController,
    public agencyAction : AgencyAction) {

      let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      this.userId = userData.ID;
      this.userName = userData.UserName;
      
      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.checkUser('en')
        // this.agencyAction.agencyFetch('en');
      }else if(localLang == 'rtl'){
        this.checkUser('ar')
        // this.agencyAction.agencyFetch('ar');
      }



      this.agencyData$.subscribe((data) => {
        if(data){
          this.agencyData = data;
        }
      })

      let fromMenu = this.navParams.get('fromMenu');
      this.fromFavCont = this.navParams.get('fromFavCont');
      if(fromMenu){
        this.showMenu = true;
      }else{
        this.showMenu = false;
      }
  }

  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        // this.agencyAction.agencyFetch('ar');
        this.checkUser('ar')
      }else if(this.direction == 'ltr'){
        this.checkUser('en')
        // this.agencyAction.agencyFetch('en');
      }
    });
  }

  public checkUser(currlang){
    // console.log("checkuser start ... ")
    if(this.userId){
      let data:any = {
        lang:currlang,
        userid:this.userId
      }
      console.log(data);
      this.agencyAction.agencyFetch(data)
    }else{
      console.log("no user found")
    }
    
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
