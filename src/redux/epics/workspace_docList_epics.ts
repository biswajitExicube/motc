import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ActionsObservable } from "redux-observable";
import { WorkspaceDocListAction } from "../actions/workspace_docList_action";
import { Observable } from "rxjs";
import { Base64Provider } from "../../providers/image-base64/image_base64";

@Injectable()
export class WorkspaceDocListEpics{
    constructor(public workspaceDocListAction : WorkspaceDocListAction,public http : Http, public Base64Provider : Base64Provider){}
    
    workspaceDocList = (action$ : ActionsObservable<any>) => {
        return action$.ofType(WorkspaceDocListAction.WORKSPACE_DOCLIST_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // // console.log("Workspace Document List data ", payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetWorkspaceHomePageDocuments/"+payload.userId+"/"+payload.workspaceId)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetWorkspaceHomePageDocuments/"+payload.userId+"/"+payload.workspaceId)
                .subscribe((data) => {
                    if(data.ok == true){
                        let WSDocListData = data.json();
                        if(WSDocListData){
                            for(let i=0; i<WSDocListData.length; i++){
                                if(WSDocListData[i].Created.RFCDateTime){
                                    /*for(let key in WSDocListData[i]){
                                        var str = WSDocListData[i].Created.RFCDateTime;
                                        var newsDate = new Date(str);
                                        var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                        let tempdate = dateString.split(",")[0]; 
                                        var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                        var time = dateString.split(",")[2];

                                        WSDocListData[i].newsDate = key;
                                        WSDocListData[i].newsDate = date;
                                        WSDocListData[i].newsTime = key;
                                        WSDocListData[i].newsTime = time;
                                    }*/
                                    var str = WSDocListData[i].Created.RFCDateTime;
                                    var newsDate = new Date(str);
                                    var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                    let tempdate = dateString.split(",")[0]; 
                                    var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                    var time = dateString.split(",")[2];

                                    WSDocListData[i].newsDate = date;
                                    WSDocListData[i].newsTime = time;
                                }
                                let imageUrl = WSDocListData[i].ExtensionImageUrl? WSDocListData[i].ExtensionImageUrl : '';
                                this.Base64Provider.convertImageBase(imageUrl)
                                .subscribe((res : any) => {
                                    if(res != ''){
                                        if(res._body != ''){
                                            let imageBase64 = res.json();
                                            WSDocListData[i].PictureBase64String = imageBase64;
                                        }
                                    }
                                })
                            }
                            
                            console.log(WSDocListData);
                        }                        
                        this.workspaceDocListAction.workspaceDocListSuccess(WSDocListData);
                    }
                })
            })
        })
    }
}