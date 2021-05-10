import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react'
import Input from '../ui/Input';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Logo, Button, Link } from '../../styles/styles';
import LogoImg from '../../assets/logo.png'

export interface LoginProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}

const Login: FunctionComponent<LoginProps> = ({ setIsLogin }) => {

    const [data, setData] = useState({
        user: '',
        password: ''
    })

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(data);
    }

    return (
        <Container className="w-75">
            <Row className="justify-content-center">
                <Logo big={true} src={LogoImg} className="mb-3"/>
                <Form onSubmit={handleSubmit}>
                    <Col xl={12} className="mb-3">
                        <Input
                            name='user'
                            label='Usuario'
                            type='text'
                            state={data}
                            setState={setData}
                        />
                    </Col>
                    <Col xl={12} className="mb-2">
                        <Input
                            name='password'
                            label='Contraseña'
                            type='password'
                            state={data}
                            setState={setData}
                        />
                    </Col>
                    <Link href="!#">Olvidaste tu contraseña?</Link>
                    <Button type='submit' className="mt-5">Ingresar</Button>
                    <Link className="d-block text-center mt-3" onClick={() => setIsLogin(false)}>No tenes una cuenta? Crea una!</Link>
                </Form>   
            </Row>
        </Container>
    );
}

export default Login;