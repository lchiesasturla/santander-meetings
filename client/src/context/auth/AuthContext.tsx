import {createContext} from 'react';
import { IAuthContextProps } from '../../interfaces/AuthInterface';

const AuthContext = createContext<IAuthContextProps>({});

export default AuthContext;