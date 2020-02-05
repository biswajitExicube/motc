import { Injectable } from "@angular/core";
import { NgRedux } from "@angular-redux/store";
import { IAppState } from "../core/store_model";
import { WorkSpaceUserTask } from "../core/workspace_user_session";

@Injectable()
export class WorkspaceUserAction{

    static FETCH_WORKSPACE_USER_TASK = 'FETCH_WORKSPACE_USER_TASK';
    static SUCCESS_WORKSPACE_USER_TASK = 'FETCH_WORKSPACE_USER_TASK';
    static FAILED_WORKSPACE_USER_TASK = 'FETCH_WORKSPACE_USER_TASK';

    constructor(private ngRedux : NgRedux<IAppState>){}
    
    fetchWorkspaceTask(taskdata){
        this.ngRedux.dispatch({
            type : WorkspaceUserAction.FETCH_WORKSPACE_USER_TASK,
            payload : taskdata
        })
    }
    successWorkspaceTask(payload : WorkSpaceUserTask){
        this.ngRedux.dispatch({
            type : WorkspaceUserAction.SUCCESS_WORKSPACE_USER_TASK,
            payload : payload
        })
    }
    errorWorkspaceTask(error){
        this.ngRedux.dispatch({
            type : WorkspaceUserAction.FAILED_WORKSPACE_USER_TASK,
            error : error
        })
    }
}