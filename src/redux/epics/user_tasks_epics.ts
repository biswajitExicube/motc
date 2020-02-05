import { Injectable } from "@angular/core";
import { UserTasksAction } from "../actions/user_tasks_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Events } from "ionic-angular";
import { AlertProvider } from "../../providers/alert-provider/alert_provider";

@Injectable()
export class UserTasksEpics{
    constructor(
        public userTasksAction : UserTasksAction, 
        public http : Http,
        public events:Events,
        public AlertProvider:AlertProvider
    ){}
    
    /* User all tasks / Workspace User All Tasks */
    userTasks = (action$ : ActionsObservable<any>) => {
        return action$.ofType(UserTasksAction.USER_TASKS_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // console.log("payload : ", payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/" + payload.lang +"/GetAllTasks/" + payload.username)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/" + payload.lang +"/GetAllTasks/" + payload.username)
                .subscribe((data) => {
                    if(data.ok == true){
                        let tasksData = data.json();
                        if(tasksData){
                            var allMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"]
                            for(let i=0; i<tasksData.length; i++){

                                if(tasksData[i].DueDate){
                                    if(tasksData[i].DueDate.RFCDateTime){
                                        let serverDate = new Date(tasksData[i].DueDate.RFCDateTime);
                                        tasksData[i].endDate = serverDate.getDate() + ' ' + allMonth[serverDate.getMonth()] + ', ' + serverDate.getFullYear();
                                    }
                                }
                                if(tasksData[i].StartDate1){
                                    if(tasksData[i].StartDate1.RFCDateTime){
                                        let serverDate = new Date(tasksData[i].StartDate1.RFCDateTime);
                                        tasksData[i].startDate = serverDate.getDate() + ' ' + allMonth[serverDate.getMonth()] + ', ' + serverDate.getFullYear();
                                    }
                                }

                                // if(tasksData[i].End){
                                //     for(let key in tasksData[i]){
                                //         var str = tasksData[i].End.RFCDateTime;
                                //         var newsDate = new Date(str);
                                //         var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                //         let tempdate = dateString.split(",")[0]; 
                                //         var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                //         var time = dateString.split(",")[2];
                                        
                                //         tasksData[i].endDate = key;
                                //         tasksData[i].endDate = date;
                                //         tasksData[i].endTime = key;
                                //         tasksData[i].endTime = time;
                                //     }
                                // }
                            }
                            // console.log(tasksData);
                        }
                        // console.log(tasksData);
                        this.userTasksAction.userTasksSuccess(tasksData);
                    }
                })
            })
        })
    }

    /* Work Space User Task */
    workspaceUsertasks = (action$ : ActionsObservable<any>) => {
        return action$.ofType(UserTasksAction.WORKSPACE_TASKS_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetWorkspaceUserTasks/" + payload.userid+ "/"+payload.workspaceid)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetWorkspaceUserTasks/" + payload.userid+ "/"+payload.workspaceid)
                .subscribe((data:any) => {
                    // console.log("usertask data : ", data)
                    if(data.ok == true){
                        if(data._body !=''){
                            let tasksData = data.json();
                            if(tasksData){
                                for(let i=0; i<tasksData.length; i++){
                                    if(tasksData[i].End){
                                        for(let key in tasksData[i]){
                                            var str = tasksData[i].End.RFCDateTime;
                                            var newsDate = new Date(str);
                                            var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                            let tempdate = dateString.split(",")[0]; 
                                            var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                            var time = dateString.split(",")[2];
                                            
                                            tasksData[i].endDate = key;
                                            tasksData[i].endDate = date;
                                            tasksData[i].endTime = key;
                                            tasksData[i].endTime = time;
                                        }
                                    }
                                }
                            }
                            // console.log(tasksData);
                            this.userTasksAction.userTasksSuccess(tasksData);
                        }

                    }
                })
            })
        })
    }
    

    //User Task Details Fetch
    userTasksDetail = (action$ : ActionsObservable<any>) => {
        return action$.ofType(UserTasksAction.USER_TASKS_DETAIL_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // console.log("User Tasks Detail", payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetWorkspaceUserTasks/37/1121/"+payload.id)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetWorkspaceUserTasks/19/1120/"+payload.id)
                .subscribe((data) => {
                    if(data.ok == true){                        
                        let detailsData = data.json();
                        if(detailsData){
                            console.log("detailsData", detailsData);
                            this.userTasksAction.userTasksDetailSuccess(detailsData);
                        }
                    }
                })
            })
        })
    }


    //Submit Task
        submitTask = (action$ : ActionsObservable<any>) => {
            return action$.ofType(UserTasksAction.SUBMIT_TASKS)
            .mergeMap(({payload}) => {
                return new Observable(() => {
                    let headers = new Headers ({ 'Content-Type': 'application/json' });
                    let options = new RequestOptions({ headers: headers });
                    this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/UpdateTask", payload, options)
                    .subscribe((data:any)=>{
                        if(data){
                            console.log(data)
                            if(data._body == "true"){
                                this.events.publish("operation:back")
                            }else{
                                this.AlertProvider.openAlert("Data submit failed. Please try again",1500)
                            }
                        }
                    },(error=>{
                        console.log("data error is : ", error);
                        // let data:any = []
                        // this.allSearchAction.SuccessKnowledgeCenterSearch(data);
                    }))
                })

            })
            
        }
}