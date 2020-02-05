import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";

@Injectable()
export class UserTasksAction{
    /* Workspace Tasks fetch */
    static WORKSPACE_TASKS_FETCH = 'WORKSPACE_TASKS_FETCH';
    /* All Tasks/ User Tasks fetch */
    static USER_TASKS_FETCH = 'USER_TASKS_FETCH';
    static USER_TASKS_FETCH_SUCCESS = 'USER_TASKS_FETCH_SUCCESS';
    static USER_TASKS_FETCH_ERROR = 'USER_TASKS_FETCH_ERROR';

    static USER_TASKS_DETAIL_FETCH = 'USER_TASKS_DETAIL_FETCH';
    static USER_TASKS_DETAIL_FETCH_SUCCESS = 'USER_TASKS_DETAIL_FETCH_SUCCESS';
    static USER_TASKS_DETAIL_FETCH_ERROR = 'USER_TASKS_DETAIL_FETCH_ERROR';

    //Submit Tasks
    static SUBMIT_TASKS = 'SUBMIT_TASKS'


    constructor(public ngRedux : NgRedux<IAppState>){}
    //Workspace User Task
    workspaceUserTasks(details : any){
        this.ngRedux.dispatch({
            type : UserTasksAction.WORKSPACE_TASKS_FETCH,
            payload : details
        })
    }

    //All Tasks
    allTasks(details : any){
        this.ngRedux.dispatch({
            type : UserTasksAction.USER_TASKS_FETCH,
            payload : details
        })
    }
    userTasksSuccess(payload){
        this.ngRedux.dispatch({
            type : UserTasksAction.USER_TASKS_FETCH_SUCCESS,
            payload : payload
        })
    }
    userTasksError(error){
        this.ngRedux.dispatch({
            type : UserTasksAction.USER_TASKS_FETCH_ERROR,
            error : error
        })
    }

    

    userTasksDetailFetch(tasksD){
        this.ngRedux.dispatch({
            type : UserTasksAction.USER_TASKS_DETAIL_FETCH,
            payload : tasksD
        })
    }
    userTasksDetailSuccess(payload){
        this.ngRedux.dispatch({
            type : UserTasksAction.USER_TASKS_DETAIL_FETCH_SUCCESS,
            payload : payload
        })
    }
    userTasksDetailError(error){
        this.ngRedux.dispatch({
            type : UserTasksAction.USER_TASKS_DETAIL_FETCH_ERROR,
            error : error
        })
    }


    //Submit Tasks function
    submittask(data:any){
        this.ngRedux.dispatch({
            type : UserTasksAction.SUBMIT_TASKS,
            payload : data
        })
    }
}