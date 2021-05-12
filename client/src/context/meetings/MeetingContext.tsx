import {createContext} from 'react';
import { IMeetingContextProps } from '../../interfaces/MeetingInterface';

const MeetingContext = createContext<IMeetingContextProps>({
    users: [],
    guests: [],
    isAdmin: false,
    createMeeting: async () => 0,
    getAllUsers: () => null,
    addGuest: () => null,
    removeGuest: () => null,
    getMeeting: () => null,
    getAllMeetings: () => null,
    manageInvitation: () => null,
});

export default MeetingContext;