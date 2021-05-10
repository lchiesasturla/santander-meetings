import { FunctionComponent, useState } from 'react'
import Login from '../../components/auth/Login';
import NewAccount from '../../components/auth/NewAccount';
import { FlexContainer, ResponsiveContainer } from '../../styles/styles';

export interface AuthPageProps {

}

const AuthPage: FunctionComponent<AuthPageProps> = () => {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <>
            <FlexContainer
                width={{xxl: '35vw', md: '45vw', sm: '100vw'}}
                height={{xxl: '100vh'}}
                bdradius='0px 15px 15px 0px'
                float='left'
                direction='column'
                justify='center'
                align='center'
            >
                { isLogin 
                ? 
                  <Login
                    setIsLogin={setIsLogin}
                  /> 
                : 
                  <NewAccount
                     setIsLogin={setIsLogin}
                  />
                }
            </FlexContainer>
            <ResponsiveContainer
                width={{xxl: '65vw', md: '55vw', sm: '0px'}}
                height={{xxl:'100vh'}}
                float='right'
                className="bg-auth"
            >

            </ResponsiveContainer>
        </>
    );
}

export default AuthPage;