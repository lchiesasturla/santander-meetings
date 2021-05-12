import { Fragment, FunctionComponent, useEffect, useContext, useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import Header from '../../components/layout/Header';
import Input from '../../components/ui/Input';
import List from '../../components/ui/List';
import { IMeeting } from '../../interfaces/MeetingInterface';
import { Button } from '../../styles/styles';
import MeetingContext from '../../context/meetings/MeetingContext';
import AuthContext from '../../context/auth/AuthContext';
import { useHistory } from 'react-router-dom';

export interface MeetingCreatePageProps {

}

type CreateMeetingForm = {
    name: string,
    description: string,
    date: string,
    beginTime: string,
    endTime: string
}

const MeetingCreatePage: FunctionComponent<MeetingCreatePageProps> = () => {

    let history = useHistory();
    const {loading, user} = useContext(AuthContext);
    const {guests, createMeeting, getAllUsers} = useContext(MeetingContext);
    const [today, setToday] = useState(new Date());
    useEffect(() => {
        if(!loading)
            getAllUsers(user);
    }, [loading]);

    const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateMeetingForm>();

    const createMeetingSubmit = (data: IMeeting) => {
        data.guests = guests;
        createMeeting(data).then( (meetingId: number) => {
            history.push(`/meeting/detail/${meetingId}`);
        });
        
    }

    return (
        <Fragment>
            <Header />
            <Container>
                <Row>
                    <Col lg={6}>
                        <h4 className="mb-3 mt-5">Crea tu meeting!</h4>
                        <Form onSubmit={handleSubmit(createMeetingSubmit)}>
                            <Row>
                                <Col lg={12} className="mb-5">
                                    <Input<CreateMeetingForm>
                                        name='name'
                                        label='Nombre de la meeting'
                                        type='text'
                                        state={register}
                                        error={errors.name}
                                        errormsg='El nombre de la meeting es obligatorio.'
                                        validations={{required: true}}
                                    />
                                </Col>
                                <Col lg={12} className="mb-5">
                                    <Input<CreateMeetingForm>
                                        name='description'
                                        label='Descripcion de la meeting'
                                        type='text'
                                        state={register}
                                        error={errors.description}
                                        errormsg='La descripcion de la meeting es obligatoria.'
                                        validations={{required: true}}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col lg={6}>
                                    <Input<CreateMeetingForm>
                                        name='date'
                                        label='Dia de la meeting'
                                        type='date'
                                        state={register}
                                        error={errors.date}
                                        errormsg='El dia de la meeting es obligatorio.'
                                        validations={{required: true}}
                                        min={today.toISOString().substr(0, 10)}
                                    />
                                </Col>
                                <Col lg={3}>
                                    <Input<CreateMeetingForm>
                                        name='beginTime'
                                        label='Empieza a las'
                                        type='time'
                                        state={register}
                                        error={errors.beginTime}
                                        errormsg='La hora de inicio es obligatoria.'
                                        validations={{required: true}}
                                        min={ today.toISOString().substr(0, 10) === watch('date') ? `${today.getHours()}:${today.getMinutes()}` : ''}
                                    />
                                </Col>
                                <Col lg={3}>
                                    <Input<CreateMeetingForm>
                                        name='endTime'
                                        label='Termina a las'
                                        type='time'
                                        state={register}
                                        error={errors.endTime}
                                        errormsg='La hora de fin es obligatoria.'
                                        validations={{required: true}}
                                    />
                                </Col>
                            </Row>
                            <Button type='submit'>Crear</Button>
                        </Form>
                    </Col>
                    <Col lg={6}>
                        <h4 className="mb-3 mt-5">Invitados</h4>
                        <List
                            showGuests={true}
                            showUsers={true}
                            showButtons={true}
                        />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default MeetingCreatePage;