import { Fragment, FunctionComponent, useContext } from 'react';
import { PeopleList } from '../../styles/styles';
import ItemList from './ItemList';
import MeetingContext from '../../context/meetings/MeetingContext';

export interface ListProps {
    showGuests: boolean;
    showUsers: boolean;
    showButtons: boolean;
}
 
const List: FunctionComponent<ListProps> = ({showGuests, showUsers, showButtons}) => {
    const {users, guests} = useContext(MeetingContext)
    return ( 
        <Fragment>
            <PeopleList>
                { showGuests ?
                    guests?.map(guest => (
                        <ItemList key={guest.id} user={guest} guest={true} showButtons={showButtons}/>
                    ))
                    :
                    null
                }
                { showUsers ?
                    users?.map(user => (
                        <ItemList key={user.id} user={user} guest={false} showButtons={showButtons}/>
                    ))
                    :
                    null
                }

            </PeopleList>
        </Fragment>

    );
}
 
export default List;