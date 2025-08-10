 export type  ProjectDetailsResponse =  {
    
    projectId:string

    projectName:string

    startedAt:string

    endsAt:string

    description:string

    stage:string

}

export type CreateProjectRequest = {
    projectDescriptionVo:string

    projectNameVo:string

    endingDate?:Date

    startingDateVo?:Date

}