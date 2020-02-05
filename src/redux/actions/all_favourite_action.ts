import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { AboutData } from "../core/about_session";

@Injectable()
export class AllFavouriteAction{

    static FETCH_FAV_NEWS = 'FETCH_FAV_NEWS';
    static SUCCESS_FAV_NEWS = 'SUCCESS_FAV_NEWS';

    static FETCH_FAV_EVENTS = 'FETCH_FAV_EVENTS';
    static SUCCESS_FAV_EVENTS = 'SUCCESS_FAV_EVENTS';

    static FETCH_FAV_WORKSPACE = 'FETCH_FAV_WORKSPACE';
    static SUCCESS_FAV_WORKSPACE = 'SUCCESS_FAV_WORKSPACE';

    static FETCH_FAV_DOCUMENT = 'FETCH_FAV_DOCUMENT';
    static SUCCESS_FAV_DOCUMENT = 'SUCCESS_FAV_DOCUMENT';

    

    constructor(private ngRedux : NgRedux<IAppState>){}
    
    /* Favourite News */ 
    fetchFavNews(paramData : any){
        this.ngRedux.dispatch({
            type : AllFavouriteAction.FETCH_FAV_NEWS,  
            payload : paramData
        })
    }
    successFavNews(paramData : any){
        this.ngRedux.dispatch({
            type : AllFavouriteAction.SUCCESS_FAV_NEWS, 
            payload : paramData
        })
    }

    /* Favourite Events */ 
    fetchFavEvents(paramData : any){
        this.ngRedux.dispatch({
            type : AllFavouriteAction.FETCH_FAV_EVENTS,  
            payload : paramData
        })
    }
    successFavEvents(paramData : any){
        this.ngRedux.dispatch({
            type : AllFavouriteAction. SUCCESS_FAV_EVENTS, 
            payload : paramData
        })
    }

    /* Favourite Workspace */ 
    fetchFavWorkspace(paramData : any){
        this.ngRedux.dispatch({
            type : AllFavouriteAction.FETCH_FAV_WORKSPACE,  
            payload : paramData
        })
    }
    successFavWorkspace(paramData : any){
        this.ngRedux.dispatch({
            type : AllFavouriteAction.SUCCESS_FAV_WORKSPACE,
            payload : paramData
        })
    }

    /* Favourite Documents */ 
    fetchFavDocuments(paramData : any){
        this.ngRedux.dispatch({
            type : AllFavouriteAction.FETCH_FAV_DOCUMENT,
            payload : paramData
        })
    }
    successFavDocuments(paramData : any){
        this.ngRedux.dispatch({
            type : AllFavouriteAction.SUCCESS_FAV_DOCUMENT, 
            payload : paramData
        })
    }
}