import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, MenuController } from 'ionic-angular';
import { MediaEventDetailPage } from '../media-event-detail/media-event-detail';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { EventsData } from '../../redux/core/events_session';
import { EventsActions } from '../../redux/actions/events_action';
import { SearchEvents } from '../../redux/core/all_search_session';
import { AllSearchAction } from '../../redux/actions/all_search_action';

@IonicPage()
@Component({
  selector: 'page-media-events',
  templateUrl: 'media-events.html',
})
export class MediaEventsPage {

  @select(['eventsData', 'eventsData'])
  readonly eventsData$ : Observable<EventsData>;
  @select(['EventSearchReducer', 'SearchEventsData'])
  readonly SearchEventsData$ : Observable<SearchEvents>;

  @select(['EventSearchReducer', 'loading'])
  readonly loading$ : Observable<SearchEvents>;
  
  public direction : any;
  public fromMedia : any;
  public eventsList : any = [];
  public defaultEventsValue:any;
  public currLang:string
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    public eventsAction : EventsActions,
    public SEventsAction : AllSearchAction
  ) {

      this.fromMedia = this.navParams.get('fromMedia');

      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = 'en';
        this.checkUser(this.currLang)
        // this.eventsAction.eventsFetch('en');
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
        this.checkUser(this.currLang)
        // this.eventsAction.eventsFetch('ar');
      }

      /* Fetch Search Event Data */
      this.SearchEventsData$.subscribe((data:any) => {
        if(data){
          console.log(data);
          if(data.Results){
            this.eventsList = data.Results;
          }else{this.eventsList = []}
        }
      })

      /* Fetch Event Data */
      this.eventsData$.subscribe((data:any) => {
        if(data){
          console.log(data);
          this.defaultEventsValue = data
          this.eventsList = this.defaultEventsValue;
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
        // this.eventsAction.eventsFetch('ar');
      }else if(this.direction == 'ltr'){
        this.currLang = 'en';
        this.checkUser(this.currLang)
        // this.eventsAction.eventsFetch('en');
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
          this.eventsAction.eventsFetch(data);

      }
  }

  /* Side Menu Open Function */
  openMenu(){
    let menuShow = localStorage.getItem('direction');
    if(menuShow == 'rtl'){
      this.menuCtrl.open('right');
    }else{
      this.menuCtrl.open('left');
    }
  }

  searchEvents(eve){
    // console.log("eve 1 : ", eve)

    if(eve == ""){
      this.eventsList = this.defaultEventsValue;
    }else{
      let sData = {
        Search: eve,
        Categories: null,
        Tags : null,
        Page:0,
        Language:this.currLang
      };
      console.log("eve last  : ", sData)
      this.SEventsAction.FetchEvent(sData);
    }
    // this.SEventsAction.FetchEvent(sData);
  }
  
  goDetail(event){
    if(this.fromMedia){
      this.navCtrl.push(MediaEventDetailPage, {fromMedia : true, event: event.ID});
    }else{
      this.navCtrl.push(MediaEventDetailPage, {event : event.ID});
    }
  }

}
