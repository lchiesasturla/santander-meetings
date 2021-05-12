import { FunctionComponent, Fragment, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import MeetingCard from '../../components/meetings/MeetingCard';
import ActionCard from '../../components/meetings/ActionCard';
import CreateMeetingImg from '../../assets/create_meeting.svg';
import MeetingContext from '../../context/meetings/MeetingContext';
import AuthContext from '../../context/auth/AuthContext';

export interface MainPageProps {

}

const MainPage: FunctionComponent<MainPageProps> = () => {
    const { loading, user } = useContext(AuthContext);
    const { meetings, loadingMeeting, getAllMeetings } = useContext(MeetingContext);

    useEffect(() => {
        if (!loading)
            getAllMeetings();
    }, [loading])

    return (
        <Fragment>
            <Header />
            {!loadingMeeting && !loading ?
                <Container>
                    <h3 className="mb-5">Hola {user?.username}, que bueno verte de nuevo por aca!</h3>
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
                        {meetings?.map(meeting => (
                            <Col lg={4} key={meeting.id} className="mb-3">
                                <MeetingCard
                                    id={meeting.id}
                                    title={meeting.name}
                                    date={meeting.date}
                                    beginHour={meeting.beginTime}
                                    endHour={meeting.endTime}
                                    host={meeting.host}
                                    accepted={meeting.accepted}
                                />
                            </Col>
                        ))}

                    </Row>
                </Container>
            : null}
        </Fragment>
    );
}

export default MainPage;