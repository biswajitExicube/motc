import { Injectable } from "@angular/core";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Http, RequestOptions, Headers } from "@angular/http";
import { CreateWorkspaceAction } from "../actions/create_workspace_action";
import { AlertProvider } from "../../providers/alert-provider/alert_provider";
import { NavController, Events } from "ionic-angular";

@Injectable()
export class CreateWorkspaceEpics{

    constructor(
        public createworkspaceaction : CreateWorkspaceAction, 
        private http : Http,
        public AlertProvider:AlertProvider,
        public event:Events
    ){}

    CreateWorkspace = (action$ : ActionsObservable<any>) => {
        return action$.ofType(CreateWorkspaceAction.START_CREATE_WORKSPACE)
        .mergeMap(({payload}) => {
            return new Observable(() => {
                let headers = new Headers ({ 'Content-Type': 'application/json' });
                let options = new RequestOptions({ headers: headers });
                // this.http.post("http://qocv2.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/CreateWorkspace", payload, options)
                this.http.post("http://sp2016adv.westeurope.cloudapp.azure.com:2003/MOTCMobileService.svc/CreateWorkspace", payload, options)
                .subscribe((data:any)=>{
                    if(data){
                        // if(data._body){}
                        let result = data.json();
                        if(result == false){
                            if(payload.Kind){
                                this.AlertProvider.openAlert("Can not create Project right now",1000);
                            }else{
                                this.AlertProvider.openAlert("Can not create Work Group right now",1000);
                            }
                        }else{
                            this.AlertProvider.openAlert("Successfully Created",1000);
                            setTimeout(() => {
                                this.event.publish('location:back')
                            }, 2000);
                            
                        }
                        // console.log("result is : ", data);
                        // this.allSearchAction.SuccessUserContact(result)
                    }
                },(error=>{
                    // console.log("data error is : ", error);
                    let data:any = []
                    // this.allSearchAction.SuccessUserContact(data);
                }))
            })
        })

    }
}