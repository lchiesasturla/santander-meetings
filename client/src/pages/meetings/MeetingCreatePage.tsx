import { Fragment, FunctionComponent, useState } from 'react';
import { Col, Container, Row, Form } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import Input from '../../components/ui/Input';
import List from '../../components/ui/List';
import { IUserMeeting } from '../../interfaces/MeetingInterface';
import { Button } from '../../styles/styles';

export interface MeetingCreatePageProps {

}

const MeetingCreatePage: FunctionComponent<MeetingCreatePageProps> = () => {

    const [users, setUsers] = useState<Array<IUserMeeting>>([
        { id: 1, username: 'lchiesa', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false },
        { id: 2, username: 'ldeniz', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false },
        { id: 3, username: 'alanriva', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false },
        { id: 4, username: 'mcastillo', email: 'lucaschiesa84@gmail.com', invited: false, accepted: true },
        { id: 5, username: 'dsantos', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false },
        { id: 6, username: 'mcolodrero', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false },
        { id: 7, username: 'durbano', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false },
        { id: 8, username: 'dsantos', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false },
    ])

    const [data, setData] = useState({
        name: '',
        description: '',
        date: '',
        beginTime: '',
        endTime: ''
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(data);
    }

    return (
        <Fragment>
            <Header />
            <Container>
                <Row>
                    <Col lg={6}>
                        <h4 className="mb-3 mt-5">Crea tu meeting!</h4>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col lg={12} className="mb-5">
                                    <Input
                                        name='name'
                                        label='Nombre de la meeting'
                                        type='text'
                                        state={data}
                                        setState={setData}
                                    />
                                </Col>
                                <Col lg={12} className="mb-5">
                                    <Input
                                        name='description'
                                        label='Descripcion de la meeting'
                                        type='text'
                                        state={data}
                                        setState={setData}
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-5">
                                <Col lg={4}>
                                    <Input
                                        name='date'
                                        label='Dia de la meeting'
                                        type='date'
                                        state={data}
                                        setState={setData}
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Input
                                        name='beginTime'
                                        label='Empieza a las'
                                        type='time'
                                        state={data}
                                        setState={setData}
                                    />
                                </Col>
                                <Col lg={4}>
                                    <Input
                                        name='endTime'
                                        label='Termina a las'
                                        type='time'
                                        state={data}
                                        setState={setData}
                                    />
                                </Col>
                            </Row>
                            <Button type='submit'>Crear</Button>
                        </Form>
                    </Col>
                    <Col lg={6}>
                        <h4 className="mb-3 mt-5">Invitados</h4>
                        <List
                            users={users}
                        />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default MeetingCreatePage;