import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { MyTaskDetailsPage } from '../my-task-details/my-task-details';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { UserTasks } from '../../redux/core/user_tasks_session';
import { UserTasksAction } from '../../redux/actions/user_tasks_action';


@IonicPage()
@Component({
  selector: 'page-my-task',
  templateUrl: 'my-task.html',
})
export class MyTaskPage {

  @select(['userTasksData', 'taskData'])
  readonly taskData$ : Observable<UserTasks>;

  public direction : any;
  public taskList : any = [];
  public currLang : string;

  public workspaceID:any;
  public userId:any;
  public comeFrom:any;
  public userName:any

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public menuCtrl: MenuController,
    public userTasksAction : UserTasksAction
  ) {

      this.workspaceID = this.navParams.get('workspaceId');
      this.comeFrom = this.navParams.get('fromPage')
      let userData:any = localStorage.getItem('userData');
      userData = JSON.parse(userData);
      this.userId = userData.ID;
      this.userName = userData.UserName;
      

      let localLang = localStorage.getItem('direction');

      if(localLang == 'ltr'){
        this.currLang = 'en';
        // this.userTasksAction.userTasksFetch(this.currLang);
        this.checkUser(this.currLang)
      }else if(localLang == 'rtl'){
        this.currLang = 'ar';
        this.checkUser(this.currLang)
        // this.userTasksAction.userTasksFetch(this.currLang);
      }
      this.taskData$.subscribe((data) => {
        if(data){
          // console.log(data);
          this.taskList = data;
          // console.log(this.taskList)
        }
      })
  }

  /* Check User comming from */
  checkUser(currlang){
    if(this.comeFrom){
        this.fetchWorkspaceTask(currlang)
    }else{
        this.fetchAllTask(currlang)
    }
  }

  /* Fetch Workspace User Tasks */
  fetchWorkspaceTask(currlang){
    if(this.userId){
      let data = {
        lang:currlang,
        userid:this.userId,
        workspaceid:this.workspaceID
      }
      this.userTasksAction.workspaceUserTasks(data);
    }
  }


  /* Fetch all Tasks */
  fetchAllTask(currlang){
      if(this.userName){
        let data = {
          lang:currlang,
          username:this.userName
        }
        this.userTasksAction.allTasks(data);
      }
  }


  /* IonViewWillEnter */
  ionViewWillEnter(){
    this.events.subscribe('type:direction', (value: any) => {
      this.direction = value;
      if(this.direction == 'rtl'){
        this.currLang = 'ar';
        // this.userTasksAction.userTasksFetch('ar');
      }else if(this.direction == 'ltr'){
        this.currLang = 'en';
        // this.userTasksAction.userTasksFetch('en');
      }
    });
  }


  /* Open menu function */
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

  
  /* Go Details Function */
  goDetail(task){
    // console.log(task);
    let data:any = task;
    
    if(this.comeFrom){
      data.WorkspaceID = this.workspaceID
    }
    this.navCtrl.push(MyTaskDetailsPage, {detail: task});
  }
}
