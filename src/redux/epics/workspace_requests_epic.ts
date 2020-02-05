import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { WorkspaceRequestdataAction } from "../actions/workspace_requests_action";

@Injectable()
export class WorkspaceRequestdataEpics{
    constructor(public workspacerequestactions : WorkspaceRequestdataAction,public http : Http){}
    
    fetchWorkspaceRequestdata = (action$ : ActionsObservable<any>) => {
        return action$.ofType(WorkspaceRequestdataAction.FETCH_WORKSPACE_REQUEST)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/GetWorkspaceRequests/" +payload.workspaceId+ "/" +payload.userid)
                .subscribe((data:any) => {
                    console.log(data);
                    if(data._body !=""){
                        let result = data.json();
                        this.workspacerequestactions.successWorkspaceRequestdata(result);
                    }
                })
            })
        })
    }
}