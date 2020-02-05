import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { EventsDetailData } from '../../redux/core/events_detail_session';
import { EventsDetailActions } from '../../redux/actions/events_detail_action';
import { AddRemoveFavAction } from '../../redux/actions/addRemoveFav_action';
import { EventsActions } from '../../redux/actions/events_action';
import { EventsData } from '../../redux/core/events_session';


@IonicPage()
@Component({
  selector: 'page-media-event-detail',
  templateUrl: 'media-event-detail.html',
})
export class MediaEventDetailPage {

  @select(['eventsDetailData', 'eventsDetailData'])
  readonly eventsDetailData$ : Observable<EventsDetailData>;

  @select(['eventsData', 'eventsData'])
  readonly eventsData$ : Observable<EventsData>;
  
  public direction : any;

  public fromMedia : any;
  public eventDetails : any;
  public eventID : any;
  public detailData : any = [];
  public currLang:string;
  public hideThis : boolean = true;
  public userID:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public eventsDetailAction : EventsDetailActions,
    public addRmFavAction : AddRemoveFavAction,
    public eventsAction : EventsActions) {

      //Form Media Event screen
      this.fromMedia = this.navParams.get('fromMedia');
      this.eventDetails = this.navParams.get('event');
      let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      this.userID = userData.ID;

      console.log(this.eventDetails);

      // console.log(this.fromMedia);

      if(this.eventDetails){
        let localLang = localStorage.getItem('direction');
        if(localLang == 'ltr'){
          this.currLang = 'en';
          this.eventsDetailAction.eventsDetailFetch({lang : this.currLang, id : this.eventDetails,userID:this.userID});
        }else if(localLang == 'rtl'){
          this.currLang = 'ar';
          this.eventsDetailAction.eventsDetailFetch({lang : this.currLang, id : this.eventDetails,userID:this.userID});
        }
        this.eventsDetailData$.subscribe((data) => {
          if(data){
            this.detailData = data;
            console.log("Detail data = ",this.detailData);
          }
        })
      }
      
      // this.eventID = this.eventDetails.ID;
      // console.log(this.eventDetails);
      
      
      
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MediaEventDetailPage');
  }
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.currLang = 'ar';
        this.eventsDetailAction.eventsDetailFetch({lang : 'ar', id : this.eventID,userID:this.userID});
      }else if(this.direction == 'ltr'){
        this.currLang = 'en';
        this.eventsDetailAction.eventsDetailFetch({lang : 'en', id : this.eventID,userID:this.userID});
      }
    });
  }

  isFav(){
    // this.hideThis = false;
    // this.eventLike = !this.eventLike;
    
    this.addRmFavAction.startAddRemoveFav({lang: this.currLang, ref: 'events', itemID : this.eventID, opr :!this.detailData.IsFavourite})
    
    
  }
}
