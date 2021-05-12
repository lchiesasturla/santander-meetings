import { IResponse, IUser } from "./GenericInterface";

export interface IMeeting {
    id?: number;
    name: string;
    description: string;
    date: string;
    beginTime: string;
    endTime: string;
    guests?: Array<IUser>;
    host?: number;
    accepted?: number;
}

export interface IMeetingContextProps {
    message?: IResponse;
    users?: Array<IUser>;
    guests?: Array<IUser>;
    meetings?: IMeeting[];
    meeting?: IMeeting;
    isAdmin: boolean;
    loadingMeeting?: boolean;
    createMeeting: (data: IMeeting) => Promise<number>;
    getAllUsers: (user: IUser | undefined) => void;
    addGuest: (user: IUser, meetingId?: number) => void;
    removeGuest: (user: IUser, meetingId?: number) => void;
    getMeeting: (userId: number | undefined, meetingId: number) => void;
    getAllMeetings: () => void;
    manageInvitation: (meetingId: number | undefined, accepted: number) => void;
}