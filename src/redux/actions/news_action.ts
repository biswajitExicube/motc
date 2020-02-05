import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { NewsData } from "../core/news_session";

@Injectable()
export class NewsAction{

    static NEWS_FETCH = 'NEWS_FETCH';
    static NEWS_FETCH_SUCCESS = 'NEWS_FETCH_SUCCESS';
    static NEWS_FETCH_ERROR = 'NEWS_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    newsFetch(userdetails : any){
        this.ngRedux.dispatch({
            type : NewsAction.NEWS_FETCH,
            payload : userdetails
        })
    }
    newsSuccess(payload : NewsData){
        this.ngRedux.dispatch({
            type : NewsAction.NEWS_FETCH_SUCCESS,
            payload : payload
        })
    }
    newsError(error){
        this.ngRedux.dispatch({
            type : NewsAction.NEWS_FETCH_ERROR,
            error : error
        })
    }
}