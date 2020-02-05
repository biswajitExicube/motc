import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class FavUsersAction{
    static FAV_USERS_FETCH = 'FAV_USERS_FETCH';
    static FAV_USERS_FETCH_SUCCESS = 'FAV_USERS_FETCH_SUCCESS';
    static FAV_USERS_FETCH_ERROR = 'FAV_USERS_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    favUsersFetch(userdetails:any){
        this.ngRedux.dispatch({
            type : FavUsersAction.FAV_USERS_FETCH,
            payload : userdetails
        })
    }
    favUsersSuccess(payload){
        this.ngRedux.dispatch({
            type : FavUsersAction.FAV_USERS_FETCH_SUCCESS,
            payload : payload
        })
    }
    favUsersError(error){
        this.ngRedux.dispatch({
            type : FavUsersAction.FAV_USERS_FETCH_ERROR,
            error : error
        })
    }
}