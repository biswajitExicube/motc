import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { AddRemoveFavData } from "../core/addRemoveFav_session";
// import { AboutData } from "../core/about_session";

@Injectable()
export class AddRemoveFavAction{

    static START_ADD_REMOVE_FAV = 'START_ADD_REMOVE_FAV';
    static SUCCESS_ADD_REMOVE_FAV = 'SUCCESS_ADD_REMOVE_FAV';
    static FAILED_ADD_REMOVE_FAV = 'FAILED_ADD_REMOVE_FAV';

    constructor(private ngRedux : NgRedux<IAppState>){}
    
    startAddRemoveFav(data:any){
        this.ngRedux.dispatch({
            type : AddRemoveFavAction.START_ADD_REMOVE_FAV,
            payload : data
        })
    }
    successAddRemoveFav(payload : AddRemoveFavData){
        this.ngRedux.dispatch({
            type : AddRemoveFavAction.SUCCESS_ADD_REMOVE_FAV,
            payload : payload
        })
    }
    failedAddRemoveFav(error){
        this.ngRedux.dispatch({
            type : AddRemoveFavAction.FAILED_ADD_REMOVE_FAV,
            error : error
        })
    }
}