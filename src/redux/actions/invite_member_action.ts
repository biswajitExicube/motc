import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../core/store_model';

@Injectable()
export class InvitememberAction {
    static INVITE_MEMBER_START = 'HOME_FETCH';
    static INVITE_MEMBER_FINISHED = 'HOME_FETCH_SUCCESS';

    constructor(private ngRedux : NgRedux<IAppState>){}

    inviteMemberStart(userdetails:any){
        this.ngRedux.dispatch({
            type : InvitememberAction.INVITE_MEMBER_START,
            payload : userdetails
        })
    };
    inviteMemberFinished(payload : any){
        this.ngRedux.dispatch({
            type : InvitememberAction.INVITE_MEMBER_FINISHED,
            payload : payload
        })
    };
}