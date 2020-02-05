import { WorkGroupData } from "../core/workgroup_session";
import { Action } from "redux";
import { ActionsObservable } from "redux-observable";
import { WorkGroupAction } from "../actions/workgroup_action";
import { state } from "@angular/core/src/animation/dsl";

const INITIAL_STATE : WorkGroupData = {
    workGroupData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function WorkGroupReducer(
    state : WorkGroupData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    WorkGroupData{
        switch(action.type){
            case WorkGroupAction.WORKGROUP_FETCH :
                return{
                    ...state,
                    workGroupData : null,
                    loading : true,
                    error : ''
                }
            case WorkGroupAction.WORKGROUP_FETCH_SUCCESS :
                return{
                    ...state,
                    workGroupData : action.payload,
                    loading : false,
                    error : ''
                }
            case WorkGroupAction.WORKGROUP_FETCH_ERROR :
                return{
                    ...state,
                    workGroupData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }