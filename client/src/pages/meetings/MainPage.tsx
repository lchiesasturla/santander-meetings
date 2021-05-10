import { FunctionComponent, Fragment, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import MeetingCard from '../../components/meetings/MeetingCard';
import ActionCard from '../../components/meetings/ActionCard';
import { IMeeting } from '../../interfaces/MeetingInterface';
import CreateMeetingImg from '../../assets/create_meeting.svg';

export interface MainPageProps {

}

const MainPage: FunctionComponent<MainPageProps> = () => {

    const [meetings, setMeetings] = useState<Array<IMeeting>>([
        { id: 1, title: 'Daily - Squad Comex', day: '27/04', beginHour: '15:30', endHour: '17:30' },
        { id: 2, title: 'Daily - Squad Cash', day: '20/04', beginHour: '12:30', endHour: '13:30' },
        { id: 3, title: 'Retro - Kurupis', day: '23/04', beginHour: '11:30', endHour: '13:30' },
    ]);

    return (
        <Fragment>
            <Header />
            <Container>
                <h3 className="mb-5">Hola lchiesa, que bueno verte de nuevo por aca!</h3>
                <Row className="mb-5">
                    <Col lg={4}>
                            <ActionCard 
                                title='Crea una meeting'
                                description='Podes crear una meeting que los demas se puedan unir.'
                                illustration={CreateMeetingImg}
                            />
                    </Col>
                </Row>
                <h3 className="text-center mb-5">Mis meetings</h3>
                <Row>
                    {meetings.map(meeting => (
                        <Col lg={4} key={meeting.id} className="mb-3">
                            <MeetingCard
                                title={meeting.title}
                                day={meeting.day}
                                beginHour={meeting.beginHour}
                                endHour={meeting.endHour}
                            />
                        </Col>
                    ))}

                </Row>
            </Container>
        </Fragment>
    );
}

export default MainPage;