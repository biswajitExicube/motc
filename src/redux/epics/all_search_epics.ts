import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, RequestOptions, Headers } from "@angular/http";
import { Injectable } from "@angular/core";
import { AllSearchAction } from "../actions/all_search_action";
import { LoadingController } from "ionic-angular";

@Injectable()
export class AllSearchEpics{

    constructor(public allSearchAction : AllSearchAction, private http : Http,public loadingCtrl : LoadingController){}
    

    FetchAgencies = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllSearchAction.FETCH_AGENCIES)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // this.http.post("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/en/SearchAgencies", payload, options)
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/en/SearchAgencies", payload, options)
                .subscribe((data)=>{
                    if(data){
                        let result = data.json();
                        console.log("result is : ", result);
                        this.allSearchAction.SuccessAgencies(result)
                    }

                },(error=>{
                    console.log("data error is : ", error);
                    let data:any = []
                    this.allSearchAction.SuccessAgencies(data);
                }))
            })
        })
    }

    FetchAnnouncement = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllSearchAction.FETCH_ANNOUNCEMENT)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // this.http.post("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchAnnouncements", payload, options)
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchAnnouncements", payload, options)
                .subscribe((data)=>{
                    if(data){
                        let result = data.json();
                        console.log("result is : ", result);
                        this.allSearchAction.SuccessAnnouncement(result)
                    }
                  
                },(error=>{
                    console.log("data error is : ", error);
                    let data:any = []
                    this.allSearchAction.SuccessAnnouncement(data);
                }))
            })
        })
    }

    FetchDocument = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllSearchAction.FETCH_DOCUMENT)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // this.http.post("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchDocuments", payload, options)
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchDocuments", payload, options)
                .subscribe((data)=>{
                    if(data){
                        let result = data.json();
                        console.log("result is : ", result);
                        this.allSearchAction.SuccessDocument(result)
                    }
                },(error=>{
                    console.log("data error is : ", error);
                    let data:any = []
                    this.allSearchAction.SuccessDocument(data);
                }))
            })
        })
    }

    /* Complete */
    FetchEvent = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllSearchAction.FETCH_EVENT)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                // let loading = this.loadingCtrl.create({
                //     content: 'Please wait...'
                //   });
                // loading.present();
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // this.http.post("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchEvents", payload, options)
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchEvents", payload, options)
                .subscribe((data:any)=>{
                    if(data){
                        if(data._body!=""){
                            // loading.dismiss();
                            let result = data.json();
                            if(result){
                                for(let i=0; i<result.Results.length; i++){
                                    if(result.Results[i].Date){
                                        for(let key in result.Results[i]){
                                            var str = result.Results[i].Date.RFCDateTime;
                                            var newsDate = new Date(str);
                                            // console.log(str);
                                            // console.log(newsDate);
                                            var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });                          
                                            let tempdate = dateString.split(",")[0]; 
                                            var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                            var time = dateString.split(",")[2];
            
                                            // eventsDetailData.sDate = key;
                                            result.Results[i].newsDate = key;
                                            result.Results[i].newsDate = date;
                                            result.Results[i].newsTime = key;
                                            result.Results[i].newsTime = time;
                                        }
                                    }
                                }
                            }
                            // console.log("result is : ", result);
                            this.allSearchAction.SuccessEvent(result)
                        }else{
                            let data:any=[]
                            this.allSearchAction.SuccessEvent(data)
                        }

                    }
                },(error=>{
                    // loading.dismiss();
                    // console.log("data error is : ", error);
                    let data:any = []
                    this.allSearchAction.SuccessEvent(data);
                }))
            })
        })
    }

    /* Complete */
    FetchNews = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllSearchAction.FETCH_NEWS)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // this.http.post("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchNews", payload, options)
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchNews", payload, options)
                .subscribe((data:any)=>{
                    if(data){
                        // console.log(data._body);
                        if(data._body!=""){
                        let result = data.json();
                        if(result){
                            for(let i=0; i<result.Results.length; i++){
                                if(result.Results[i].Date.RFCDateTime){
                                    for(let key in result.Results[i]){
                                        var str = result.Results[i].Date.RFCDateTime;
                                        var newsDate = new Date(str);
                                        var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                        let tempdate = dateString.split(",")[0]; 
                                        var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                        var time = dateString.split(",")[2];

                                        result.Results[i].newsDate = key;
                                        result.Results[i].newsDate = date;
                                        result.Results[i].newsTime = key;
                                        result.Results[i].newsTime = time;
                                    }
                                }
                            }
                            console.log(result);
                            this.allSearchAction.SuccessNews(result)
                        }
                
                    }else{
                        let data:any=[]
                        this.allSearchAction.SuccessNews(data)
                    }
                }
                },(error=>{
                    console.log("data error is : ", error);
                    let data:any = []
                    this.allSearchAction.SuccessNews(data);
                }))
            })
        })
    }

    FetchPolls = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllSearchAction.FETCH_POLLS)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // this.http.post("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/en/SearchPolls", payload, options)
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/en/SearchPolls", payload, options)
                .subscribe((data)=>{
                    if(data){
                        let result = data.json();
                        console.log("result is : ", result);
                        this.allSearchAction.SuccessPolls(result)
                    }
                },(error=>{
                    console.log("data error is : ", error);
                    let data:any = []
                    this.allSearchAction.SuccessPolls(data);
                }))
            })
        })
    }

    FetchSurvey = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllSearchAction.FETCH_SURVEY)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // this.http.post("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchSurvey", payload, options)
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchSurvey", payload, options)
                .subscribe((data)=>{
                    if(data){
                        let result = data.json();
                        console.log("result is : ", result);
                        this.allSearchAction.SuccessSurvey(result)
                    }
                },(error=>{
                    console.log("data error is : ", error);
                    let data:any = []
                    this.allSearchAction.SuccessSurvey(data);
                }))
            })
        })
    }

    FetchUserContact = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllSearchAction.FETCH_USER_CONTACT)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // this.http.post("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchUserContacts", payload, options)
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchUserContacts", payload, options)
                .subscribe((data:any)=>{
                    if(data){
                        let result = data.json();
                        console.log("result is : ", result);
                        this.allSearchAction.SuccessUserContact(result)
                    }
                },(error=>{
                    console.log("data error is : ", error);
                    let data:any = []
                    this.allSearchAction.SuccessUserContact(data);
                }))
            })
        })
    }

    FetchFavUserContacts = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllSearchAction.FETCH_FAVOURITE_USER_CONTACT)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                let data =  {
                    SearchText: payload.SearchText,
                    Agencies: payload.Agencies,
                    Departments: payload.Departments,
                    PageCount: "page - 1",
                    ListName: "Agency Profiles"
                }
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // console.log(payload )
                // this.http.post("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/" + payload.lang +"/SearchFavoriteContact/19", data, options)
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/" + payload.lang +"/SearchFavoriteContact/19", data, options)
                .subscribe((data:any)=>{
                    if(data){
                        let result = data.json();
                        if(result.length != 0){
                            // console.log("result is : ", result);
                            this.allSearchAction.SuccessFavUserContact(result);
                        }else{
                            let data:any=[];
                            this.allSearchAction.SuccessFavUserContact(data);
                        }
                    }
                },(error=>{
                    // console.log("data error is : ", error);
                    let data:any=[];
                    this.allSearchAction.SuccessFavUserContact(data);
                }))             
            })
        })
    }
   


    FetchWorkSpace = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllSearchAction.FETCH_WORK_SPACE)
        .mergeMap(({payload}) => {
            console.log(payload);
            return new Observable(() => {
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // this.http.get("http://qocv2.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/"+payload.lang+"/GetWorkspaceHomePageWorkSpaces/"+ payload.workspacetype +"/"+ payload.searchquery +"/"+ payload.userId +"/0")
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/"+payload.lang+"/GetWorkspaceHomePageWorkSpaces/"+ payload.workspacetype +"/"+ payload.searchquery +"/"+ payload.userId +"/0")
                .subscribe((data:any) => {
                    if(data){
                        if(data._body != ""){
                            let workGroupData = data.json();
                            console.log(workGroupData);
                            this.allSearchAction.SuccessWorkSpace(workGroupData)
                        }

                    }
                })


            })
        })
    }

    FetchKnowledgeCenterDocument = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AllSearchAction.FETCH_KNOWLEDGE_CENTER_SEARCH_DOCUMENT)
        .mergeMap(({payload}) => {
            // console.log("knowledge center document search... start...")
            return new Observable(() => {

                let data = {
                    SearchText: payload.SearchText,
                    Categories: payload.Categories,
                    Tags: payload.Tags,
                    PageCount:payload.PageCount,
                    ListName:payload.ListName,
                    Language:payload.Language
                }

                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/SearchKCDocuments/"+payload.userid, data, options)
                .subscribe((data:any)=>{
                    if(data._body != ""){
                        let result = data.json();
                        console.log("Knowledge Center Search Data is : ", result);
                        this.allSearchAction.SuccessKnowledgeCenterSearch(result)
                    }else{
                        // console.log("Knowledge Center Search Data else Part working.... " );
                        let dresult:any = [];
                        this.allSearchAction.SuccessKnowledgeCenterSearch(dresult)
                    }
                },(error=>{
                    // console.log("data error is : ", error);
                    let data:any = []
                    this.allSearchAction.SuccessKnowledgeCenterSearch(data);
                }))
            })
        })
    }

}