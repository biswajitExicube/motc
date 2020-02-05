import { Injectable } from "@angular/core";
import { EServiceAction } from "../actions/eService_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import { Http } from "@angular/http";
import { Base64Provider } from "../../providers/image-base64/image_base64";

@Injectable()
export class EServiceEpics{
    constructor(public eServiceAction : EServiceAction, public http : Http, public Base64Provider: Base64Provider){}

    eService = (action$ : ActionsObservable<any>) => {
        return action$.ofType(EServiceAction.ESERVICE_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log("E-Service Data ", payload);
                let lang = payload.lang;
                let segment = payload.segment
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+lang+"/GetAllSharedServices/"+segment)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+lang+"/GetAllSharedServices/"+segment)
                .subscribe((data) => {
                    if(data.ok == true){
                        let eServiceData = data.json();
                        // console.log("Eservice all data",eServiceData);
                        this.eServiceAction.eServiceSuccess(eServiceData);
                    };
                });
            })
            
        })
    }

    

//All EService / Shared service

    esIndividual = (action$ : ActionsObservable<any>) => {
        return action$.ofType(EServiceAction.ESERVICE_INDIVIDUAL_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                let lang = payload.lang;
                let segment = payload.segment

                let IndividualsAll:any=[];
                let AgencyArr:any=[];
                let publicAll:any=[]
                // this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+lang+"/GetAllSharedServices/"+segment)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+lang+"/GetAllSharedServices")
                .subscribe((data:any) => {
                    if(data._body !=""){
                        let esIndividualData = data.json();
                        // if(esIndividualData){
                        //     this.eServiceAction.ESIndividualSuccess(esIndividualData);
                        // }else{
                        //     console.log("ES Individuals error");
                        // }

                        for(let i=0; i<esIndividualData.length; i++){
                            if(esIndividualData[i].ServiceType == 'Individual'){
                                IndividualsAll.push(esIndividualData[i]);
                                if(IndividualsAll != ''){
                                    for(let i=0; i<IndividualsAll.length; i++){
                                        let imageUrl = IndividualsAll[i].ImageUrl? IndividualsAll[i].ImageUrl : '';
                                        this.Base64Provider.convertImageBase(imageUrl)
                                        .subscribe((res : any) => {
                                            if(res != ''){
                                                if(res._body = ''){
                                                    let imageBase64 = res.json();
                                                    console.log(imageBase64);
                                                    IndividualsAll[i].PictureBase64String = imageBase64
                                                }
                                            }
                                        })
                                    }
                                }
                            }else if(esIndividualData[i].ServiceType == 'Agency'){
                                AgencyArr.push(esIndividualData[i]);
                                if(AgencyArr != ''){
                                    for(let i=0; i<AgencyArr.length; i++){
                                        let imageUrl = AgencyArr[i].ImageUrl? AgencyArr[i].ImageUrl : '';
                                        this.Base64Provider.convertImageBase(imageUrl)
                                        .subscribe((res : any) => {
                                            if(res != ''){
                                                // console.log(res);
                                                if(res._body = ''){
                                                    let imageBase64 = res.json();
                                                    AgencyArr[i].PictureBase64String = imageBase64
                                                }
                                            }
                                        })
                                    }
                                }
                            }else if(esIndividualData[i].ServiceType == 'Public'){
                                publicAll.push(esIndividualData[i]);
                                if(publicAll != ''){
                                    for(let i=0; i<publicAll.length; i++){
                                        let imageUrl = publicAll[i].ImageUrl? publicAll[i].ImageUrl : '';
                                        this.Base64Provider.convertImageBase(imageUrl)
                                        .subscribe((res : any) => {
                                            if(res != ''){
                                                // console.log(res);
                                                if(res._body = ''){
                                                    let imageBase64 = res.json();
                                                    publicAll[i].PictureBase64String = imageBase64
                                                }
                                            }
                                        })
                                    }
                                }
                            }
                        }
                        this.eServiceAction.ESIndividualSuccess(IndividualsAll);
                        this.eServiceAction.ESCompaniesSuccess(AgencyArr);
                        this.eServiceAction.ESOthersSuccess(publicAll);
                    };
                });
            })
        })
    }




    esCompanies = (action$ : ActionsObservable<any>) => {
        return action$.ofType(EServiceAction.ESERVICE_COMPANIES_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                //console.log("E-Service Companies Data ", payload);
                let lang = payload.lang;
                let segment = payload.segment
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+lang+"/GetAllSharedServices/"+segment)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+lang+"/GetAllSharedServices/"+segment)
                .subscribe((data) => {
                    if(data.ok == true){
                        let esCompaniesData = data.json();
                        if(esCompaniesData){
                            // console.log("Companies data",esCompaniesData);
                            this.eServiceAction.ESCompaniesSuccess(esCompaniesData);
                        }else{
                            console.log("ES Companies error");
                        }
                    };
                });
            })
        })
    }

    esOthers = (action$ : ActionsObservable<any>) => {
        return action$.ofType(EServiceAction.ESERVICE_OTHERS_FETCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // console.log("E-Service Others Data ", payload);
                let lang = payload.lang;
                let segment = payload.segment
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+lang+"/GetAllSharedServices/"+segment)
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+lang+"/GetAllSharedServices/"+segment)
                .subscribe((data) => {
                    if(data.ok == true){
                        let esOthersData = data.json();
                        if(esOthersData){
                            // console.log("Others data",esOthersData);
                            this.eServiceAction.ESOthersSuccess(esOthersData);
                        }else{
                            console.log("ES Others error");
                        }
                    };
                });
            })
        })
    }
}