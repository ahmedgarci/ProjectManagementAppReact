
export type AuthReq = {
    email:string|null,
    password:string|null
}


export type AuthRes = {
    token:string
    username:string
    jobPos:string
}

export type RegisterRequest = {
    jobPosition:string,
    fullName:string
    email:string,
    password:string
}