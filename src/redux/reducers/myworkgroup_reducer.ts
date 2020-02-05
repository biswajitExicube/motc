import { myWorkGroupData } from "../core/workgroup_session";
import { Action } from "redux";
import { ActionsObservable } from "redux-observable";
import { WorkGroupAction } from "../actions/workgroup_action";
import { state } from "@angular/core/src/animation/dsl";

const INITIAL_STATE : myWorkGroupData = {
    myworkGroupData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function myWorkGroupReducer(
    state : myWorkGroupData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    myWorkGroupData{
        switch(action.type){
            case WorkGroupAction.MY_WORKGROUP_FETCH :
                return{
                    ...state,
                    myworkGroupData : null,
                    loading : true,
                    error : ''
                }
            case WorkGroupAction.MY_WORKGROUP_FETCH_SUCCESS :
                return{
                    ...state,
                    myworkGroupData : action.payload,
                    loading : false,
                    error : ''
                }
            case WorkGroupAction.MY_WORKGROUP_FETCH_ERROR :
                return{
                    ...state,
                    myworkGroupData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }