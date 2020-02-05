import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { DiscussData } from '../../redux/core/discuss_session';
import { DiscussAction } from '../../redux/actions/discuss_action';


@IonicPage()
@Component({
  selector: 'page-workspace-chart',
  templateUrl: 'workspace-chart.html',
})
export class WorkspaceChartPage {

  @select(['discussData','discussData'])
  readonly discussData$ : Observable<DiscussData>;

  public direction : any;
  public WRChartList : any = [];

  public currLang:any;
  public userId:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public discussAction : DiscussAction
  ) {
      let workspaceDetails = this.navParams.get("workspacedetails");
      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = 'en';
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
      }
      let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      this.userId = userData.ID;

      if(workspaceDetails){
        this.checkUser(workspaceDetails)
      }

      // if(this.navParams.get('paramData')){
      //   let getData = this.navParams.get('paramData');
      //   this.discussAction.discussFetch(getData);
        this.discussData$.subscribe((data:any) => {
          if(data){
            this.WRChartList = data;
            console.log(data);
          }
        })
      // }
      
  }

  checkUser(workspaceDetails){
    // console.log("workspace details :", workspaceDetails)
    if(this.userId){
      console.log("userid found ...")
        let data:any = {
          lang:this.currLang,
          userid:this.userId,
          workspaceId:workspaceDetails.ID
        }
        console.log(data);
        this.discussAction.discussFetch(data);
    }else{
      console.log("userid not found ...")
    }

  }

  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.currLang = 'ar';
      }else if(this.direction == 'ltr'){
        this.currLang = 'en';
      }
    });
  }

}
