import { Dispatch, FunctionComponent, SetStateAction, useContext, useEffect } from 'react'
import Input from '../ui/Input';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Logo, Button, Link, FlexContainer } from '../../styles/styles';
import LogoImg from '../../assets/logo.png'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import { IUser } from '../../interfaces/GenericInterface';


export interface NewAccountProps {
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}
 
type NewAccountForm = {
    username: string,
    email: string,
    password: string,
    repassword: string
}

const NewAccount: FunctionComponent<NewAccountProps> = ({setIsLogin}) => {
    
    let history = useHistory();
    const { authenticated, error, createUser } = useContext(AuthContext);
    const { register, handleSubmit,setError, formState: { errors } } = useForm<NewAccountForm>();

    useEffect(() => {
        if (authenticated) {
            history.push('/home');
        }

    }, [authenticated, history])

    const registerSubmit = (data: IUser) => {
        if(data.password === data.repassword){
            delete data.repassword;
            createUser(data);
        }else{
            setError("repassword", {
                type: "manual",
                message: "Las contraseñas deben coincidir"
            });
        }
    }

    return ( 
        <Container className="w-75">
            <Row className="justify-content-center">
                <Logo big={true} src={LogoImg} className="mb-3"/>
                <Form onSubmit={handleSubmit(registerSubmit)}>
                    {error?.msg_es !== ''?
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
                            : null}
                    <Col xl={12} className="mb-3">
                        <Input<NewAccountForm>
                            name='username'
                            label='Usuario'
                            type='text'
                            state={register}
                            error={errors.username}
                            errormsg='El usuario debe tener 3 o mas caracteres.'
                            validations={{required: true, minLength: 3}}
                        />
                    </Col>
                    <Col xl={12} className="mb-3">
                        <Input<NewAccountForm>
                            name='email'
                            label='E-mail'
                            type='email'
                            state={register}
                            error={errors.email}
                            errormsg='El email debe tener un formato valido de mail.'
                            validations={{required: true}}
                        />
                    </Col>
                    <Col xl={12} className="mb-3">
                        <Input<NewAccountForm>
                            name='password'
                            label='Contraseña'
                            type='password'
                            state={register}
                            error={errors.password}
                            errormsg='La contraseña debe ser de 8 caracteres o mas.'
                            validations={{required: true, minLength: 8}}
                        />
                    </Col>
                    <Col xl={12} className="mb-3">
                        <Input<NewAccountForm>
                            name='repassword'
                            label='Reingresa tu contraseña'
                            type='password'
                            state={register}
                            error={errors.repassword}
                            errormsg='Las contraseñas deben coincidir.'
                            validations={{required: true, minLength: 8}}
                        />
                    </Col>
                    <Button className="mt-5">Registrarse</Button>
                    <Link className="d-block text-center mt-3" onClick={() => setIsLogin(true)}>Ya tenes una cuenta? Ingresa!</Link>
                </Form>   
            </Row>
        </Container>
    );
}
 
export default NewAccount;