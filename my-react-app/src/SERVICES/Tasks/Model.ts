// {
//     "taskVo":{"task":"Implementing Auth Service "},
//     "projectPublicIdVo":{"projectPublicId":"c1c13d10-8e7a-4162-90df-ea1e63408200"},
//     "userId":"8e8eb51b-fba1-4692-8f9b-7368107580f3",
//     "taskDateVo":{"startingDate":"2025-08-12","endingDate":"2026-02-10"},
//     "parentTaskPublicIdVo":{"parentTaskPublicId":"89b908a9-7e2a-4865-a4d6-87d14a240074"}
// }

export type CreateTaskRequest={
    userId?:string,
    task?:string,
    projectId?:string,
    taskStartingDate?:Date,
    taskEndingDate?:Date,
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
    taskStartingDate: string;
    taskEndingDate: string;
    children?: TaskNode[];
}

export type ProjectContributorResponse = {
     publicId:string;
    userEmail:string;
    jobPos:string;
}
