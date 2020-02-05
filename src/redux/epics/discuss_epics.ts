import { Injectable } from "@angular/core";
import { DiscussAction } from "../actions/discuss_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";

@Injectable()
export class DiscussEpics{
    constructor(public discussAction : DiscussAction, public http : Http){}

    discuss = (action$ : ActionsObservable<any>) => {
        return action$.ofType(DiscussAction.DISCUSS_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log(payload);
                // this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetWorkspaceDiscussions/"+payload.userId+"/"+payload.workspaceId)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/"+payload.lang+"/GetWorkspaceDiscussions/"+payload.userid+"/"+payload.workspaceId)
                
                .subscribe((data:any) => {
                    console.log(data)
                    if(data._body){
                        let discussData = data.json();
                        // console.log(discussData);
                        this.discussAction.discussSuccess(discussData);
                    }else{
                        let discussData = [];
                        this.discussAction.discussSuccess(discussData);
                    }
                })
            })
        })
    }
}