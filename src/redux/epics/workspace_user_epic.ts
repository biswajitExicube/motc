import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";
import { WorkspaceUserAction } from "../actions/workspace_user_action";

@Injectable()
export class WorkspaceUserEpics{

    constructor(public workspaceUserAction : WorkspaceUserAction, private http : Http){}
    
    workSpaceUserTask = (action$ : ActionsObservable<any>) => {
        return action$.ofType(WorkspaceUserAction.SUCCESS_WORKSPACE_USER_TASK)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/en/GetWorkspaceUserTasks/39/1121")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/en/GetWorkspaceUserTasks/39/1121")
                .subscribe((data) => {
                    //console.log(data);
                    if(data.ok == true){
                        // let aboutData = data.json();
                        let aboutData:any = data
                        // console.log(aboutData);
                        // this.workspaceUserAction.successWorkspaceTask(aboutData);
                    }
                })
            })
        })
    }
}