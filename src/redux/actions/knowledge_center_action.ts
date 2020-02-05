import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class KnowledgeCenterAction{
    static KNOWLEDGE_CENTER_POLITICS_FETCH = 'KNOWLEDGE_CENTER_POLITICS_FETCH';
    static KNOWLEDGE_CENTER_POLITICS_FETCH_SUCCESS = 'KNOWLEDGE_CENTER_POLITICS_FETCH_SUCCESS';
    static KNOWLEDGE_CENTER_POLITICS_FETCH_ERROR = 'KNOWLEDGE_CENTER_POLITICS_FETCH_ERROR';

    static KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH = 'KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH';
    static KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH_SUCCESS = 'KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH_SUCCESS';
    static KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH_ERROR = 'KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH_ERROR';

    static KNOWLEDGE_CENTER_OTHERS_FETCH = 'KNOWLEDGE_CENTER_OTHERS_FETCH';
    static KNOWLEDGE_CENTER_OTHERS_FETCH_SUCCESS = 'KNOWLEDGE_CENTER_OTHERS_FETCH_SUCCESS';
    static KNOWLEDGE_CENTER_OTHERS_FETCH_ERROR = 'KNOWLEDGE_CENTER_OTHERS_FETCH_ERROR';

    static FETCH_OTHER_KNOWLEDGE_CENTER_LIST = 'FETCH_OTHER_KNOWLEDGE_CENTER_LIST';
    static SUCCESS_OTHER_KNOWLEDGE_CENTER_LIST = 'SUCCESS_OTHER_KNOWLEDGE_CENTER_LIST';
    static FAILED_OTHER_KNOWLEDGE_CENTER_LIST = 'FAILED_OTHER_KNOWLEDGE_CENTER_LIST';

    constructor(public ngRedux : NgRedux<IAppState>){}

    /* Politics knowledge center */
    politicsFetch(userdetails:any){
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.KNOWLEDGE_CENTER_POLITICS_FETCH,
            payload : userdetails
        })
    }
    politicsSuccess(payload){
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.KNOWLEDGE_CENTER_POLITICS_FETCH_SUCCESS,
            payload : payload
        })
    }
    piliticsError(error){
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.KNOWLEDGE_CENTER_POLITICS_FETCH_ERROR,
            error : error
        })
    }
    /* Politics knowledge center */



    /* Best practice knowledge center */
    bestPracticeFetch(userdetails : any){
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH,
            payload : userdetails
        })
    }
    bestPracticeSuccess(payload){
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH_SUCCESS,
            payload : payload
        })
    }
    bestPracticeError(error){
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.KNOWLEDGE_CENTER_BEST_PRACTICE_FETCH_ERROR,
            error : error
        })
    }
    /* Best practice knowledge center */


    
    /* Other knowledge center catagory list */
    othersFetch(userdetails : any){
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.KNOWLEDGE_CENTER_OTHERS_FETCH,
            payload : userdetails
        })
    }
    othersSuccess(payload){
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.KNOWLEDGE_CENTER_OTHERS_FETCH_SUCCESS,
            payload : payload
        })
    }
    othersError(error){
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.KNOWLEDGE_CENTER_OTHERS_FETCH_ERROR,
            error : error
        })
    }
    /* Other knowledge center catagory list */



    /* Other knowledge center list details */
    othersKnowledgeCenterList(userdetails : any){
        console.log(userdetails);
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.FETCH_OTHER_KNOWLEDGE_CENTER_LIST,
            payload : userdetails
        })
    }
    othersKnowledgeCenterListSuccess(payload){
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.SUCCESS_OTHER_KNOWLEDGE_CENTER_LIST,
            payload : payload
        })
    }
    othersKnowledgeCenterListError(error){
        this.ngRedux.dispatch({
            type : KnowledgeCenterAction.FAILED_OTHER_KNOWLEDGE_CENTER_LIST,
            error : error
        })
    }
    /* Other knowledge center list details */
}