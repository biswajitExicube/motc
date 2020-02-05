import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class WorkspaceDocListAction{

    static WORKSPACE_DOCLIST_FETCH = 'WORKSPACE_DOCLIST_FETCH';
    static WORKSPACE_DOCLIST_FETCH_SUCCESS = 'WORKSPACE_DOCLIST_FETCH_SUCCESS';
    static WORKSPACE_DOCLIST_FETCH_ERROR = 'WORKSPACE_DOCLIST_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    workspaceDocListFetch(lang : string){
        this.ngRedux.dispatch({
            type : WorkspaceDocListAction.WORKSPACE_DOCLIST_FETCH,
            payload : lang
        })
    }
    workspaceDocListSuccess(payload){
        this.ngRedux.dispatch({
            type : WorkspaceDocListAction.WORKSPACE_DOCLIST_FETCH_SUCCESS,
            payload : payload
        })
    }
    workspaceDocListError(error){
        this.ngRedux.dispatch({
            type : WorkspaceDocListAction.WORKSPACE_DOCLIST_FETCH_ERROR,
            error : error
        })
    }
}