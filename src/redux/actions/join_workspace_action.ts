import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class JoinWorkspaceAction{

    static JOIN_WORKSPACE_FETCH = 'JOIN_WORKSPACE_FETCH';
    static JOIN_WORKSPACE_FETCH_SUCCESS = 'JOIN_WORKSPACE_FETCH_SUCCESS';
    static JOIN_WORKSPACE_FETCH_ERROR = 'JOIN_WORKSPACE_FETCH_ERROR';

    constructor(public ngRedux: NgRedux<IAppState>){}

    joinWorkspaceFetch(lang : string){
        this.ngRedux.dispatch({
            type : JoinWorkspaceAction.JOIN_WORKSPACE_FETCH,
            payload : lang
        })
    }

    joinWorkspaceSuccess(payload){
        this.ngRedux.dispatch({
            type : JoinWorkspaceAction.JOIN_WORKSPACE_FETCH_SUCCESS,
            payload : payload
        })
    }

    joinWorkspaceError(error){
        this.ngRedux.dispatch({
            type : JoinWorkspaceAction.JOIN_WORKSPACE_FETCH_ERROR,
            error : error
        })
    }
}