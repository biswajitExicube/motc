import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { MediaAnnoucementsDetailPage } from '../media-annoucements-detail/media-annoucements-detail';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { AnnounceAction } from '../../redux/actions/announce_action';
import { AnnounceData } from '../../redux/core/announce_session';
import { SearchAnnouncements } from '../../redux/core/all_search_session';
import { AllSearchAction } from '../../redux/actions/all_search_action';


@IonicPage()
@Component({
  selector: 'page-media-announcements',
  templateUrl: 'media-announcements.html',
})
export class MediaAnnouncementsPage {

  @select(['annouceData', 'announceData'])
  readonly annouceData$ : Observable<AnnounceData>;
  @select(['AnnouncementSearchReducer', 'SearchAnnouncementsData'])
  readonly SearchAnnouncementsData$ : Observable<SearchAnnouncements>

  public direction : any;
  public announceList : any = [];
  public homeView : boolean = false;
  public mediaView : boolean = false;
  public IconView : boolean = false;
  public defaultAnnounceData:any;
  public currLang:string;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    public announceAction : AnnounceAction,
    public SAnnounceAction : AllSearchAction

  ) {
      /* For Parameter date */
      let fromMedia = this.navParams.get('fromMedia');
      let fromHome = this.navParams.get('formHome');

      /* For direction changes */
      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
          this.currLang = 'en';
          this.checkUser(this.currLang)
      }else if(localLang == 'rtl'){
          this.currLang = 'ar';
          this.checkUser(this.currLang)
      }

      if(fromMedia){
        this.mediaView = true;
      }else if(fromHome){
        this.homeView = true;
      }else{
        // this.IconView = false;
        // this.homeTab = false;
      }

      /* For Search Announcement data subscribe */
      this.SearchAnnouncementsData$.subscribe((aData:any) => {
        if(aData){
          // console.log(data);
          if(aData.Results){
            this.announceList = aData.Results;
          }else{this.announceList = []}
        }
      })

      /* Announcement Data */
      this.annouceData$.subscribe((data:any) => {
        if(data){
          this.defaultAnnounceData = data;
          // this.announceList = data;
          this.announceList = this.defaultAnnounceData;
          console.log(this.announceList)
        }
      })

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
          this.announceAction.announceFetch(data);
      }
  }

  /* For Search Announcement Function */
  searchAnnounces(announce:any){
    if(announce == ""){
      this.announceList = this.defaultAnnounceData;
    }else{
        let sData = {
            Search: announce,
            Categories: null,
            Tags : null,
            Page:0,
            Language:this.currLang
        };
        // console.log("anounce last  : ", this.announceList)
        this.SAnnounceAction.FetchAnnouncement(sData);
    }
    
  }

  /* Individual List Item Click Function / " More " Button Click Function */
  goDetail(announc){
    if(this.mediaView){
      this.navCtrl.push(MediaAnnoucementsDetailPage, {fromMedia : true, detail: announc});
    }else if(this.homeView){
      //console.log(this.homeView);
      this.navCtrl.push(MediaAnnoucementsDetailPage, {fromHome : true, detail: announc});
    }else{
      this.navCtrl.push(MediaAnnoucementsDetailPage, {detail: announc});
    }
  }

  /* Sidemenu Icon Click Function */
  openMenu(){
    let menuShow = localStorage.getItem('direction');
    if(menuShow == 'rtl'){
      this.menuCtrl.open('right');
    }else{
      this.menuCtrl.open('left');
    }
  }



}
