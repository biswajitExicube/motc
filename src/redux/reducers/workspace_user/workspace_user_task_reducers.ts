import { Action } from "redux";
import { WorkSpaceUserTask } from "../../core/workspace_user_session";
import { WorkspaceUserAction } from "../../actions/workspace_user_action";

const INITIAL_STATE : WorkSpaceUserTask = {
    workspaceUserTaskData : null,
    loading : false,
    error : ''
}
type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function WorkspaceUserTaskReducer(
    state : WorkSpaceUserTask = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>) :
    WorkSpaceUserTask{
        switch(action.type){
            case WorkspaceUserAction.FETCH_WORKSPACE_USER_TASK:
                return{
                    ...state,
                    workspaceUserTaskData : null,
                    loading : true,
                    error : ''
                }
            case WorkspaceUserAction.SUCCESS_WORKSPACE_USER_TASK:
                return {
                    ...state,
                    workspaceUserTaskData : action.payload,
                    loading : false,
                    error : ''
                }
            case WorkspaceUserAction.FAILED_WORKSPACE_USER_TASK:
                return{
                    ...state,
                    workspaceUserTaskData : null,
                    loading : false,
                    error : action.error
                }
        }
        return state;
    }
