import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../core/store_model';
import { HomeData } from '../core/home_session';

@Injectable()
export class WorkspaceRequestdataAction {
    static FETCH_WORKSPACE_REQUEST = 'FETCH_WORKSPACE_REQUEST';
    static SUCCESS_WORKSPACE_REQUEST = 'SUCCESS_WORKSPACE_REQUEST';
    static FAILED_WORKSPACE_REQUEST = 'FAILED_WORKSPACE_REQUEST';

    constructor(private ngRedux : NgRedux<IAppState>){}

    fetchWorkspaceRequestdata(workspaceId:any){
        this.ngRedux.dispatch({
            type : WorkspaceRequestdataAction.FETCH_WORKSPACE_REQUEST,
            payload : workspaceId
        })
    };
    successWorkspaceRequestdata(payload : HomeData){
        this.ngRedux.dispatch({
            type : WorkspaceRequestdataAction.SUCCESS_WORKSPACE_REQUEST,
            payload : payload
        })
    };
    failedWorkspaceRequestdata(error){
        this.ngRedux.dispatch({
            type : WorkspaceRequestdataAction.FAILED_WORKSPACE_REQUEST,
            error : error
        })
    }
}