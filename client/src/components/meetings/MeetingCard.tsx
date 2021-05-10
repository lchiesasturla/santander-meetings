import { FunctionComponent, useState, Fragment } from 'react';
import { CardTitle, CardHour, CardActions, SelectionButton, FlexContainer, DetailButton, StateInvitation } from '../../styles/styles';


export interface MeetingCardProps {
    title: string;
    day: string;
    beginHour: string;
    endHour: string;
}
 
const MeetingCard: FunctionComponent<MeetingCardProps> = ({title, day, beginHour, endHour}) => {
    
    const [pending, setPending] = useState<boolean>(true);
    const [accepted, setAccepted] = useState<boolean>(false);

    const handleInvite = (accepted: boolean) => {
        setPending(false);
        setAccepted(accepted);
    }

    return ( 
        
            <FlexContainer direction='column' className="bg-card">
                <CardTitle>{title}</CardTitle>
                <CardHour>{day} - {beginHour} - {endHour}</CardHour>
                <CardActions>
                    <DetailButton href='/meeting/detail' className='text-decoration-none me-2'>
                        Ver detalle
                    </DetailButton>
                    { pending ?
                        <Fragment>
                            <SelectionButton className="me-2" onClick={() => handleInvite(false)}>
                                Rechazar
                            </SelectionButton>
                            <SelectionButton accept onClick={() => handleInvite(true)}>
                                Aceptar
                            </SelectionButton>
                        </Fragment>
                    :
                        accepted ? 
                        <StateInvitation>Aceptada</StateInvitation>
                        : <StateInvitation>Rechazada</StateInvitation>
                    }
                    
                </CardActions>
            </FlexContainer>
        

    );
}
 
export default MeetingCard;