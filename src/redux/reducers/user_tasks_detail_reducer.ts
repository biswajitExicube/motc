import { UserTasksData } from "../core/user_tasks_session";
import { Action } from "redux";
import { UserTasksAction } from "../actions/user_tasks_action";

const INITIAL_STATE : UserTasksData = {
    taskData : null,
    taskDetail : null,
    loading : false,
    error : ''
}

type Payload = any;
type Error = any;

export interface ActionWithPayload<T,E> extends Action{
    payload? : T,
    error? : E
}

export function UserTasksDetailReducer(
    state : UserTasksData = INITIAL_STATE,
    action : ActionWithPayload<Payload,Error>
) : UserTasksData{
        switch(action.type){
            case UserTasksAction.USER_TASKS_DETAIL_FETCH :
                return{
                    ...state,
                    taskData : null,
                    taskDetail : null,
                    loading : true,
                    error : ''
                }
            case UserTasksAction.USER_TASKS_DETAIL_FETCH_SUCCESS :
                return{
                    ...state,
                    taskData : null,
                    taskDetail : action.payload,
                    loading : false,
                    error : ''
                }
            case UserTasksAction.USER_TASKS_DETAIL_FETCH_ERROR :
                return{
                    ...state,
                    taskData : null,
                    taskDetail : null,
                    loading : false,
                    error : action.error
                }
        }
    return state;
}