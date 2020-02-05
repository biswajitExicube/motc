import { Injectable } from "@angular/core";
import { AboutAction } from "../actions/about_action";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http } from "@angular/http";
import { AddRemoveFavAction } from "../actions/addRemoveFav_action";
import { EventsDetailActions } from "../actions/events_detail_action";
import { NewsDetailAction } from "../actions/news_detail_action";
import { KnowledgeCenterAction } from "../actions/knowledge_center_action";
import { WorkSpaceDetailAction } from "../actions/work_space_detail_action";
import { AlertProvider } from "../../providers/alert-provider/alert_provider";
import { NewsAction } from "../actions/news_action";
import { WorkspaceDocListAction } from "../actions/workspace_docList_action";

@Injectable()
export class AddRemoveFavEpics{

    public userDetails : any;

    constructor(
        public addRemoveFavAction : AddRemoveFavAction, 
        private http : Http, 
        public eventsDetailAction : EventsDetailActions,
        public newsDetailAction : NewsDetailAction,
        public KCAction : KnowledgeCenterAction,
        public alertprovider:AlertProvider,

        public workSpaceDetailAction:WorkSpaceDetailAction,
        public newsAction:NewsAction,
        public workspaceDocListAction : WorkspaceDocListAction
    ){
        let userData:any = localStorage.getItem('userData');
        this.userDetails = JSON.parse(userData);
        
    }

    addRemoveFav = (action$ : ActionsObservable<any>) => {
        return action$.ofType(AddRemoveFavAction.START_ADD_REMOVE_FAV)
        .mergeMap(({payload}) => {
            console.log(payload);

            return new Observable(() => {
                this.http.get("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/AddRemoveItemToFavourite/19/"+payload.ref+"?itemId="+payload.itemID+"&opr="+payload.opr)
                .subscribe((data:any) => {
                    console.log("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/"+payload.lang+"/AddRemoveItemToFavourite/19/"+payload.ref+"?itemId="+payload.itemID+"&opr="+payload.opr)
                    //http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/en/AddRemoveItemToFavourite/19/workspaces?itemId=88c6f68a-c62d-4a50-be9a-271da1bc2aaf&opr=false
                    
                    
                    
                    
                    console.log(data);
                    // if(data.ok == true){
                        if(data._body != ""){
                            if(data._body == 'true'){

                                if(payload.opr == true){
                                    this.alertprovider.openToast("Add to Favourite Successfully")
                                }else{
                                    this.alertprovider.openToast("Remove to Favourite Successfully")
                                }

                                let aboutData = data.json();
                                // console.log(aboutData)
                                //for media center event [DONE]
                                if(payload.ref == 'events'){
                                    let userID = this.userDetails.ID;
                                    this.eventsDetailAction.eventsDetailFetch({lang : payload.lang, id : payload.itemID,userID:userID});
                                    
                                //for media center News [DONE]
                                }else if(payload.ref == 'news'){
                                    let userID = this.userDetails.ID;
                                    this.newsDetailAction.newsDetailFetch({name: payload.lang, id:payload.itemID,userID:userID});
                                
                                }else if(payload.ref == 'documents'){
                                    let localstorageData = this.userDetails.ID;
                                    if(localstorageData){
                                        this.KCAction.bestPracticeFetch({lang: payload.lang, userid: localstorageData});
                                        this.KCAction.othersFetch({lang: payload.lang, userid: localstorageData});
                                        this.KCAction.politicsFetch({lang: payload.lang, userid: localstorageData});
                                    }            
                                //for Workspace details    [DONE]                
                                }else if(payload.ref == 'workspaces'){
                                    let userID = this.userDetails.ID;
                                    let param :any = {
                                        lang:payload.lang,
                                        userId:userID,
                                        workSpaceId:payload.itemID
                                      }
                                    // this.workSpaceDetailAction.workSpaceDetailFetch(param)
                                    if(payload.page == 'WSEvents'){
                                        this.workspaceDocListAction.workspaceDocListFetch(param)
                                        // console.log("this.workspaceDocListAction.workspaceDocListFetch(param)");
                                    }else{
                                        this.workSpaceDetailAction.workSpaceDetailFetch(param);
                                    }
                                }else if(payload.ref == 'workspaceEvent'){
                                    console.log("call")
                                    let userID = this.userDetails.ID;
                                    let param :any = {
                                        userId:userID,
                                        workspaceId:payload.itemID,
                                        lang:payload.lang
                                    }                                      
                                    this.workspaceDocListAction.workspaceDocListFetch(param)
                                }


                               
                            }else{this.alertprovider.openToast("Internal issue appering, please try letter");}



                            // let result:any = "success"
                            // this.addRemoveFavAction.successAddRemoveFav(result);
                        }else{
                            this.alertprovider.openToast("Internal issue appering, please try letter")
                        }
                    // }
                })
            })
        })
    }
}
// http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileservice.svc/en/AddRemoveItemToFavourite/19/documents?itemId=en/KnowledgeCenter/Best%20Practices/[Osama%20Zayan]Senior%20Software%20Developer.pdf&opr=true