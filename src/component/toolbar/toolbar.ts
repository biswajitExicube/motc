import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MyTaskPage } from '../../pages/my-task/my-task';
import { ContactFavouritePage } from '../../pages/contact-favourite/contact-favourite';
import { FavouritePage } from '../../pages/favourite/favourite';
import { NotificationPage } from '../../pages/notification/notification';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
// import { NotifyData } from '../../redux/core/notify_session';
import { NotifyAction } from '../../redux/actions/notify_action';
import { UserTasks } from '../../redux/core/user_tasks_session';
import { UserTasksAction } from '../../redux/actions/user_tasks_action';

@Component ({
    selector : 'toolbar',
    templateUrl : 'toolbar.html'
})

export class ToolbarComponent {
    public currLang : string;
    public notificationCount : number;
    public taskCount : number;

    @select(['userTasksData', 'taskData'])
    readonly taskData$ : Observable<UserTasks>;
    // @select(['notifyData', 'notifyData'])
    // readonly notifyData$ : Observable<NotifyData>;

    constructor(
        public navCtrl : NavController,
        public userTasksAction : UserTasksAction,
        public notifyAction : NotifyAction){
        
        let localLang = localStorage.getItem('direction');
        if(localLang == 'ltr'){
            this.currLang = 'en';
            this.checkUser(this.currLang)
            // this.userTasksAction.userTasksFetch(this.currLang);
            // this.notifyAction.notifyFetch(this.currLang);
            
        }else if(localLang == 'rtl'){
            this.currLang = 'ar';
            this.checkUser(this.currLang)
            // this.userTasksAction.userTasksFetch(this.currLang);
            // this.notifyAction.notifyFetch(this.currLang);
        }


        this.taskData$.subscribe((data:any) => {
            if(data){
                this.taskCount = data.length;
            }
        })

        // this.notifyData$.subscribe((data:any) => {
        //     if(data){
        //         this.notificationCount = data.length;            
        //     }
        // })

    };


    /* Check User comming from */
    checkUser(currlang){
        let userData:any = localStorage.getItem('userData');
        userData = JSON.parse(userData);

        let userName = userData.UserName;
        if(userName){
            let data = {
                lang:currlang,
                username:userName
            }
            this.userTasksAction.allTasks(data);
        }

    }



    favContact(){
        this.navCtrl.setRoot(ContactFavouritePage);
    }
    myTask(){
        this.navCtrl.setRoot(MyTaskPage);
    }
    favourite(){
        this.navCtrl.setRoot(FavouritePage);
    }
    notification(){
        this.navCtrl.setRoot(NotificationPage);
    }
};