import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { AboutData } from "../core/about_session";

@Injectable()
export class CreateWorkspaceAction{

    static START_CREATE_WORKSPACE = 'START_CREATE_WORKSPACE';
    static SUCCESS_CREATE_WORKSPACE = 'SUCCESS_CREATE_WORKSPACE';
    static FAILED_CREATE_WORKSPACE = 'FAILED_CREATE_WORKSPACE';

    constructor(private ngRedux : NgRedux<IAppState>){}
    
    createWorkspace(data:any){
        this.ngRedux.dispatch({
            type : CreateWorkspaceAction.START_CREATE_WORKSPACE,
            payload : data
        })
    }
    successWorkspace(payload : AboutData){
        this.ngRedux.dispatch({
            type : CreateWorkspaceAction.SUCCESS_CREATE_WORKSPACE,
            payload : payload
        })
    }
    failedWorkspace(error){
        this.ngRedux.dispatch({
            type : CreateWorkspaceAction.FAILED_CREATE_WORKSPACE,
            error : error
        })
    }
}