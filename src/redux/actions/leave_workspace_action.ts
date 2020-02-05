import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class LeaveWorkspaceAction{

    static LEAVE_WORKSPACE_FETCH = 'LEAVE_WORKSPACE_FETCH';
    static LEAVE_WORKSPACE_FETCH_SUCCESS = 'LEAVE_WORKSPACE_FETCH_SUCCESS';
    static LEAVE_WORKSPACE_FETCH_ERROR = 'LEAVE_WORKSPACE_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    leaveWorkspaceFetch(lang : string){
        this.ngRedux.dispatch({
            type : LeaveWorkspaceAction.LEAVE_WORKSPACE_FETCH,
            payload : lang
        })
    }
    leaveWorkspaceSuccess(payload){
        this.ngRedux.dispatch({
            type : LeaveWorkspaceAction.LEAVE_WORKSPACE_FETCH_SUCCESS,
            payload : payload
        })
    }
    leaveWorkspaceError(error){
        this.ngRedux.dispatch({
            type : LeaveWorkspaceAction.LEAVE_WORKSPACE_FETCH_ERROR,
            error : error
        })
    }
}