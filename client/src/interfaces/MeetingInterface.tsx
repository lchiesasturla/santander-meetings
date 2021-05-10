export interface IMeeting {
    id: number;
    title: string;
    day: string;
    beginHour: string;
    endHour: string;
}

export interface IUser {
    id: number;
    username: string;
    email?: string;
    password?: string;
    repassword?: string;
}

export interface IUserMeeting {
    id: number;
    username: string;
    email: string;
    invited: boolean;
    accepted: boolean;
}