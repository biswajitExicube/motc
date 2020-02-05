import { Injectable } from "@angular/core";
import { WorkGroupAction } from "../actions/workgroup_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";

@Injectable()
export class WorkGroupEpics{
    constructor(public workGroupAction : WorkGroupAction, public http : Http){}
    
    //public workgroup
    workGroup = (action$ : ActionsObservable<any>) => {
        return action$.ofType(WorkGroupAction.WORKGROUP_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                console.log(payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/"+payload.lang+"/GetWorkspaceHomePageWorkSpaces/public/empty/"+payload.userId+"/"+payload.pageNo)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/"+payload.lang+"/GetWorkspaceHomePageWorkSpaces/public/empty/"+payload.userId+"/"+payload.pageNo)
                .subscribe((data) => {
                    if(data){
                        let workGroupData = data.json();
                         console.log(workGroupData);
                        this.workGroupAction.workGroupSuccess(workGroupData);
                    }
                })
            })
        })
    }


    //my workgroup
    myworkGroup = (action$ : ActionsObservable<any>) => {
        return action$.ofType(WorkGroupAction.MY_WORKGROUP_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/"+payload.lang+"/GetWorkspaceHomePageWorkSpaces/my/empty/"+payload.userId+"/"+payload.pageNo)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/"+payload.lang+"/GetWorkspaceHomePageWorkSpaces/my/empty/"+payload.userId+"/"+payload.pageNo)
                .subscribe((data) => {
                    if(data){
                        let workGroupData = data.json();
                        console.log(workGroupData);
                        this.workGroupAction.myworkGroupSuccess(workGroupData);
                    }
                })
            })
        })
    }
        
}