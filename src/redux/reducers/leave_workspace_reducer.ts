import { LeaveWorkspace } from "../core/leave_workspace_session";
import { Action } from "redux";
import { LeaveWorkspaceAction } from "../actions/leave_workspace_action";

const INITIAL_STATE : LeaveWorkspace = {
    leaveWorkspace : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function LeaveWorkspaceReducer(
    state : LeaveWorkspace = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : LeaveWorkspace{
    switch(action.type){
        case LeaveWorkspaceAction.LEAVE_WORKSPACE_FETCH :
            return{
                ...state,
                leaveWorkspace : null,
                loading : true,
                error : ''
            }
        case LeaveWorkspaceAction.LEAVE_WORKSPACE_FETCH_SUCCESS :
            return{
                ...state,
                leaveWorkspace : action.payload,
                loading : false,
                error : ''
            }
        case LeaveWorkspaceAction.LEAVE_WORKSPACE_FETCH_ERROR : 
            return{
                ...state,
                leaveWorkspace : null,
                loading : false,
                error : action.error
            }
    }
    return state;
}