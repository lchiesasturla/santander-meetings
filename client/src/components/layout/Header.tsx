import { FunctionComponent } from 'react';
import { Logo, FlexContainer } from '../../styles/styles';
import LogoImg from '../../assets/logo.png';
import LogoutImg from '../../assets/logout.svg';
export interface HeaderProps {
    
}
 
const Header: FunctionComponent<HeaderProps> = () => {
    return ( 
        <FlexContainer className="mb-5">
            <Logo big={false} src={LogoImg} className="mt-3 ms-3"/>
            <img src={LogoutImg} className="ms-auto me-4" width="35px" alt="Cerrar sesión"/>
        </FlexContainer>
    );
}
 
export default Header;