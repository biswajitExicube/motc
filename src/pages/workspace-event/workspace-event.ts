import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { WorkEventsData } from '../../redux/core/work_events_session';
import { WorkEventsAction } from '../../redux/actions/work_events_action';
import { MediaEventDetailPage } from '../media-event-detail/media-event-detail';

@IonicPage()
@Component({
  selector: 'page-workspace-event',
  templateUrl: 'workspace-event.html',
})
export class WorkspaceEventPage {

  @select(['workEventsData', 'workEventsData'])
  readonly workEventsData$ : Observable<WorkEventsData>

  public direction : any;
  public eventLike : boolean = false;
  public showEle : boolean = false;
  public workEventsData : any = [];
  public currLang : string;
  public userDetails : any;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public events: Events,
    public workEventsAction : WorkEventsAction
  ) {

      let localLang = localStorage.getItem('direction');
      let userData:any = localStorage.getItem('userData');
      this.userDetails = JSON.parse(userData);
      if(localLang == 'ltr'){
          this.currLang = 'en';
          this.checknavParamData(this.currLang)

      }else if(localLang == 'rtl'){
          this.currLang = 'ar';
          this.checknavParamData(this.currLang)

      }

      this.workEventsData$.subscribe((data) => {
          if(data){
            this.workEventsData = data;
            console.log(data);
          }
      })
      

    let fromNotify = this.navParams.get('fromNotify');
    if(fromNotify){
        this.showEle = true;

    }else{
        this.showEle = false;
    }
  }

  /* IonViewWillENter function */
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.workEventsAction.workEventsFetch('ar');
      }else if(this.direction == 'ltr'){
        this.workEventsAction.workEventsFetch('en');
      }
    });
  }


  /* Check Nav Param function */
  checknavParamData(currentLang){

    let detailsid=this.navParams.get("detailsId")
    if(detailsid){
      this.checkUser(currentLang,detailsid)
    }
    // console.log("detailsid : ",detailsid);
  }

  /* localstorage user ID checking function */
  checkUser(currentLang,detailsid){
    let localstorageData = this.userDetails.ID;
    if(localstorageData){
        let data :any= {
          lang:currentLang,
          userid:localstorageData,
          detailsId:detailsid
        }
        console.log("here i am .... ");
        this.workEventsAction.workEventsFetch(data);
    }
  }

  /* Favorite item function */
  likingItem(index){ 
    console.log(index)
    this.eventLike = !this.eventLike;
  }

  goDetail(event){
    console.log(event)
    // this.navCtrl.push(MediaEventDetailPage, {event : event.ID});
  }

}
