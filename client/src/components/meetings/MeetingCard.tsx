import { FunctionComponent, useState, Fragment, useContext, useEffect } from 'react';
import { CardTitle, CardActions, SelectionButton, FlexContainer, DetailButton, StateInvitation, CardSubTitle } from '../../styles/styles';
import AuthContext from '../../context/auth/AuthContext';
import MeetingContext from '../../context/meetings/MeetingContext';


export interface MeetingCardProps {
    id: number | undefined;
    title: string;
    date: string;
    beginHour: string;
    endHour: string;
    host: number | undefined;
    accepted: number | undefined;
}

const MeetingCard: FunctionComponent<MeetingCardProps> = ({ id, title, date, beginHour, endHour, host, accepted }) => {

    const { loading, user } = useContext(AuthContext);
    const { manageInvitation, getAllMeetings } = useContext(MeetingContext);
    const [state, setState] = useState<number | undefined>(accepted);

    useEffect(() => {
        if(state === 0)
            getAllMeetings();
    }, [state])

    const handleInvite = (accepted: number) => {
        manageInvitation(id, accepted);
        setState(accepted);
    }

    return (
        <FlexContainer direction='column' className="bg-card">
            { !loading ?
                <Fragment>
                    <CardTitle>{title}</CardTitle>
                    <CardSubTitle className="mb-1">{date} / {beginHour} - {endHour}</CardSubTitle>
                    {user?.id === host ? <CardSubTitle>Creada por ti</CardSubTitle> : null}
                    <CardActions>
                        <DetailButton href={`/meeting/detail/${id}`} className={`text-decoration-none ${user?.id === host ? 'me-0' : 'me-2'}`}>
                            Ver detalle
                    </DetailButton>
                        {state ?

                            state === 1 ? <StateInvitation className="ms-2">Aceptada</StateInvitation> : null

                            : user?.id !== host ?
                                    <Fragment>
                                        <SelectionButton className="me-2" onClick={() => handleInvite(0)}>
                                            Rechazar
                                        </SelectionButton>
                                            <SelectionButton accept={true} onClick={() => handleInvite(1)}>
                                                Aceptar
                                        </SelectionButton>
                                    </Fragment>
                                :
                                null
                        }
                    </CardActions>
                </Fragment>
                : null}
        </FlexContainer>


    );
}

export default MeetingCard;