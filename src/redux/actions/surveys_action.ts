import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class SurveysAction{

    //Available Survey
    static SURVEYS_AVIALABLE_FETCH = 'SURVEYS_AVIALABLE_FETCH';
    static SURVEYS_AVIALABLE_FETCH_SUCCESS = 'SURVEYS_AVIALABLE_FETCH_SUCCESS';
    static SURVEYS_AVIALABLE_FETCH_ERROR = 'SURVEYS_AVIALABLE_FETCH_ERROR';

    //Old Survey
    static SURVEYS_OLD_FETCH = 'SURVEYS_OLD_FETCH';
    static SURVEYS_OLD_FETCH_SUCCESS = 'SURVEYS_OLD_FETCH_SUCCESS';
    static SURVEYS_OLD_FETCH_ERROR = 'SURVEYS_OLD_FETCH_ERROR';

    //Submit Survey
    static SUBMIT_SURVEY = 'SUBMIT_SURVEY';
    




    constructor(public ngRedux : NgRedux<IAppState>){}

    //Available Survey
    surveysNewFetch(lang : string){
        this.ngRedux.dispatch({
            type : SurveysAction.SURVEYS_AVIALABLE_FETCH,
            payload : lang
        })
    }
    surveysNewSuccess(payload){
        this.ngRedux.dispatch({
            type : SurveysAction.SURVEYS_AVIALABLE_FETCH_SUCCESS,
            payload : payload
        })
    }
    surveysNewError(error){
        this.ngRedux.dispatch({
            type : SurveysAction.SURVEYS_AVIALABLE_FETCH_ERROR,
            error : error
        })
    }


    //Old Survey
    surveysOldFetch(lang : string){
        this.ngRedux.dispatch({
            type : SurveysAction.SURVEYS_OLD_FETCH,
            payload : lang
        })
    }
    surveysOldSuccess(payload){
        this.ngRedux.dispatch({
            type : SurveysAction.SURVEYS_OLD_FETCH_SUCCESS,
            payload : payload
        })
    }
    surveysOldError(error){
        this.ngRedux.dispatch({
            type : SurveysAction.SURVEYS_OLD_FETCH_ERROR,
            error : error
        })
    }

    //Submit Survey
    submitSurvey(surveyData : any){
        this.ngRedux.dispatch({
            type : SurveysAction.SUBMIT_SURVEY,
            payload : surveyData
        })
    }



}