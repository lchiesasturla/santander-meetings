import styled from '@emotion/styled';
import { Form, InputGroup } from 'react-bootstrap';
import { FieldError, UseFormRegister } from 'react-hook-form';
import { Control } from '../../styles/styles';
import { IValidations } from '../../interfaces/GenericInterface';

export interface InputProps<T> {
    name: string | any;
    label?: string;
    type: string;
    state: UseFormRegister<T>;
    error?: FieldError;
    errormsg?: string;
    validations: Partial<IValidations>;
    min?: string;
}

const Label = styled(Form.Label)`
  font-family: 'Roboto';
  color: #777777;
  font-size: 0.9rem;
`;

const Input = <T extends{}>({name, label, type, state, error, errormsg, validations, min}: InputProps<T>) => {
    return (
        <Form.Group controlId={label ? name : undefined}>
            {label ? <Label>{label}</Label> : null}
            <InputGroup>
                <Control type={type} min={min} {...state(name, validations)}/>
            </InputGroup>
            {error ? <p className="help-block text-danger mt-3">{errormsg}</p> : null}
        </Form.Group>

    );
}

export default Input;