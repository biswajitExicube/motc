import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Slides, MenuController, Platform } from 'ionic-angular';
import { MediaEventDetailPage } from '../media-event-detail/media-event-detail';
import { WorkspaceChartPage } from '../workspace-chart/workspace-chart';
import { WorkspaceEventPage } from '../workspace-event/workspace-event';
import { MediaNewsDetailPage } from '../media-news-detail/media-news-detail';

import { SocialSharing } from '@ionic-native/social-sharing';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { FavWorkspaceData } from '../../redux/core/favWorkSpace_session';
import { FavWorkspaceActions } from '../../redux/actions/favWorkspace_action';
import { AllFavouriteAction } from '../../redux/actions/all_favourite_action';
import { FavNews, FavEvents, FavDocuments, FavWorkspace } from '../../redux/core/all_favourite_session';
import { WorkspaceDetailsPage } from '../workspace-details/workspace-details';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-favourite',
  templateUrl: 'favourite.html',
})
export class FavouritePage {
  
  @ViewChild('loopSlider') sliderComponent: Slides;
  // @select(['favWorkspaceData', 'favWorkspaceData'])
  // readonly favWorkspaceData$ : Observable<FavWorkspaceData>;


  @select(['FavDocument', 'favouriteDocuments'])
  readonly favDocumentsData$ : Observable<FavDocuments>;

  @select(['FavEvent', 'favouriteEvents'])
  readonly favEventsData$ : Observable<FavEvents>;

  @select(['FavNews', 'favouriteNews'])
  readonly favNewsData$ : Observable<FavNews>;

  @select(['FavWorkspace', 'favouriteWorkspaces'])
  readonly favWorkspaceDatas$ : Observable<FavWorkspace>;


  public direction : any;
  public eventLike : boolean = false;
  
  public favSegModel : string = '0';
  
  public favouriteData : any = [];
  public currLang : string;
  public shownGroup = null;
  public shownConnect = null;

  //Fav Item's Variable
  public FavNewslist:any;
  public FavDocumentslist:any;
  public FavEventslist:any;
  public FavWorkspacelist:any;




  segments:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl : MenuController,
    private socialSharing: SocialSharing,
    public favWorkspaceActions : FavWorkspaceActions,
    public AllFavouriteAction:AllFavouriteAction,
    private iab: InAppBrowser,
    public platform:Platform
    ) {

      this.segments=["news","events","workspace","documents"];
      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        //console.log("en");
        this.currLang = 'en';
        this.checkUser(this.currLang);
        // this.favWorkspaceActions.favWorkspaceFetch({lang : this.currLang, segement : 'news'});
      }else if(localLang == 'rtl'){
        //console.log("ar");
        this.currLang = 'ar';
        this.checkUser(this.currLang);
        // this.favWorkspaceActions.favWorkspaceFetch({lang : this.currLang, segement : 'news'});
      }


      this.favNewsData$.subscribe((data : any) => {
        if(data){ this.FavNewslist = data;
          console.log("FavNewslist :" ,data) 
        }
      });

      this.favEventsData$.subscribe((data : any) => {
        if(data){ this.FavEventslist = data;
          console.log("FavEventslist : ",data) 
        }
      });

      this.favWorkspaceDatas$.subscribe((data : any) => {
        // console.log("workspace : ", data);
        if(data){ this.FavWorkspacelist = data;
          console.log("workspace: ", data);
        
        }
      });

      this.favDocumentsData$.subscribe((data : any) => {
        if(data){ this.FavDocumentslist = data;
          console.log("FavDocumentslist :", data) 
        }
      });




  }

  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.currLang = 'ar';
        this.segmentChanged();
      }else if(this.direction == 'ltr'){
        this.currLang = 'en';
        this.segmentChanged();
      }
    });
  }

  /* Check User function */
  public checkUser(currlang){
    console.log(currlang)
    let userData:any = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    let localstorageData = userData.ID;
    console.log("user id is .. ",localstorageData)
    if(localstorageData){
      this.fetchFavData(currlang,localstorageData)
    }
  }

  /* Fetch All Favourite Data [ News, Events, Workspace, Documents ] */
  public fetchFavData(currlang,userId){
    let data :any= {
      lang:currlang,
      userid:userId
    }
    this.AllFavouriteAction.fetchFavNews(data)
    this.AllFavouriteAction.fetchFavEvents(data)
    this.AllFavouriteAction.fetchFavWorkspace(data)
    this.AllFavouriteAction.fetchFavDocuments(data)
  }



  ngDoCheck(){
    if(localStorage.getItem('detectChanges')){
      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = 'en';
        localStorage.removeItem('detectChanges');
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
        localStorage.removeItem('detectChanges');
      }
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

  segmentChanged(){
    this.sliderComponent.slideTo(parseInt(this.favSegModel), 500);   
  }


  onSlideChanged(s: Slides) {    
    let currentIndex = this.sliderComponent.getActiveIndex();
    //console.log('Slide changed', currentIndex);
    if(currentIndex == 0){
      this.favSegModel = '0';
    }else if(currentIndex == 1){
      this.favSegModel = '1';
    }else if(currentIndex == 2){
      this.favSegModel = '2';
    }else if(currentIndex == 3){
      this.favSegModel = '3';
    }else{
      //console.log("No Silde");
    }
  }

  goDetail(name,item){
    //console.log(name);
    if(name == 'news'){
      this.navCtrl.push(MediaNewsDetailPage,{newsID : item.ID});
      
    }else if(name == 'event'){
      // this.navCtrl.push(MediaEventDetailPage,{favEvent: item});
      this.navCtrl.push(MediaEventDetailPage,{event: item});
    }    
  }



  /* [ Workspace segment ] */
  toggleGroup(group) {
    if (this.isGroupShown(group)) { this.shownGroup = null;} 
    else { this.shownGroup = group;}
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  goMissions(workspaceDetails){
    // this.navCtrl.push(WorkspaceChartPage);
    this.navCtrl.push(WorkspaceChartPage, {workspacedetails:workspaceDetails});
  }
  
  knowMore(workgroupData){
    console.log(workgroupData);
    // this.navCtrl.push(WorkspaceEventPage);
    if(workgroupData.CanJoin == false && workgroupData.IsAdmin ==true){
      workgroupData.workgroupUserType = 'admin'
    }else if(workgroupData.CanJoin == false && workgroupData.IsAdmin ==false){
      workgroupData.workgroupUserType = 'member'
    }else if (workgroupData.CanJoin == true && workgroupData.IsAdmin ==false){
      workgroupData.workgroupUserType = 'notMember'
    }
     this.navCtrl.push(WorkspaceDetailsPage, {data:workgroupData,fromHome:false});
  }

  /* [ Workspace segment ] <=== END ===> */

  /* Download sidemenu Open and Close [ Document segment ] */
  dirConnect(item){
    if(item == this.shownConnect){ this.shownConnect = null; }
    else{ this.shownConnect = item; }
  }

  /* For Share details [ Document segment ] */
  openShare(details){
    // let fileDefaultURL = "http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+ details.Link
    let fileDefaultURL = "http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+ details.Link
    this.socialSharing.share(details.Title + ': ' + fileDefaultURL,null, null, null)
    .then((success) =>{ })
    .catch((error) => { }); 
  }

  /* For Download Files [ Document segment ]  */
  // downloadDoc(details){
    
  //   // let fileDefaultURL = "http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+ details.Link
  //   let fileDefaultURL = "http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+ details.Link
  //   window.open(fileDefaultURL);
  // }

  downloadDoc(details){
    let fileDefaultURL = "http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+ details.Link
    // window.open("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+url);
    if(this.platform.is('ios')){
      this.iab.create("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/DownloadFile?url="+fileDefaultURL);
    }else{
      window.open(fileDefaultURL,'_system');
    }
  }

}
