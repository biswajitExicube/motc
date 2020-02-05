import { Component } from '@angular/core';
import { NavController, Events, MenuController, ModalController } from 'ionic-angular';
import { SearchDirectoryPage } from '../search-directory/search-directory';
// import { ProfileAgencyPage } from '../profile-agency/profile-agency';
import { WorkspaceChartPage } from '../workspace-chart/workspace-chart';
import { WorkspaceEventPage } from '../workspace-event/workspace-event';
import { MediaAnnouncementsPage } from '../media-announcements/media-announcements';
import { ContactFavouritePage } from '../contact-favourite/contact-favourite';
import { CreateWorkspacePage } from '../create-workspace/create-workspace';
import { WorkGroupsPage } from '../work-groups/work-groups';
// import { UserTypePage } from '../user-type/user-type';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { HomeData } from '../../redux/core/home_session';
import { HomeActions } from '../../redux/actions/home_action';
import { AnnounceAction } from '../../redux/actions/announce_action';
import { HomeAnnouncement } from '../../redux/core/announce_session';
import { SearchGeneralPage } from '../search-general/search-general';
import { GeneralSearchsAction } from '../../redux/actions/general_search_action';
import { WorkspaceDetailsPage } from '../workspace-details/workspace-details';
import { Base64Provider } from '../../providers/image-base64/image_base64';
import { Http } from "@angular/http";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @select(['homeData', 'homeData'])
  readonly homeData$ : Observable<HomeData>;

  /* home page announcement */
  @select(['announcementHome', 'homeAnnouncement'])
  readonly homeannouncementmic$ : Observable<HomeAnnouncement>;
  

  // @select(['homeData', 'error'])

  public homeAnnouncementData:any;
  public direction : any;
  public favPesonList : any = [];
  public workGPList : any = [];
  public favContactList : any = [];
  public WorkspacesList : any = [];
  public currLang : string;

  constructor(
    public navCtrl: NavController, 
    public events: Events, 
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public homeActions : HomeActions,
    public announceAction:AnnounceAction,
    public generalsearchsaction:GeneralSearchsAction,
    public Base64Provider: Base64Provider,
    public http: Http
  ) {
    
    let localLang = localStorage.getItem('direction');
    if(localLang == 'ltr'){
      this.currLang = 'en';
      this.checkUser(this.currLang)
    }else if(localLang == 'rtl'){
      this.currLang = 'ar';
      this.checkUser(this.currLang)
    }
    this.homeData$.subscribe((data : any)=>{
      if(data){
        console.log(data);
        this.favContactList = data.Favourites;
        this.WorkspacesList = data.workspaceHomePage.Data;
        if(this.favContactList != ''){
          for(let i=0; i<this.favContactList.length; i++){
            console.log(this.favContactList[i]);
            let PictureBase64String = this.favContactList[i].PictureUrl? this.favContactList[i].PictureUrl : '';
            
            this.Base64Provider.convertImageBase(PictureBase64String)
            .subscribe((res) => {
              if(res != null){
                let imageBase64 = res.json();
                this.favContactList[i].PictureBase64String = imageBase64
              }
            });
            // this.favContactList[i].PictureBase64String = this.favContactList[i].PictureUrl? 'http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/GetImageBase64String?url=' + this.favContactList[i].PictureUrl : '';
          }
        }
        console.log(this.favContactList);
      }
      
      
    });

    

    this.homeannouncementmic$.subscribe((data:any)=>{
      if(data){
        // console.log("data is : ", data);
        this.homeAnnouncementData =data;
      }
    })

  }

  
  checkUser(currentLang){
    // console.log("current language is : ", currentLang);
    let userData:any = localStorage.getItem('userData');
    userData = JSON.parse(userData);
    let localstorageData = userData.ID;
    if(localstorageData){
      let data :any= {
        lang:currentLang,
        userid:localstorageData
      }
      this.homeActions.homeFetch(data);
      this.announceAction.fetchHomeAnnouncement(currentLang);
    }
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
  };

  openMenu(){
    let menuShow = localStorage.getItem('direction');
    if(menuShow == 'rtl'){
      this.menuCtrl.open('right');
    }else{
      this.menuCtrl.open('left');
    }
  }

  favList(){
    this.navCtrl.push(ContactFavouritePage, {fromHome : true});
  }

  goAnnounce(){
    this.navCtrl.push(MediaAnnouncementsPage, {formHome : true});
  }

  advanceSearch(){
    // this.navCtrl.push(SearchDirectoryPage); 
    let data:any=[];
    this.generalsearchsaction.successGeneralSearch(data);   
    this.navCtrl.setRoot(SearchGeneralPage);
    
  }

  workGroup(){
    this.navCtrl.push(WorkGroupsPage, {workGroup : true});
  }
  addGroup(){
    this.navCtrl.push(CreateWorkspacePage, {addGroupH : true});
  }

  goMissions(workspaceDetails){
    //console.log(workspaceDetails);
    // let paramData :any = {
    //  userId:localStorage.getItem('userId'),
    //  lang:this.currLang,
    //  workspaceId:workspaceDetails.ID
    // }
    // this.navCtrl.push(WorkspaceChartPage,{paramData:paramData});
    this.navCtrl.push(WorkspaceChartPage, {workspacedetails:workspaceDetails});
  }
  knowMore(workdetails){
    // console.log(workdetails)
    this.navCtrl.push(WorkspaceEventPage,{detailsId:workdetails.ID});
  }

  gotoDetails(workgroupData){

    if(workgroupData.CanJoin == false && workgroupData.IsAdmin ==true){
      workgroupData.workgroupUserType = 'admin'
    }else if(workgroupData.CanJoin == false && workgroupData.IsAdmin ==false){
      workgroupData.workgroupUserType = 'member'
    }else if (workgroupData.CanJoin == true && workgroupData.IsAdmin ==false){
      workgroupData.workgroupUserType = 'notMember'
    }
    //  this.navCtrl.push(WorkspaceDetailsPage, {data:workgroupData,fromHome:this.workGroup?true:false});


    this.navCtrl.push(WorkspaceDetailsPage, {data:workgroupData,fromHome:false});
  }




  SearchData(ev: any){
    this.homeData$.subscribe((data : any)=>{
      if(data){
        this.favContactList = data.Favourites;
      }
    });

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.favContactList = this.favContactList.filter((item) => {
        return (item.EmployeeName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  gotoGeneralSearch(){
    let data:any=[];
    this.generalsearchsaction.successGeneralSearch(data);   
    this.navCtrl.setRoot(SearchGeneralPage);
  }
  

}
