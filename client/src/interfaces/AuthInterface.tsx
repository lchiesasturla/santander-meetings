import { IResponse, IUser } from "./GenericInterface";

export interface IAuthContextProps {
    token?: string;
    user?: IUser;
    authenticated?: boolean;
    error?: IResponse;
    loading?: boolean;
    login?: any;
    createUser?: any;
    getAuthenticatedUser?: any;
    logout?: any;
}

