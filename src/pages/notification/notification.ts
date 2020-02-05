import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { WorkspaceEventPage } from '../workspace-event/workspace-event';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { NotifyData } from '../../redux/core/notify_session';
import { NotifyAction } from '../../redux/actions/notify_action';


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  @select(['notifyData', 'notifyData'])
  readonly notifyData$ : Observable<NotifyData>;

  public direction : any;
  public notificationList : any = [];
  public currLang : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events, 
    public menuCtrl: MenuController,
    public notifyAction: NotifyAction) {

      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = 'en';
        this.checkUser(this.currLang)
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
        this.checkUser(this.currLang)
      }
      this.notifyData$.subscribe((data) => {
        if(data){
          this.notificationList = data;
        }
      })

  }

  ionViewWillEnter(){
    // this.direction = localStorage.getItem('direction');
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.currLang = 'ar';
        this.checkUser(this.currLang)
      }else if(this.direction == 'ltr'){
        this.currLang = 'en';
        this.checkUser(this.currLang)
      }
    });
  };


  /* localstorage user ID checking function */
  checkUser(currentLang){
    let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
    let localstorageData = userData.ID;
    if(localstorageData){

        let data :any= {
          lang:currentLang,
          userid:localstorageData,
        }
        this.notifyAction.notifyFetch(data);

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
  };
  notifyDetail(notification){
    console.log(notification);
    //this.navCtrl.push(WorkspaceEventPage, {fromNotify : true});
  }
}
