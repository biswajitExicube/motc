import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-contact-details',
  templateUrl: 'contact-details.html',
})
export class ContactDetailsPage {

  public direction : any;
  public eventLike : boolean = false;
  public skypeUser: any = 'skype://live:pradipmondal7777?call';

  public details : any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private sanitizer: DomSanitizer,
    private socialSharing: SocialSharing) {

      this.details = this.navParams.get('details');
      console.log(this.details);
  }

  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      // console.log(this.direction);
    });
  }
  forMail(){
    let shareOpts = {
      // message: 'Share Message',
      message: 'EmployeeName : ' + this.details.EmployeeName + " , Contact no : "+this.details.OfficePhone,
      // subject: '‎Share Subject',
      subject : 'Contact',
      to: [this.details.eMail],
      files: null
    };
    // Share via email
    if(this.details.eMail){
      this.socialSharing.shareViaEmail(shareOpts.message, shareOpts.subject, shareOpts.to, null).then((success) => {
        // console.log("working success : ",success);
      }).catch((error) => {
        // console.log("working error : ",error);
      });
    }else{
      alert("Email ID not found!");
    }
  }
  forChat(){
    let shareOpts = {
      message : 'Hi',
      phoneNumber : '0142146546'
    }
    this.socialSharing.shareViaSMS(shareOpts.message, shareOpts.phoneNumber).then((success) =>{
      // console.log(success);
    }).catch((error) => {
      // console.log(error);
    }); 
  }
  likingItem(){
    this.eventLike = !this.eventLike;
  }

}
