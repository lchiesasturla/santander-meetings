import { MeetingTypes } from "../../types/types";
import { IUser } from '../../interfaces/GenericInterface';

const MeetingReducer = (state: any, action: any) => {
    switch (action.type) {
        case MeetingTypes.USERS_NOT_OBTAINED:
        case MeetingTypes.MEETING_NOT_CREATED:
        case MeetingTypes.GUEST_NOT_ADDED:
        case MeetingTypes.GUESTS_NOT_REMOVED:
        case MeetingTypes.MEETING_NOT_OBTAINED:
        case MeetingTypes.MEETINGS_NOT_OBTAINED:
        case MeetingTypes.INVITATION_NOT_UPDATED:
            return {
                ...state,
                message: action.payload
            }

        case MeetingTypes.USERS_OBTAINED:
            return {
                ...state,
                users: action.payload.data.filter((user: IUser) => user.id !== action.payload.user.id)
            }

        case MeetingTypes.GUEST_ADDED:
            return {
                ...state,
                guests: state.guests?.concat(action.payload),
                users: state.users?.filter((user: IUser) => user.id !== action.payload.id)
            }

        case MeetingTypes.GUEST_REMOVED:
            return {
                ...state,
                guests: state.guests?.filter((guest: IUser) => guest.id !== action.payload.id),
                users: state.users?.concat(action.payload) 
            }

        case MeetingTypes.MEETINGS_OBTAINED:
            return {
                ...state,
                meetings: action.payload,
                loading: false
            }
            
        case MeetingTypes.MEETING_CREATED:    
            return {
                ...state,
                message:'',
                users: state.users?.concat(state.guests),
                guests: []
            }
        
        case MeetingTypes.INVITATION_UPDATED:
            return {
                ...state,
                message: 'Agregado',
                
            }

        case MeetingTypes.MEETING_OBTAINED:
            return {
                ...state,
                meeting: action.payload.meetingData.meeting,
                guests: action.payload.meetingData.guests,
                users: action.payload.meetingData.users,
                loading: false,
                isAdmin: action.payload.meetingData.meeting.host === action.payload.user
            }
        
        case MeetingTypes.MEETING_LOADING:
            return {
                ...state,
                loading: true
            }
        
        default:
            return state;
    }
}

export default MeetingReducer;