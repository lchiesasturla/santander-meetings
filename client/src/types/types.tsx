export enum AuthTypes {
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILED = 'LOGIN_FAILED',
    USER_CREATED = 'USER_CREATED',
    USER_NOT_CREATED = 'USER_NOT_CREATED',
    USER_OBTAINED = 'USER_OBTAINED',
    USER_NOT_OBTAINED = 'USER_NOT_OBTAINED',
    LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
}

export enum MeetingTypes {
    MEETING_CREATED = 'MEETING_CREATED',
    MEETING_NOT_CREATED = 'MEETING_NOT_CREATED',
    USERS_OBTAINED = 'USERS_OBTAINED',
    USERS_NOT_OBTAINED = 'USERS_NOT_OBTAINED',
    GUEST_ADDED = 'GUEST_ADDED',
    GUEST_NOT_ADDED = 'GUEST_NOT_ADDED',
    GUEST_REMOVED = 'GUEST_REMOVED',
    GUESTS_NOT_REMOVED = 'GUESTS_NOT_REMOVED',
    MEETING_OBTAINED = 'MEETING_OBTAINED',
    MEETING_NOT_OBTAINED = 'MEETING_NOT_OBTAINED',
    MEETINGS_OBTAINED = 'MEETINGS_OBTAINED',
    MEETINGS_NOT_OBTAINED = 'MEETINGS_NOT_OBTAINED',
    INVITATION_UPDATED = 'INVITATION_UPDATED',
    INVITATION_NOT_UPDATED = 'INVITATION_NOT_UPDATED',
    MEETING_LOADING = 'MEETING_LOADING',
}