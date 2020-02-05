import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController, Platform } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GeneralSearchsAction } from '../../redux/actions/general_search_action';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { GeneralSearchData } from '../../redux/core/general_search_session';
import { MediaNewsDetailPage } from '../media-news-detail/media-news-detail';
import { MediaEventDetailPage } from '../media-event-detail/media-event-detail';
import { ContactDetailsPage } from '../contact-details/contact-details';
import { SurveyDetailsPage } from '../survey-details/survey-details';
import { MediaAnnoucementsDetailPage } from '../media-annoucements-detail/media-annoucements-detail';
import { WorkspaceChartPage } from '../workspace-chart/workspace-chart';
import { WorkspaceDetailsPage } from '../workspace-details/workspace-details';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-search-general',
  templateUrl: 'search-general.html',
})
export class SearchGeneralPage {

  @select(['generalsearchdata', 'generalData'])
  readonly generalSearchData$ : Observable<GeneralSearchData>;

  public direction : any;
  public directoryList : any = [];
  public showList : boolean = false;
  public shownGroup = null;
  public shownConnect = null;

  public shownDocument = null;

  public currLang:any;
  public userId:any;

  public mainSearchData:any=[];
  public tempShowData:any;
  public filterName:any="all";
  public showLoading:boolean;

  public skypeUser: any = 'skype://live:pradipmondal7777?call';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events,
    public menuCtrl : MenuController,
    private sanitizer: DomSanitizer,
    private socialSharing: SocialSharing,
    public generalsearchsaction:GeneralSearchsAction,
    private iab: InAppBrowser,
    public platform:Platform,
    public zone:NgZone
  ) {
    this.showLoading = false;
    let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
    this.userId = userData.ID;
    let localLang = localStorage.getItem('direction');
    if(localLang == 'ltr'){
      this.currLang = 'en';
    }else if(localLang == 'rtl'){
      this.currLang = 'ar';
    }

    this.directoryList = [
      { title : 'All',value:"all"},
      { title : 'News',value:"news"},
      { title : 'Events',value:"event"},
      { title : 'Documents',value:"document"},
      { title : 'Contact',value:"contact"},
      { title : 'Survey',value:"survey"},
      { title : 'Announcement',value:"announcement"},
      { title : 'Workspace',value:"workspace"}
    ]

    this.generalSearchData$.subscribe((data:any)=>{
        if(data){
            this.mainSearchData = data;
            setTimeout(() => {
              // console.log(data);
              if(this.filterName == 'all'){
                this.tempShowData = this.mainSearchData;
              }else{
                this.filterbyValue(this.filterName);
              }
            }, 1000);
        }
    })

    this.events.subscribe("loading:start",()=>{
      console.log("calling..")
      this.zone.run(()=>{
        this.showLoading = true;
      })
      
    })

    this.events.subscribe("loading:stop",()=>{
      this.zone.run(()=>{
        this.showLoading = false;
      })
    })

  }

  /* Ion View Will Enter */
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
        this.direction = value;
        if(this.direction == 'rtl'){
          this.currLang = 'ar';
        }else if(this.direction == 'ltr'){
          this.currLang = 'en';
        }
    });
    this.skypeUser = this.sanitizer.bypassSecurityTrustUrl(this.skypeUser);
  }

  /* Advance Item click function START */
  toggleGroup(group,value) {
    // console.log(group, value);
      if (this.isGroupShown(group)) {
          this.shownGroup = null;
      } else {
          this.shownGroup = group;
      }
      this.showList =! this.showList;
      this.filterbyValue(value);
  };

  isGroupShown(group) {
      return this.shownGroup === group;
  };

  /* filter by catagory */
  filterbyValue(name){
    this.tempShowData=[];
    this.filterName = name
    if(name == 'all'){
      this.tempShowData = this.mainSearchData;
    }else{
      for(let i=0; i<this.mainSearchData.length; i++){
        if(this.mainSearchData[i].searchType == name){
          this.tempShowData.push(this.mainSearchData[i]);
        }
      }
    }
  }
  /* filter by catagory */

  /* Advance Item click function END ==> */

  /* Advance Search button click function */
  advanceSearch(){
    this.showList =! this.showList;
  }

  /* Open sidemenu function */
  openMenu(){
    let menuShow = localStorage.getItem('direction');
    if(menuShow == 'rtl'){
      this.menuCtrl.open('right');
    }else{
      this.menuCtrl.open('left');
    }
  }

  /* General Search function */
  searchDocument(name){
    if(name == ""){
      let data:any=[];
      this.generalsearchsaction.successGeneralSearch(data);
    }else{
        if(this.userId){
            let searchData={
              searchQuery:name,
              userid:this.userId,
              lang:this.currLang
            }
            //console.log(searchData);
            this.generalsearchsaction.fetchGeneralSearch(searchData)
        }
    }
  }
  
  public showHideDocument(item){
    if(item == this.shownDocument){ 
      this.shownDocument = null;
    }else{
      this.shownDocument = item;
    }
  }

  public showHideContact(item){
    if(item == this.shownConnect){ 
      this.shownConnect = null;
    }else{
      this.shownConnect = item;
    }
  }

  public GotoIndividualPage(searchdata){
    console.log(searchdata);
    if(searchdata.searchType=='news'){
      this.navCtrl.push(MediaNewsDetailPage, {newsID : searchdata.ID});

    }else if(searchdata.searchType=='event'){
      this.navCtrl.push(MediaEventDetailPage, {event : searchdata.ID});
    }
    // else if(searchdata.searchType=='document'){}
    else if(searchdata.searchType=='contact'){
      this.navCtrl.push(ContactDetailsPage, {details : searchdata});

    }else if(searchdata.searchType=='survey'){
      this.navCtrl.push(SurveyDetailsPage, {surveyItem:searchdata});

    }else if(searchdata.searchType=='announcement'){
      this.navCtrl.push(MediaAnnoucementsDetailPage, {detail: searchdata});

    }//else if(searchdata.searchType=='workspace'){}
  }

  // download(url){
  //   window.open("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+url);
  // }
  download(url){
    let downloadURL = "http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+url
    if(this.platform.is('ios')){
      this.iab.create("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+url);
    }else{
      window.open(downloadURL,'_system');
    }
  }

  forShare(data){
    // console.log(person);
  }

  //Search Contact details
  forDetails(searchdata){
    this.navCtrl.push(ContactDetailsPage, {details : searchdata});
  }

  //Search Workgroup/ Workspace - [ Options ]
  goMissions(work){
    this.navCtrl.push(WorkspaceChartPage, {workspacedetails:work});
  }

  //Search Workgroup/ Workspace - [ Options ]
  knowMore(workgroupData:any){

    if(workgroupData.CanJoin == false && workgroupData.IsAdmin ==true){
      workgroupData.workgroupUserType = 'admin'
    }else if(workgroupData.CanJoin == false && workgroupData.IsAdmin ==false){
      workgroupData.workgroupUserType = 'member'
    }else if (workgroupData.CanJoin == true && workgroupData.IsAdmin ==false){
      workgroupData.workgroupUserType = 'notMember'
    }
     this.navCtrl.push(WorkspaceDetailsPage, {data:workgroupData,fromHome:false});
  
  }
  


}
