import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { AnnounceDetailData } from '../../redux/core/announce_detail_session';
import { AnnounceDetailAction } from '../../redux/actions/announce_detail_action';

@IonicPage()
@Component({
  selector: 'page-media-annoucements-detail',
  templateUrl: 'media-annoucements-detail.html',
})
export class MediaAnnoucementsDetailPage {
  
  @select(['annouceDetailData', 'announceDetailData'])
  readonly announceDetailData$ : Observable<AnnounceDetailData>;

  public direction : any;
  public eventLike : boolean = false;
  public fromMedia : any;
  public fromHome : any;
  public detailData : any = [];
  public currLang : string;
  public announcementData:any=[]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public announceDetailAction : AnnounceDetailAction) {

      this.fromMedia = this.navParams.get('fromMedia');
      this.fromHome = this.navParams.get('fromHome');
      this.detailData = this.navParams.get('detail');
      console.log(this.detailData);

      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = 'en';
        this.announceDetailAction.announceDetailFetch({lang : this.currLang, id : this.detailData.ID});
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
        this.announceDetailAction.announceDetailFetch({lang : this.currLang, id : this.detailData.ID});
      }
      this.announceDetailData$.subscribe((data:any) => {
        if(data){
          this.announcementData = data;
          console.log(data);
        }
      })

     
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MediaAnnoucementsDetailPage');
  }
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.announceDetailAction.announceDetailFetch({lang : 'ar', id : this.detailData.ID})
      }else if(this.direction == 'ltr'){
        this.announceDetailAction.announceDetailFetch({lang : 'en', id : this.detailData.ID})
      }
    });
  }
  eventLiking(){
    this.eventLike = !this.eventLike;
  }

}
