import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { ContactDetailsPage } from '../contact-details/contact-details';
import { ProfileAgencyPage } from '../profile-agency/profile-agency';

import { SocialSharing } from '@ionic-native/social-sharing';
import { DomSanitizer } from '@angular/platform-browser';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { FavUsersData } from '../../redux/core/fav_user_session';
import { FavUsersAction } from '../../redux/actions/fav_users_action';
import { SearchFavUserContacts } from '../../redux/core/all_search_session';
import { AllSearchAction } from '../../redux/actions/all_search_action';
import { AlertProvider } from '../../providers/alert-provider/alert_provider';


@IonicPage()

@Component({
  selector: 'page-contact-favourite',
  templateUrl: 'contact-favourite.html',
})
export class ContactFavouritePage {

  @select(['favUsersData', 'favUserData'])
  readonly favUsersData$ : Observable<FavUsersData>;

  // @select(['UsercontectSearchReducer', 'SearchUserContactsData'])
  // readonly SearchUserContactsData$ : Observable<SearchUserContacts>;


  @select(['FavUsercontact', 'SearchFavUserContacts'])
  readonly FavUsercontactData$ : Observable<SearchFavUserContacts>;
  
  
  

  public direction : any;
  public shownConnect = null;
  public contList : any = [];

  public showMenu : boolean = true;
  public skypeUser:any;
  public defaultContactList:any;
  public currLang:any;
  public currentUserID:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events,
    public menuCtrl : MenuController,
    private sanitizer: DomSanitizer,
    private socialSharing: SocialSharing,
    public favUsersAction : FavUsersAction,
    public AllSearchAction: AllSearchAction,
    public zone:NgZone,
    public alertprovider : AlertProvider
  ) {

      // this.favUsersAction.favUsersFetch('en');
      let fromHome = this.navParams.get('fromHome');
      if(fromHome){ this.showMenu = false; }
      else{ this.showMenu = true; }

      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = 'en';
        this.checkUser(this.currLang)
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
        this.checkUser(this.currLang)
      }

      let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      let userID = userData.ID;
      if(userID){
        console.log("userID found in fav contact screen...")
        this.currentUserID = userID
      }


      /* Search User Contact */ 
      // this.SearchUserContactsData$.subscribe((data:any)=>{
      //   if(data){
      //     this.zone.run(()=>{
      //       this.contList = data;
      //     })  
      //   }
      // })
      this.FavUsercontactData$.subscribe((data:any)=>{
        if(data){
          for(let i=0; i<data.length; i++){
            if(data[i].OfficePhone != ''){
              let skypeUrl= 'skype:'+data[i].OfficePhone +'?call'
              let chatUrl= 'skype:'+data[i].OfficePhone +'?chat'
              data[i].customcreateSkype =this.sanitizer.bypassSecurityTrustResourceUrl(skypeUrl);
              data[i].customSkypeChat =this.sanitizer.bypassSecurityTrustResourceUrl(chatUrl);
            }
          }

          this.zone.run(()=>{
            this.contList = data;
          })  
          console.log(this.contList);
        }
      })

      



      /* Default Fav User Data */
      this.favUsersData$.subscribe((data:any) => {
        console.log(data)
        if(data){
          for(let i=0; i<data.length; i++){
            if(data[i].OfficePhone != ''){
              let skypeUrl= 'skype:'+data[i].OfficePhone +'?call'
              let chatUrl= 'skype:'+data[i].OfficePhone +'?chat'
              data[i].customcreateSkype =this.sanitizer.bypassSecurityTrustResourceUrl(skypeUrl);
              data[i].customSkypeChat =this.sanitizer.bypassSecurityTrustResourceUrl(chatUrl);
            }
          }
            this.defaultContactList = data;
            console.log(this.defaultContactList);
            this.contList = this.defaultContactList;
        }
      })
  }

  noNumber(option){
    if(option == 'call'){
      this.alertprovider.openToast("No Number for Call!");
    }else{
      this.alertprovider.openToast("No Number for Chat!");
    }
  }

  /* Ion View Will Enter */
  ionViewWillEnter(){
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

    // this.skypeUser = this.sanitizer.bypassSecurityTrustUrl(this.skypeUser);
  }

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
        this.favUsersAction.favUsersFetch(data);

    }
  }

  searchNews(searchcontact){
    if(searchcontact == ""){
      this.contList = this.defaultContactList;
    }else{
        let searchOptions = {
          lang:this.currLang,
          userid:this.currentUserID,
          SearchText: searchcontact,
          Agencies: null,
          Departments: null,
          PageCount: "page - 1",
          ListName: "Agency Profiles"
        }
          this.AllSearchAction.FetchFavUserContact(searchOptions);

    }
  }




  /* Side menu Click Function */
  openMenu(){
      let menuShow = localStorage.getItem('direction');
      if(menuShow == 'rtl'){
        this.menuCtrl.open('right');
      }else{
        this.menuCtrl.open('left');
      }
  }
  /* Go to Details Function */
  goProfile(contact:any){
    console.log(contact);
    this.navCtrl.push(ProfileAgencyPage, {fromFavCont : true, contactdetails:contact});
  }

  /* Ion View Will Enter */
  dirConnect(item){
      if(item == this.shownConnect){ 
          this.shownConnect = null;
      }else{
          this.shownConnect = item;
      }
  }


  // forCall(person){
  //   this.skypeUser = 'skype:'+person.OfficePhone +'?call';
  // }


  // forchat(person){
  //     let shareOpts = {
  //       message : 'Hi',
  //       phoneNumber : '0142146546'
  //     }
  //     this.socialSharing.shareViaSMS(shareOpts.message, shareOpts.phoneNumber).then((success) =>{
  //         // console.log(success);
  //     }).catch((error) => {
  //         // console.log(error);
  //     }); 
  // }


  forMail(person){
    // console.log(person);
      let shareOpts = {
        message: 'EmployeeName : ' + person.EmployeeName + " , Contact no : "+person.OfficePhone,
        subject: '‎Contact',
        to: [person.eMail],
        files: null
      };

      // Share via email
      if(person.eMail){
        this.socialSharing.shareViaEmail(shareOpts.message, shareOpts.subject, shareOpts.to, null).then((success) => {
          // console.log("working success : ",success);
        }).catch((error) => {
          // console.log("working error : ",error);
        });
      }else{
        alert("Email ID not found!");
      }

  }


  forDetails(item){
    // console.log(item);
    this.navCtrl.push(ContactDetailsPage, {details : item});
  }
  
}
