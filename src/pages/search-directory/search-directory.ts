import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-search-directory',
  templateUrl: 'search-directory.html',
})
export class SearchDirectoryPage {

  public direction : any;
  public directoryList : any = [];
  public showList : boolean = false;
  public shownGroup = null;
  public shownConnect = null;
  
  public skypeUser: any = 'skype://live:pradipmondal7777?call';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    private sanitizer: DomSanitizer,
    private socialSharing: SocialSharing) {

      this.directoryList = [
        {
          title : 'Communication and Companies',
          dirDetails : [
            {
              name : 'Company Name',
              icon : 'home',
              desc : '',
              position : ''
            },
            {
              name : 'Person Name',
              icon : 'person',
              desc : 'Lorem ipsum dolor',
              position : ''
            },
            {
              name : 'Person Name',
              icon : 'person',
              desc : 'Lorem ipsum dolor',
              position : 'Genaral Manager'
            }
          ]
        },
        {
          title : 'Filter according to companies',
          dirDetails : [
            {
              name : 'Company Name',
              icon : 'home',
              desc : 'Lorem ipsum dolor',
              position : 'Genaral Manager'
            },
            {
              name : 'Person Name',
              icon : 'person',
              desc : 'Lorem ipsum dolor',
              position : 'Genaral Manager'
            },
            {
              name : 'Person Name',
              icon : 'person',
              desc : 'Lorem ipsum dolor',
              position : 'Genaral Manager'
            }
          ]
        },
        {
          title : 'Filter according to title',
          dirDetails : [
            {
              name : 'Company Name',
              icon : 'home',
              desc : 'Lorem ipsum dolor',
              position : 'Genaral Manager'
            },
            {
              name : 'Person Name',
              icon : 'person',
              desc : 'Lorem ipsum dolor',
              position : 'Genaral Manager'
            },
            {
              name : 'Person Name',
              icon : 'person',
              desc : 'Lorem ipsum dolor',
              position : 'Genaral Manager'
            }
          ]
        },
        {
          title : 'Filter according to title',
          dirDetails : [
            {
              name : 'Company Name',
              icon : 'home',
              desc : 'Lorem ipsum dolor',
              position : 'Genaral Manager'
            },
            {
              name : 'Person Name',
              icon : 'person',
              desc : 'Lorem ipsum dolor',
              position : 'Genaral Manager'
            },
            {
              name : 'Person Name',
              icon : 'person',
              desc : 'Lorem ipsum dolor',
              position : 'Genaral Manager'
            }
          ]
        }
      ]

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SearchDirectoryPage');
  }
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      //console.log(this.direction);
    });
    this.skypeUser = this.sanitizer.bypassSecurityTrustUrl(this.skypeUser);
  }

  advanceSearch(){    
    this.showList =! this.showList;
  }
  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
      return this.shownGroup === group;
  };
  dirConnect(item){
    // this.shownConnect = null;
    if(item == this.shownConnect){ 
      this.shownConnect = null;
    }else{
      this.shownConnect = item;
    }
    //console.log(item);
    // this.isGroupShown(item);
  }
  forCall(person){
    //console.log(person);
  }
  forchat(person){
    //console.log(person);
    //console.log(person);
    let shareOpts = {
      message : 'Hi',
      phoneNumber : '0142146546'
    }
    this.socialSharing.shareViaSMS(shareOpts.message, shareOpts.phoneNumber).then((success) =>{
      //console.log(success);
    }).catch((error) => {
      //console.log(error);
    }); 
  }
  forMail(person){
    //console.log(person);
    let shareOpts = {
      message: 'Share Message',
      subject: '‎Share Subject',
      url: null,
      files: null
    };
    // Share via email
    this.socialSharing.shareViaEmail(null, shareOpts.message, ['demo@gmail.com'], null, null, null).then((success) => {
      //console.log("working success : ",success);
    }).catch((error) => {
      //console.log("working error : ",error);
    });
  }

}
