import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../core/store_model';
import { HomeData } from '../core/home_session';

@Injectable()
export class HomeActions {
    static HOME_FETCH = 'HOME_FETCH';
    static HOME_FETCH_SUCCESS = 'HOME_FETCH_SUCCESS';
    static HOME_FETCH_FAILED = 'HOME_FETCH_FAILED';

    constructor(private ngRedux : NgRedux<IAppState>){}

    homeFetch(userdetails:any){
        this.ngRedux.dispatch({
            type : HomeActions.HOME_FETCH,
            payload : userdetails
        })
    };
    homeFetchSuccess(payload : HomeData){
        this.ngRedux.dispatch({
            type : HomeActions.HOME_FETCH_SUCCESS,
            payload : payload
        })
    };
    homeFetchFailed(error){
        this.ngRedux.dispatch({
            type : HomeActions.HOME_FETCH_FAILED,
            error : error
        })
    }
}