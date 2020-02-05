import { JoinWrokspace } from "../core/join_workspace_session";
import { Action } from "redux";
import { JoinWorkspaceAction } from "../actions/join_workspace_action";

const INITIAL_STATE : JoinWrokspace = {
    joinWorkspace : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function JoinWorkspaceReducer(
    state : JoinWrokspace = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : JoinWrokspace{
    switch(action.type){
        case JoinWorkspaceAction.JOIN_WORKSPACE_FETCH :
            return{
                ...state,
                joinWorkspace : null,
                loading : true,
                error : ''
            }
        case JoinWorkspaceAction.JOIN_WORKSPACE_FETCH_SUCCESS :
            return{
                ...state,
                joinWorkspace : action.payload,
                loading : false,
                error : ''
            }
        case JoinWorkspaceAction.JOIN_WORKSPACE_FETCH_ERROR :
            return{
                ...state,
                joinWorkspace : null,
                loading : false,
                error : action.error
            }
    }
    return state;
}