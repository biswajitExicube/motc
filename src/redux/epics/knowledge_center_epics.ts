import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { KnowledgeCenterAction } from "../actions/knowledge_center_action";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";
import { Base64Provider } from "../../providers/image-base64/image_base64";

@Injectable()
export class KnowledgeCenterEpics{
    
    constructor( public KCAction : KnowledgeCenterAction ,public http : Http, public Base64Provider : Base64Provider){}

    //politics knowledge center
    getPoliticsKnowledgeCenter = (action$ : ActionsObservable<any>) => {
        return action$.ofType(KnowledgeCenterAction.KNOWLEDGE_CENTER_POLITICS_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log("Politics Data", payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetKCAllDocuments/0/" + payload.userid + "?list=Policies%20and%20Procedures")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetKCAllDocuments/0/" + payload.userid + "?list=Policies%20and%20Procedures")
                .subscribe((data) => {
                    if(data.ok == true){
                        let politicsData = data.json();
                        if(politicsData != ''){
                            let politicsDocs = politicsData.Documents;
                            for(let i=0; i<politicsDocs.length; i++){
                                let politicsDocIcon = politicsDocs[i].DocIcon;
                                this.Base64Provider.convertImageBase(politicsDocIcon)
                                .subscribe((res : any) => {
                                    if(res != ''){
                                        let imageBase64 = res.json();
                                        politicsDocs[i].PictureBase64String = imageBase64;                                        
                                    }
                                })
                            }
                        }
                        // console.log(politicsData);
                        this.KCAction.politicsSuccess(politicsData);
                    }
                })
            })
        })
    }

    //best practice knowledge center
    getBestPracticeKnowledgeCenter = (action$ : ActionsObservable<any>) => {
        return action$.ofType(KnowledgeCenterAction.KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log("Best Practice Data", payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetKCAllDocuments/0/" + payload.userid + "?list=Best%20Practices")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetKCAllDocuments/0/" + payload.userid + "?list=Best%20Practices")
                .subscribe((data) => {
                    if(data.ok == true){
                        let bestPracticeData = data.json();
                        if(bestPracticeData != ''){
                            let bestPracDocs = bestPracticeData.Documents;
                            for(let i=0; i<bestPracDocs.length; i++){
                                let politicsDocIcon = bestPracDocs[i].DocIcon;
                                this.Base64Provider.convertImageBase(politicsDocIcon)
                                .subscribe((res : any) => {
                                    if(res != ''){
                                        let imageBase64 = res.json();
                                        bestPracDocs[i].PictureBase64String = imageBase64;                                        
                                    }
                                })
                            }
                        }
                        // console.log(bestPracticeData);
                        this.KCAction.bestPracticeSuccess(bestPracticeData);
                    }
                })
            })
        })
    }

    //Get Other Knowledge Center Data
    getOtherKnowledgeCenter = (action$ : ActionsObservable<any>) => {
        return action$.ofType(KnowledgeCenterAction.FETCH_OTHER_KNOWLEDGE_CENTER_LIST)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/" + payload.lang + "/GetKCAllDocuments/0/" + payload.userid + "?list=" + payload.listname)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/" + payload.lang + "/GetKCAllDocuments/0/" + payload.userid + "?list=" + payload.listname)
                .subscribe((data:any) => {
                    if(data.ok == true){
                        if(data._body != ""){
                            let othersData = data.json();
                            if(othersData != ''){
                                let otherDocs = othersData.Documents;
                                for(let i=0; i<otherDocs.length; i++){
                                    let politicsDocIcon = otherDocs[i].DocIcon;
                                    this.Base64Provider.convertImageBase(politicsDocIcon)
                                    .subscribe((res : any) => {
                                        if(res != ''){
                                            let imageBase64 = res.json();
                                            otherDocs[i].PictureBase64String = imageBase64;                                        
                                        }
                                    })
                                }
                            }
                            console.log("othersData : ",othersData);
                            // this.KCAction.othersSuccess(othersData);
                            this.KCAction.othersKnowledgeCenterListSuccess(othersData);
                        }else{
                            let dd = [];
                            // console.log(dd)
                            this.KCAction.othersKnowledgeCenterListSuccess(dd);
                        }

                    }
                })
            })
        })
    }


    // Other knowledge center Catagory list
    othersKnowledgecenterCatagoryListFetch = (action$ : ActionsObservable<any>) => {
        return action$.ofType(KnowledgeCenterAction.KNOWLEDGE_CENTER_OTHERS_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log("Others Data", payload);
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetOtherDocumentLibraries/true")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/GetOtherDocumentLibraries/true")
                .subscribe((data) => {
                    if(data.ok == true){
                        let othersData = data.json();
                        var res = othersData.split(",");
                        res = res.filter(v=>v!='');
                        this.KCAction.othersSuccess(res);
                        let fetchlistdata = {
                                lang:payload.lang,
                                userid:payload.userid,
                                listname:res[0]

                        }
                        this.KCAction.othersKnowledgeCenterList(fetchlistdata);
                    }
                })
            })
        })
    }

    
    



}