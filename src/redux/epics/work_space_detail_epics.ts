import { Injectable } from "@angular/core";
import { WorkSpaceDetailAction } from "../actions/work_space_detail_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";
import { Base64Provider } from "../../providers/image-base64/image_base64";

@Injectable()
export class WorkSpaceDetailEpics{
    constructor(public workSpaceDetailAction : WorkSpaceDetailAction, public http : Http, public Base64Provider : Base64Provider){}
    
    workSpaceDetail = (action$ : ActionsObservable<any>) => {
        return action$.ofType(WorkSpaceDetailAction.WORK_SPACE_DETAIL_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // console.log("Work Space Detail ", payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetWorkspaceDetails/"+payload.userId+"/"+payload.workSpaceId)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetWorkspaceDetails/"+payload.userId+"/"+payload.workSpaceId)
                .subscribe((data:any) => {
                    if(data.ok == true){
                        // console.log("workspace details : " , data);
                        if(data._body != ""){
                            let workSpaceDD:any = data.json();
                            // console.log("workspace details : " , workSpaceDD);
                            let adminData = workSpaceDD.Admin;
                            let imageUrl = adminData.PictureUrl? adminData.PictureUrl : '';
                            this.Base64Provider.convertImageBase(imageUrl)
                            .subscribe((res : any) => {
                                if(res != ''){
                                    if(res._body != ''){
                                        let imageBase64 = res.json();
                                        adminData.PictureBase64String = imageBase64;
                                    }
                                }
                            })
                            console.log(adminData);
                            this.workSpaceDetailAction.workSpaceDetailSuccess(workSpaceDD);
                        }else{
                            console.log("error el")
                        }

                    }
                })
            })
        })
    }
}