import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { WorkspaceDetailsPage } from '../workspace-details/workspace-details';


@IonicPage()
@Component({
  selector: 'page-user-type',
  templateUrl: 'user-type.html',
})
export class UserTypePage {

  public direction : any;
  public fromHome : any;

  public workGroup : any;
  public sideMenu : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public viewCtrl: ViewController) {

      this.workGroup = this.navParams.get('workGroup');
      this.sideMenu = this.navParams.get('sideMenu');

      this.fromHome = this.navParams.get('fromHome');
      console.log("fromhome : " , this.fromHome);
  }

  
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      //console.log(this.direction);
    });
  }

  close(){
    this.viewCtrl.dismiss();
  }
  userLogin(user){
    //console.log(user);
    if(this.workGroup){
      let data={
        workGroupData :this.workGroup,
        userType :user
      }
      this.goPage(data);
    }else{
      let data={
        sideMenu : this.sideMenu,
        userType : user
      }
      this.goPage(data);
    }
  }
  goPage(paramdata){
    this.viewCtrl.dismiss(paramdata);
  }
}
