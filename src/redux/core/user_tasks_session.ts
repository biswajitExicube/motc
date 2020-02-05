export interface UserTasksData{
    taskData : UserTasks;
    taskDetail : UserTasksDetail;
    loading : boolean;
    error : string;
}

export interface UserTasks{
    userTasks : any;
    loading : boolean;
    error : string;
}

export interface UserTasksDetail{
    userTasksDetail : any;
    loading : boolean;
    error : string;
}