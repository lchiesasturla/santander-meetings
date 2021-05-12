import { FunctionComponent, useContext } from 'react';
import { Logo, FlexContainer } from '../../styles/styles';
import LogoImg from '../../assets/logo.png';
import LogoutImg from '../../assets/logout.svg';
import AuthContext from '../../context/auth/AuthContext';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
export interface HeaderProps {
    
}
 
const Header: FunctionComponent<HeaderProps> = () => {
    let history = useHistory();
    const {logout} = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        history.push('/');
    }

    return ( 
        <FlexContainer className="mb-5">
            <Logo big={false} src={LogoImg} className="mt-3 ms-3"/>
            <Link to={'/home'} className='color-primary ms-5 d-flex align-items-center text-decoration-none'>Inicio</Link>
            <button className="ms-auto me-4 border-0" onClick={() => handleLogout()}><img src={LogoutImg} width="35px" alt="Cerrar sesión"/></button>
        </FlexContainer>
    );
}
 
export default Header;