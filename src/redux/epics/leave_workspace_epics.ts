import { Injectable } from "@angular/core";
import { LeaveWorkspaceAction } from "../actions/leave_workspace_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { AlertProvider } from "../../providers/alert-provider/alert_provider";

@Injectable()
export class LeaveWorkspaceEpics{
    constructor(public leaveWorkspaceAction : LeaveWorkspaceAction, public http : Http, public alertProvider : AlertProvider){}
    
    leaveWorkspace = (action$ : ActionsObservable<any>) => {
        return action$.ofType(LeaveWorkspaceAction.LEAVE_WORKSPACE_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log("Leave Workspace data ", payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/LeaveWorkspaceById/"+payload.userId+"/"+payload.workspaceId)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/LeaveWorkspaceById/"+payload.userId+"/"+payload.workspaceId)
                .subscribe((data) => {
                    if(data.ok == true){
                        let leaveWorkspaceData = data.json();
                        // console.log(leaveWorkspaceData);
                        this.alertProvider.openToast(leaveWorkspaceData.message);
                    }else{

                    }
                })
            })
        })
    }
}