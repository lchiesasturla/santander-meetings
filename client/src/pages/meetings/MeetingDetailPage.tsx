import { FunctionComponent, Fragment, useState, useContext, useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import Header from '../../components/layout/Header';
import { MeetingDescription, FlexContainer } from '../../styles/styles';
import BeerIcon from '../../assets/beer.svg';
import List from '../../components/ui/List';
import { useParams } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import MeetingContext from '../../context/meetings/MeetingContext';
import axios from 'axios';

export interface MeetingDetailPageProps {

}

interface RouteParams {
    id: string;
}

const MeetingDetailPage: FunctionComponent<MeetingDetailPageProps> = () => {
    const { loading, user } = useContext(AuthContext);
    const [ beers, setBeers ] = useState(0);
    const [ temperature, setTemperature] = useState(0);
    const { meeting, guests, isAdmin, loadingMeeting, getMeeting } = useContext(MeetingContext);
    let { id } = useParams<RouteParams>();

    useEffect(() => {
        if (!loading)
            getMeeting(user?.id,Number(id));
    }, [loading]);

    useEffect(() => {
        if(guests){
            getWeather().then(temp => {
                setTemperature(temp);
                setBeers(Math.ceil((guests.length * getMultiplier(temp)/6)));
            });
        }
    }, [guests]);

    const getMultiplier = (temp: number): number =>{
        if(temp >= 20 && temp <= 24){
            return 1;
        }else if(temp > 24){
            return 3;
        }else {
            return 0.75;
        }
    }

    const getWeather = async () => {
        const response = await axios.get(`${process.env.REACT_APP_WEATHER_API_URL}/current?city=Buenos Aires,AR&key=${process.env.REACT_APP_API_KEY}`);
        return response.data.data[0].temp;
    }

    return (
        <Fragment>
            <Header />
            {
                !loadingMeeting ?
                    <Container>
                        <FlexContainer>
                            <h3 className="d-inline fw-bold">{meeting?.name}</h3>
                            {isAdmin ?
                                <Fragment>
                                    <img src={BeerIcon} height='35px' className='ms-4' alt='Cervezas: ' />
                                    <span className='fs-4 ms-2 text-muted fw-bold'>{beers} Cajas</span>

                                </Fragment>
                                : null
                            }
                            
                        </FlexContainer>
                        <p className='fs-6 fw-bold color-primary'>Temperatura: {temperature}º</p>
                        <MeetingDescription className='mt-4'>
                            {meeting?.description}
                        </MeetingDescription>
                        <Row className='mt-5'>
                            <Col lg={isAdmin ? 6 : 12}>
                                <h5>Invitados</h5>
                                <List showGuests={true} showUsers={false} showButtons={isAdmin} />
                            </Col>
                            {isAdmin ?
                                <Col lg={6}>
                                    <h5>Te olvidaste de invitar a alguien? Invitalo!</h5>
                                    <List showGuests={false} showUsers={true} showButtons={isAdmin} />
                                </Col>
                                : null
                            }

                        </Row>
                    </Container>
                    : null
            }

        </Fragment>
    );
}

export default MeetingDetailPage;