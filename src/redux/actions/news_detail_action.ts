import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { NewsData } from "../core/news_session";

@Injectable()
export class NewsDetailAction{

    static NEWS_DETAIL_FETCH = 'NEWS_DETAIL_FETCH';
    static NEWS_DETAIL_FETCH_SUCCESS = 'NEWS_DETAIL_FETCH_SUCCESS';
    static NEWS_DETAIL_FETCH_ERROR = 'NEWS_DETAIL_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    newsDetailFetch(dData){
        this.ngRedux.dispatch({
            type : NewsDetailAction.NEWS_DETAIL_FETCH,
            payload : dData
        })
    }
    newsDetailSuccess(payload : NewsData){
        this.ngRedux.dispatch({
            type : NewsDetailAction.NEWS_DETAIL_FETCH_SUCCESS,
            payload : payload
        })
    }
    newsDetailError(error){
        this.ngRedux.dispatch({
            type : NewsDetailAction.NEWS_DETAIL_FETCH_ERROR,
            error : error
        })
    }
}