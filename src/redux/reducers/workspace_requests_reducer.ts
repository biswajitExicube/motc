import { Action } from "redux";
import { WorkspaceRequestData } from "../core/workspace_requests_session";
import { WorkspaceRequestdataAction } from "../actions/workspace_requests_action";


const INITIAL_STATE : WorkspaceRequestData = {
    workspaceRequestData : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : any,
    error? : any
}

export function WorkspaceRequestsdataReducer(
    state : WorkspaceRequestData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : WorkspaceRequestData{
    switch(action.type){
        case WorkspaceRequestdataAction.FETCH_WORKSPACE_REQUEST :
            return{
                ...state,
                workspaceRequestData : null,
                loading : true,
                error : ''
            }
        case WorkspaceRequestdataAction.SUCCESS_WORKSPACE_REQUEST :
            return{
                ...state,
                workspaceRequestData : action.payload,
                loading : false,
                error : ''
            }
        case WorkspaceRequestdataAction.FAILED_WORKSPACE_REQUEST :
            return{
                ...state,
                workspaceRequestData : null,
                loading : false,
                error : action.error
            }
    }
    return state;
}