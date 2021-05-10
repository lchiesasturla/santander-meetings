import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react'
import Input from '../ui/Input';
import { Container, Row, Col } from 'react-bootstrap'
import { Logo, Button, Link } from '../../styles/styles';
import LogoImg from '../../assets/logo.png'

export interface NewAccountProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}
 
const NewAccount: FunctionComponent<NewAccountProps> = ({setIsLogin}) => {

    const [data, setData] = useState({
        user: '',
        email: '',
        password: '',
        repassword: ''
    });

    return ( 
        <Container className="w-75">
            <Row className="justify-content-center">
                <Logo big={true} src={LogoImg} className="mb-3"/>
                <form>
                    <Col xl={12} className="mb-3">
                        <Input
                            name='user'
                            label='Usuario'
                            type='text'
                            state={data}
                            setState={setData}
                        />
                    </Col>
                    <Col xl={12} className="mb-3">
                        <Input
                            name='email'
                            label='E-mail'
                            type='email'
                            state={data}
                            setState={setData}
                        />
                    </Col>
                    <Col xl={12} className="mb-3">
                        <Input
                            name='password'
                            label='Contraseña'
                            type='password'
                            state={data}
                            setState={setData}
                        />
                    </Col>
                    <Col xl={12} className="mb-3">
                        <Input
                            name='repassword'
                            label='Reingresa tu contraseña'
                            type='password'
                            state={data}
                            setState={setData}
                        />
                    </Col>
                    <Button className="mt-5">Registrarse</Button>
                    <Link className="d-block text-center mt-3" onClick={() => setIsLogin(true)}>Ya tenes una cuenta? Ingresa!</Link>
                </form>   
            </Row>
        </Container>
    );
}
 
export default NewAccount;