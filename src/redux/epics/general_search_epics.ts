import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, RequestOptions, Headers } from "@angular/http";
import { AlertProvider } from "../../providers/alert-provider/alert_provider";
import { GeneralSearchsAction } from "../actions/general_search_action";
import { Events } from "ionic-angular";

@Injectable()
export class GeneralSearchEpics{
    public alldata:any;
    constructor(
        public generalsearchaction : GeneralSearchsAction, 
        private http : Http,
        public alertProvider:AlertProvider,
        public events:Events
        ){}
    /* General search */
    fetchGeneralSearchData = (action$ : ActionsObservable<any>) => {
        return action$.ofType(GeneralSearchsAction.START_GENERAL_SEARCH)
        .mergeMap(({payload}) => {
            return new Observable(() => {
               this.alldata=[];
               this.events.publish("loading:start");
               this.searchNews(payload)

            })
        })
    }

    /* Search News */
    searchNews(payload){
        let searchq={ Search:payload.searchQuery, Categories:null, Tags:null, Page:0, Language:payload.lang }
        let headers = new Headers ({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchNews", searchq, options)
        .subscribe((data:any)=>{
            if(data){
                if(data._body!=""){
                    let result = data.json();
                    if(result){
                        for(let i=0; i<result.Results.length; i++){
                            if(result.Results[i].Date.RFCDateTime){
                                /*for(let key in result.Results[i]){
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
                                }*/
                                var str = result.Results[i].Date.RFCDateTime;
                                var newsDate = new Date(str);
                                var dateString = newsDate.toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: 'numeric', hour12: true });
                                let tempdate = dateString.split(",")[0]; 
                                var date = tempdate.split(" ")[1] +" "+ tempdate.split(" ")[0] +""+ dateString.split(",")[1];
                                var time = dateString.split(",")[2];

                                result.Results[i].newsDate = date;
                                result.Results[i].newsTime = time;
                            }
                            //for type
                            result.Results[i].searchType = "news";
                            this.alldata.push(result.Results[i]);
                        }
                        this.searchEvent(payload)
                    }
                }else{ this.searchEvent(payload); }
            }
        },(error=>{ this.searchEvent(payload) }
        ))
    }


    /* Search Events */
    searchEvent(payload){
        let searchq={ Search:payload.searchQuery, Categories:null, Tags:null, Page:0, Language:payload.lang }

        let headers = new Headers ({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchEvents", searchq, options)
        .subscribe((data:any)=>{
            if(data){
                if(data._body!=""){
                    let result = data.json();
                    if(result){
                        for(let i=0; i<result.Results.length; i++){
                            if(result.Results[i].Date){
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
                            //for type
                            result.Results[i].searchType = "event";
                            this.alldata.push(result.Results[i]);
                        }
                        this.searchDocument(payload);
                    }
                }else{ this.searchDocument(payload); }
            }
        },(error=>{ this.searchDocument(payload); }
        ))
    }

    /* Search Document */
    searchDocument(payload){
        let searchq={ Search:payload.searchQuery, Categories:null, Tags:null, Page:0, Language:payload.lang }

        let headers = new Headers ({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchDocuments", searchq, options)
        .subscribe((data:any)=>{
            if(data._body !=""){
                let result = data.json();
                if(result){
                // console.log("result is : ", result);
                for(let i=0; i<result.Results.length; i++){
                    result.Results[i].searchType = "document";
                    this.alldata.push(result.Results[i]);
                }
                this.searchContact(payload)
            }else{this.searchContact(payload)}
               // console.log(this.alldata);
                
            }else{this.searchContact(payload)}
        },(error=>{
            this.searchContact(payload)
        }))
    }

    /* Search Contact */
    searchContact(payload){
            let searchq={ Search:payload.searchQuery, Categories:null, Tags:null, Page:0, Language:payload.lang }
            let headers = new Headers ({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });
            this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/motcmobileservice.svc/SearchUserContacts", searchq, options)
            .subscribe((data:any)=>{
                if(data._body != ""){
                    let result = data.json();
                    if(result){
                        for(let i=0; i<result.length; i++){
                            result[i].searchType = "contact";
                            this.alldata.push(result[i]);
                        }
                        this.searchSurvey(payload);
                    }else{this.searchSurvey(payload);}

                    // this.searchPolls(payload);
                    
                }else{/*this.searchPolls(payload);*/ this.searchSurvey(payload);}
            },(error=>{
                // this.searchPolls(payload);
                this.searchSurvey(payload);
            }))
    }

    /* Search Polls */
    // searchPolls(payload){
    //     let searchq={ Search:payload.searchQuery, Categories:null, Tags:null, Page:0, Language:payload.lang }

    //     let headers = new Headers ({ 'Content-Type': 'application/json' });
    //     let options = new RequestOptions({ headers: headers });
    //     this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/SearchPolls", searchq, options)
    //     .subscribe((data:any)=>{
    //         if(data._body != ""){
    //             let result = data.json();
    //             for(let i=0; i<result.Results.length; i++){
    //                 result.Results[i].searchType = "poll";
    //                 this.alldata.push(result.Results[i]);
    //             }
    //             this.searchSurvey(payload);
    //         }else{this.searchSurvey(payload);}
    //     },(error=>{
    //         this.searchSurvey(payload);
    //     }))
    // }

    /* Search Survey */
    searchSurvey(payload){
        let searchq={ Search:payload.searchQuery, Categories:null, Tags:null, Page:0, Language:payload.lang }

        let headers = new Headers ({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/SearchSurvey", searchq, options)
        .subscribe((data:any)=>{
            if(data._body != ""){
                let result = data.json();
                if(result){
                    if(result.Results){
                        for(let i=0; i<result.Results.length; i++){
                            result.Results[i].searchType = "survey";
                            this.alldata.push(result.Results[i]);
                        }
                        this.searchAnnouncement(payload);
                    }else{this.searchAnnouncement(payload);}

                }else{this.searchAnnouncement(payload);}

                //console.log(this.alldata);
                
            }else{this.searchAnnouncement(payload);}
        },(error=>{
            this.searchAnnouncement(payload);
        }))
    }

    /* Search Announcement */
    searchAnnouncement(payload){
        let searchq={ Search:payload.searchQuery, Categories:null, Tags:null, Page:0, Language:payload.lang }

        let headers = new Headers ({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/SearchAnnouncements", searchq, options)
        .subscribe((data:any)=>{
            if(data._body != ""){
                let result = data.json();
                if(result.Results){
                    for(let i=0; i<result.Results.length; i++){
                        result.Results[i].searchType = "announcement";
                        this.alldata.push(result.Results[i]);
                    }
                   // console.log(this.alldata);
                    this.searchWorkspace(payload);
                }else{this.searchWorkspace(payload);}

            }else{this.searchWorkspace(payload);}
        },(error=>{
            this.searchWorkspace(payload);
        }))
    }

    /* Search Workspace */
    searchWorkspace(payload){
        let searchq={ Search:payload.searchQuery, Categories:null, Tags:null, Page:0, Language:payload.lang }

        let headers = new Headers ({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/SearchWorkspaces", searchq, options)
        .subscribe((data:any)=>{
            if(data._body != ""){
                let result = data.json();
                if(result.Results){
                    for(let i=0; i<result.Results.length; i++){
                        result.Results[i].searchType = "workspace";
                        this.alldata.push(result.Results[i]);
                    }
                    this.generalsearchaction.successGeneralSearch(this.alldata);
                    this.events.publish("loading:stop");
                }else{
                    this.generalsearchaction.successGeneralSearch(this.alldata);
                    this.events.publish("loading:stop");
                }

            }else{
                this.generalsearchaction.successGeneralSearch(this.alldata);
                this.events.publish("loading:stop");
            }
        },(error=>{
            this.events.publish("loading:stop");
            this.generalsearchaction.successGeneralSearch(this.alldata)
        }))
    }



}