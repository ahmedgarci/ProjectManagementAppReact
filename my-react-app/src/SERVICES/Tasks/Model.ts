
export type CreateTaskRequest={
    userId?:string,
    task?:string,
    taskStartingDate?:string,
    taskEndingDate?:string,
    parentTaskId?:string
}

export type UserUrgentTasksResponse = {
    task:string;
    startingDate:Date;
    endingDate:Date;
}

export type TaskNode = {
    taskId: string;
    task: string;
    assignedToUserName:string,
    taskStartingDate: string;
    taskEndingDate: string;
    children?: TaskNode[];
    stage:string
}

export type ProjectContributorResponse = {
    publicId:string;
    userEmail:string;
    jobPos:string;
}
