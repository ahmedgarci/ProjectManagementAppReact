
export type StatsResponse = {
     numberOfProjectCompleted:number;
     numberOfProjects:number;
     taksCompleted:number;
     allTasks:number;
}

export type StatsCardProps={
    text:string,
    stat:number
}