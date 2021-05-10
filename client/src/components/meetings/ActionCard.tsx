import { FunctionComponent } from 'react';
import { FlexContainer, ActionCardDescription } from '../../styles/styles';
export interface ActionCardProps {
    title: string;
    description: string;
    illustration: string;
}
 
const ActionCard: FunctionComponent<ActionCardProps> = ({title, description, illustration}) => {
    return ( 
        <a href='/meeting/create' className='text-decoration-none'>
            <FlexContainer
                height= {{xxl:'300px'}}
                shadow= '0px 2px 10px 2px #c4c4c4'
                bdradius= '15px' 
                direction='column'
            >
                <h3 className='text-center mt-3 mb-3 text-dark'>{title}</h3>
                <ActionCardDescription className='text-center'>
                    {description}
                </ActionCardDescription>
                <img src={illustration} height='140px' alt=''></img>
            </FlexContainer>
        </a>
    );
}
 
export default ActionCard;