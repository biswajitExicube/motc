import { Injectable } from "@angular/core";
import { JoinWorkspaceAction } from "../actions/join_workspace_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { AlertProvider } from "../../providers/alert-provider/alert_provider";

@Injectable()
export class JoinWorkspaceEpics{
    constructor(public joinWorkspaceAction : JoinWorkspaceAction, public http : Http, public alertprovider : AlertProvider){}
    
    joinWorkspace = (action$ : ActionsObservable<any>) => {
        return action$.ofType(JoinWorkspaceAction.JOIN_WORKSPACE_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // console.log("Join Workspace Data" , payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/JoinWorkspaceById/"+payload.userId+"/"+payload.workspaceId)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/JoinWorkspaceById/"+payload.userId+"/"+payload.workspaceId)
                .subscribe((data) => {
                    if(data.ok == true){
                        let joinWorkspaceData = data.json();
                        this.alertprovider.openToast(joinWorkspaceData.message);
                        // console.log(joinWorkspaceData);
                        // this.joinWorkspaceAction.joinWorkspaceSuccess(joinWorkspaceData);
                    }else{
                        
                    }
                })
            })
        })
    }
}