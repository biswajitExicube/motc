import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../core/store_model';
import { FavWorkspaceData } from '../core/favWorkSpace_session';

@Injectable()
export class FavWorkspaceActions {
    static FAVWORKSPACE_FETCH = 'FAVWORKSPACE_FETCH';
    static FAVWORKSPACE_FETCH_SUCCESS = 'FAVWORKSPACE_FETCH_SUCCESS';
    static FAVWORKSPACE_FETCH_FAILED = 'FAVWORKSPACE_FETCH_FAILED';

    constructor(private ngRedux : NgRedux<IAppState>){}

    favWorkspaceFetch(favData){
        this.ngRedux.dispatch({
            type : FavWorkspaceActions.FAVWORKSPACE_FETCH,
            payload : favData
        })
    };
    favWorkspaceSuccess(payload: FavWorkspaceData){
        this.ngRedux.dispatch({
            type : FavWorkspaceActions.FAVWORKSPACE_FETCH_SUCCESS,
            payload : payload
        })
    };
    favWorkspaceError(error){
        this.ngRedux.dispatch({
            type : FavWorkspaceActions.FAVWORKSPACE_FETCH_FAILED,
            error : error
        })
    };
}