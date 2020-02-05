import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { UserTasksData } from '../../redux/core/user_tasks_session';
import { UserTasksAction } from '../../redux/actions/user_tasks_action';


@IonicPage()
@Component({
  selector: 'page-my-task-details',
  templateUrl: 'my-task-details.html',
})
export class MyTaskDetailsPage {

  @select(['userTasksDetail', 'taskDetail'])
  readonly taskDetail$ : Observable<UserTasksData>

  public direction : any;
  public taskDetail : any = [];
  public currLang : string;
  public userid:any;

  public completion:string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public userTasksAction : UserTasksAction) {
      this.taskDetail = this.navParams.get('detail');
      console.log(this.taskDetail);
      let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      this.userid = userData.ID;

      let localLang = localStorage.getItem('direction');
      if(localLang == 'ltr'){
        this.currLang = 'en';
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
      }

      // this.taskDetail$.subscribe((data) => {
      //   if(data){
      //     console.log("taskDetails : ", data);
      //   }
      // })

      this.events.subscribe("operation:back",()=>{
        this.navCtrl.pop()
      })

      
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


  saveTask(){
      if(this.completion == null || this.completion == undefined || this.completion == ""){

      }else{
          if(this.taskDetail){
              if(this.userid){
                  let data:any = {
                    Lang:this.currLang,
                    WorkspaceId:this.taskDetail.WorkspaceID,
                    Userid:this.userid,
                    TaskId:this.taskDetail.ID,
                    Percentage:this.completion
                  }
                  this.userTasksAction.submittask(data)
              }
          }
      }
  }

  
  cancel(){
    this.navCtrl.pop();
  }
}
