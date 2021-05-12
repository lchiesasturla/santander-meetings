import { Dispatch, FunctionComponent, SetStateAction, useEffect, useContext, useState } from 'react'
import Input from '../ui/Input';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Logo, Button, Link, FlexContainer } from '../../styles/styles';
import LogoImg from '../../assets/logo.png'
import AuthContext from '../../context/auth/AuthContext';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { IUser } from '../../interfaces/GenericInterface';

export interface LoginProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}

type LoginForm = {
    username: string,
    password: string,
}

const Login: FunctionComponent<LoginProps> = ({ setIsLogin }) => {

    let history = useHistory();
    const { authenticated, error, login } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
    const [ showError, setShowError ] = useState(false);

    useEffect(() => {
        if (authenticated) {
            history.push('/home');
        }
        setShowError(error ? true : false);
    }, [authenticated, history, error])

    const loginSubmit = (data: IUser) => {
        login(data);
    }

    return (
        <Container className="w-75">
            <Row className="justify-content-center">
                <Logo big={true} src={LogoImg} className="mb-3" />
                <Form onSubmit={handleSubmit(loginSubmit)}>
                    { errors.username || errors.password ?
                        <FlexContainer
                            align='center'
                            justify='center'
                            shadow='0px 2px 10px 2px #c4c4c4'
                            bdradius='10px'
                            height={{ xxl: '40px' }}
                            className="mb-3"
                        >
                            <p className="m-0 text-danger">
                                El usuario o la contraseña son incorrectos
                            </p>
                        </FlexContainer>
                        : showError && error?.msg_es !== ''?
                            <FlexContainer
                                align='center'
                                justify='center'
                                shadow='0px 2px 10px 2px #c4c4c4'
                                bdradius='10px'
                                height={{ xxl: '40px' }}
                                className="mb-3"
                            >
                                <p className="m-0 text-danger">
                                    {error?.msg_es}
                                </p>
                            </FlexContainer>
                            : null
                    }

                    <Col xl={12} className="mb-3">
                        <Input<LoginForm>
                            name='username'
                            label='Usuario'
                            type='text'
                            state={register}
                            error={errors.username}
                            validations={{ required: true }}
                        />
                    </Col>
                    <Col xl={12} className="mb-2">
                        <Input<LoginForm>
                            name='password'
                            label='Contraseña'
                            type='password'
                            state={register}
                            error={errors.password}
                            validations={{ required: true }}
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