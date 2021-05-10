import { FunctionComponent, Fragment, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import { MeetingDescription, FlexContainer } from '../../styles/styles';
import BeerIcon from '../../assets/beer.svg';
import List from '../../components/ui/List';
import { IUserMeeting } from '../../interfaces/MeetingInterface';

export interface MeetingDetailPageProps {

}

const MeetingDetailPage: FunctionComponent<MeetingDetailPageProps> = () => {

    const [users, setUsers] = useState<Array<IUserMeeting>>([
        {id: 1, username: 'lchiesa', email: 'lucaschiesa84@gmail.com', invited: true, accepted: false},
        {id: 2, username: 'ldeniz', email: 'lucaschiesa84@gmail.com', invited: false, accepted: true},
        {id: 3, username: 'alanriva', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false},
        {id: 4, username: 'mcastillo', email: 'lucaschiesa84@gmail.com', invited: true, accepted: true},
        {id: 5, username: 'dsantos', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false},
        {id: 6, username: 'mcolodrero', email: 'lucaschiesa84@gmail.com', invited: true, accepted: false},
        {id: 7, username: 'durbano', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false},
        {id: 8, username: 'dsantos', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false},
        {id: 9, username: 'mcolodrero', email: 'lucaschiesa84@gmail.com', invited: true, accepted: false},
        {id: 10, username: 'durbano', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false},
        {id: 11, username: 'dsantos', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false},
        {id: 12, username: 'mcolodrero', email: 'lucaschiesa84@gmail.com', invited: true, accepted: false},
        {id: 13, username: 'durbano', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false},
        {id: 14, username: 'dsantos', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false},
        {id: 15, username: 'mcolodrero', email: 'lucaschiesa84@gmail.com', invited: true, accepted: false},
        {id: 16, username: 'durbano', email: 'lucaschiesa84@gmail.com', invited: false, accepted: false},
    ]);
    return (
        <Fragment>
            <Header />
            <Container>
                <FlexContainer>
                    <h3 className="d-inline fw-bold">Daily - Squad Comex</h3>
                    <img src={BeerIcon} height='35px' className='ms-4' alt='Cervezas: ' />
                    <span className='fs-4 ms-2 text-muted fw-bold'>24</span>
                </FlexContainer>

                <MeetingDescription className='mt-4'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
                </MeetingDescription>
                <Row className='mt-5'>
                    <Col lg={6}>
                        <h5>Invitados</h5>
                        <List
                            users = {users}
                        />
                    </Col>
                    <Col lg={6}>
                        <h5>Te olvidaste de invitar a alguien? Invitalo!</h5>
                        <List
                            users = {users}
                        />
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default MeetingDetailPage;