import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { FeedbackAction } from '../../redux/actions/feedback_action';
import { AlertProvider } from '../../providers/alert-provider/alert_provider';


@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {


  public direction : any;
  public showEle : boolean = false;

  // public feedData : any = {};
  public feedName : string ;
  public feedComments : string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl : MenuController,
    public feedbackAction : FeedbackAction,
    public alertProvider:AlertProvider
  ) {
      

      let fromMedia = this.navParams.get('fromMedia');
      if(fromMedia){
        this.showEle = true;
      }else{
        this.showEle = false;
      }

      // this.feedData = {
      //   feedName : this.feedName,
      //   feedComments : this.feedComments
      // }
  }

  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      //console.log(this.direction);
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

  feedSubmit(){
    if(this.feedName == undefined || this.feedName == "" || this.feedName == null ||
    this.feedComments == undefined || this.feedComments == "" || this.feedComments == null){
        if(this.feedName == undefined || this.feedName == "" || this.feedName == null){
            this.alertProvider.openAlert("Name field cannot be blank",1000)
        }else if(this.feedComments == undefined || this.feedComments == "" || this.feedComments == null){
            this.alertProvider.openAlert("Feedback comment field cannot be blank",1000)
        }
    }else{
        // this.alertProvider.StartLoading();
        this.checkUser();
    }
   
  }


  /* localstorage user ID checking function */
  checkUser(){
    let userData:any = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    let localstorageData = userData.ID;
    let localstorageEmail = userData.eMail;
    if(localstorageData){

      if(localstorageEmail){
        let feedbackDetails = {
          UserID: localstorageData,
          Email : localstorageEmail,
          CategoryID:"1",
          Comments : this.feedComments
          }
        
        this.feedbackAction.feedbackDataFetch(feedbackDetails);



      }



    }
}

}
