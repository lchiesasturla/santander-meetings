import { Fragment, FunctionComponent } from 'react';
import { IUserMeeting } from '../../interfaces/MeetingInterface';
import { SelectionButton, PeopleList, FlexContainer } from '../../styles/styles';

export interface ListProps {
    users: Array<IUserMeeting>;
}
 
const List: FunctionComponent<ListProps> = ({users}) => {
    return ( 
        <Fragment>
            <PeopleList>
                {users.map(user => (
                <li>
                    <FlexContainer className='p-2' align='center'>
                        <p className="ps-3 mb-0">{user.username}</p>
                        <SelectionButton accept={!user.invited} className='ms-auto'>
                            {user.invited ? 'Cancelar' : 'Invitar'}
                        </SelectionButton>
                    </FlexContainer>
                </li>
                ))}
            </PeopleList>
        </Fragment>

    );
}
 
export default List;