import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { AboutData } from "../core/about_session";

@Injectable()
export class AboutAction{

    static ABOUT_FETCH = 'ABOUT_FETCH';
    static ABOUT_FETCH_SUCCESS = 'ABOUT_FETCH_SUCCESS';
    static ABOUT_FETCH_ERROR = 'ABOUT_FETCH_ERROR';

    constructor(private ngRedux : NgRedux<IAppState>){}
    
    aboutDataFetch(lang : string){
        this.ngRedux.dispatch({
            type : AboutAction.ABOUT_FETCH,
            payload : lang
        })
    }
    aboutDataSuccess(payload : AboutData){
        this.ngRedux.dispatch({
            type : AboutAction.ABOUT_FETCH_SUCCESS,
            payload : payload
        })
    }
    aboutDataError(error){
        this.ngRedux.dispatch({
            type : AboutAction.ABOUT_FETCH_ERROR,
            error : error
        })
    }
}