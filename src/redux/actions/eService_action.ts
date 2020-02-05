import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { EServiceData, ESIndividual, ESCompanies, ESOthers } from "../core/eService_session";

@Injectable()
export class EServiceAction{

    static ESERVICE_FETCH = 'ESERVICE_FETCH';
    static ESERVICE_FETCH_SUCCESS = 'ESERVICE_FETCH_SUCCESS';
    static ESERVICE_FETCH_ERROR = 'ESERVICE_FETCH_ERROR';

    static ESERVICE_INDIVIDUAL_FETCH = 'ESERVICE_INDIVIDUAL_FETCH';
    static ESERVICE_INDIVIDUAL_FETCH_SUCCESS = 'ESERVICE_INDIVIDUAL_FETCH_SUCCESS';
    static ESERVICE_INDIVIDUAL_FETCH_ERROR = 'ESERVICE_INDIVIDUAL_FETCH_ERROR';

    static ESERVICE_COMPANIES_FETCH = 'ESERVICE_COMPANIES_FETCH';
    static ESERVICE_COMPANIES_FETCH_SUCCESS = 'ESERVICE_COMPANIES_FETCH_SUCCESS';
    static ESERVICE_COMPANIES_FETCH_ERROR = 'ESERVICE_COMPANIES_FETCH_ERROR';

    static ESERVICE_OTHERS_FETCH = 'ESERVICE_OTHERS_FETCH';
    static ESERVICE_OTHERS_FETCH_SUCCESS = 'ESERVICE_OTHERS_FETCH_SUCCESS';
    static ESERVICE_OTHERS_FETCH_ERROR = 'ESERVICE_OTHERS_FETCH_ERROR';

    constructor(public ngRedux : NgRedux<IAppState>){}

    eServiceFetch(fData){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_FETCH,
            payload : fData
        })
    }
    eServiceSuccess(payload : EServiceData){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_FETCH_SUCCESS,
            payload : payload
        })
    }
    eServiceError(error){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_FETCH_ERROR,
            error : error
        })
    }


    ESIndividualFetch(fData){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_INDIVIDUAL_FETCH,
            payload : fData
        })
    }
    ESIndividualSuccess(payload : ESIndividual){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_INDIVIDUAL_FETCH_SUCCESS,
            payload : payload
        })
    }
    ESIndividualError(error){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_INDIVIDUAL_FETCH_ERROR,
            error : error
        })
    }


    ESCompaniesFetch(fData){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_COMPANIES_FETCH,
            payload : fData
        })
    }
    ESCompaniesSuccess(payload : ESCompanies){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_COMPANIES_FETCH_SUCCESS,
            payload : payload
        })
    }
    ESCompaniesError(error){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_COMPANIES_FETCH_ERROR,
            error : error
        })
    }

    ESOthersFetch(fData){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_OTHERS_FETCH,
            payload : fData
        })
    }
    ESOthersSuccess(payload : ESOthers){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_OTHERS_FETCH_SUCCESS,
            payload : payload
        })
    }
    ESOthersError(error){
        this.ngRedux.dispatch({
            type : EServiceAction.ESERVICE_OTHERS_FETCH_ERROR,
            error : error
        })
    }
}