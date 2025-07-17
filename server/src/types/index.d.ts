export interface UserPayload {
    id:string;
    firstName:string;
    lastName:string;
    userName:string;
    emailAddress:string;
}

declare global{
    namespace Express {
        interface Request{
            user:UserPayload
        }
    }
}