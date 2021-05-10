import styled from '@emotion/styled';
import { FunctionComponent } from 'react'
import { Form, InputGroup } from 'react-bootstrap';
import { Control } from '../../styles/styles';

export interface InputProps {
    name: string,
    label?: string,
    type: string,
    state: any,
    setState: any
}

const Label = styled(Form.Label)`
  font-family: 'Roboto';
  color: #777777;
  font-size: 0.9rem;
`;

const Input: FunctionComponent<InputProps> = ({name, label, type, state, setState}) => {

    const handleChange = (e: any) => {
        setState({...state, [e.target.name]: e.target.value});
    }

    return (
        <Form.Group controlId={label ? name : undefined}>
            {label ? <Label>{label}</Label> : null}
            <InputGroup>
                <Control type={type} name={name} onChange={handleChange}/>
            </InputGroup>
            {/* <p className="help-block text-danger">Campo requerido</p> */}
        </Form.Group>

    );
}

export default Input;