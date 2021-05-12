import { FunctionComponent, useState, useContext } from 'react';
import MeetingContext from '../../context/meetings/MeetingContext';
import { IUser } from '../../interfaces/GenericInterface';
import { SelectionButton, FlexContainer } from '../../styles/styles';

export interface ItemListProps {
    user: IUser;
    guest: boolean;
    showButtons: boolean;
}

const ItemList: FunctionComponent<ItemListProps> = ({ user, guest, showButtons }) => {
    const { addGuest, removeGuest, meeting } = useContext(MeetingContext);
    const [isGuest, setIsGuest] = useState<boolean>(guest);

    const handleInvitation = () => {
        if (!isGuest) {
            meeting ? addGuest(user, meeting.id) : addGuest(user);
        } else {
            meeting ? removeGuest(user, meeting.id) : removeGuest(user);
        }
        setIsGuest(!isGuest);
    }

    return (
        <li>
            <FlexContainer className='p-2' align='center'>
                <p className="ps-3 mb-0">{user.username}</p>
                {showButtons ?
                    <SelectionButton accept={!isGuest} className='ms-auto' onClick={() => handleInvitation()}>
                        {isGuest ? 'Cancelar' : 'Invitar'}
                    </SelectionButton>
                    : null
                }

            </FlexContainer>
        </li>
    );
}

export default ItemList;