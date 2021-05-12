import { useReducer } from 'react';
import axiosClient from '../../config/axios';
import { IMeeting } from '../../interfaces/MeetingInterface';
import { MeetingTypes } from '../../types/types';
import MeetingContext from './MeetingContext';
import MeetingReducer from './MeetingReducer';
import { IUser } from '../../interfaces/GenericInterface';
const MeetingState = (props: any) => {

    const initialState = {
	   message: '',
       users: [],
       guests: [],
       meetings: null,
       meeting: null,
       loading: true,
       isAdmin: false
    }

    const [state, dispatch] = useReducer(MeetingReducer, initialState);

    const createMeeting = async (data: IMeeting) => {
        try {
            const response = await axiosClient.post('/meetings', data);
            dispatch({
                type: MeetingTypes.MEETING_CREATED
            })
            return response.data.id;
        } catch (error) {
            console.log(error);
            dispatch({
                type: MeetingTypes.MEETING_NOT_CREATED,
                payload: error.response.data
            });
        }
    }

    const getAllUsers = async (user: IUser | undefined) => {
        try {
            const response = await axiosClient.get('/users');
            dispatch({
                type: MeetingTypes.USERS_OBTAINED,
                payload: {
                    data: response.data.users,
                    user
                }
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: MeetingTypes.USERS_NOT_OBTAINED,
                payload: error.response.data
            });
        }
    }

    const addGuest = async (user: IUser, meetingId?: number) => {
        try {
            if(meetingId){
                const response = await axiosClient.post(`/meetings/guests/${meetingId}/${user.id}`);
            }
            dispatch({
                type: MeetingTypes.GUEST_ADDED,
                payload: user
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: MeetingTypes.GUEST_NOT_ADDED,
                payload: error.response.data
            });
        }
    }

    const removeGuest = async (user: IUser, meetingId?: number) => {
        try {
            if(meetingId){
                const response = await axiosClient.delete(`/meetings/guests/${meetingId}/${user.id}`);
                console.log(response);
            }
            dispatch({
                type: MeetingTypes.GUEST_REMOVED,
                payload: user
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: MeetingTypes.GUESTS_NOT_REMOVED,
                payload: error.response.data
            });
        }
    }

    const manageInvitation = async (meetingId: number | undefined, accepted: number) => {
        try {
            await axiosClient.put(`/meetings/guests/${meetingId}`, {accepted});
            dispatch({
                type: MeetingTypes.INVITATION_UPDATED
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: MeetingTypes.INVITATION_NOT_UPDATED,
                payload: error.response.data
            });
        }
    }

    const getMeeting = async (userId: number | undefined, meetingId: number) => {
        try {
            const response = await axiosClient.get(`/meetings/${meetingId}`);
            dispatch({
                type: MeetingTypes.MEETING_OBTAINED,
                payload: {
                    meetingData: response.data,
                    user: userId
                }
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: MeetingTypes.MEETING_NOT_OBTAINED,
                payload: error.response.data
            });
        }
    }

    const getAllMeetings = async () => {
        try {
            setLoading();
            const response = await axiosClient.get(`/meetings/user`);
            dispatch({
                type: MeetingTypes.MEETINGS_OBTAINED,
                payload: response.data.meetings
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: MeetingTypes.MEETINGS_NOT_OBTAINED,
                payload: error.response.data
            });
        }
    }

    const setLoading = () => {
        dispatch({
            type: MeetingTypes.MEETING_LOADING
        })
    }

    return (
        <MeetingContext.Provider
            value={{
                message: state.message,
                users: state.users,
                guests: state.guests,
                meetings: state.meetings,
                meeting: state.meeting,
                loadingMeeting: state.loading,
                isAdmin: state.isAdmin,
                createMeeting,
                getAllUsers,
                addGuest,
                removeGuest,
                getMeeting,
                getAllMeetings,
                manageInvitation
            }}
        >
            {props.children}
        </MeetingContext.Provider>
    )
}

export default MeetingState;