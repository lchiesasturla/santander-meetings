import styled from '@emotion/styled';
import { FormControl } from 'react-bootstrap';
import { IAbsoluteContainerProps, IResponsiveContainerProps, IFlexContainerProps, ILogoProps, ICardButton } from '../interfaces/StylesInterfaces';
import { Link as RouterLink} from 'react-router-dom';

export const ResponsiveContainer = styled.div<IResponsiveContainerProps>`
    width: ${props => props.width?.xxl};
    height: ${props => props.height?.xxl};
    border-radius: ${props => props.bdradius};
    background-color: ${props => props.bgcolor};
    z-index: ${props => props.zindex};
    float: ${props => props.float};
    margin-left: ${props => props.ml?.xxl};
    margin-right: ${props => props.mr?.xxl};
    margin-top: ${props => props.mt?.xxl};
    margin-bottom: ${props => props.mb?.xxl};
    padding-left: ${props => props.pl?.xxl};
    padding-right: ${props => props.pr?.xxl};
    padding-top: ${props => props.pt?.xxl};
    padding-bottom: ${props => props.pb?.xxl};
    box-shadow: ${props => props.shadow};
    
    @media(max-width: 1400px){
        width: ${props => props.width?.xl};
        height: ${props => props.height?.xl};
        margin-left: ${props => props.ml?.xl};
        margin-right: ${props => props.mr?.xl};
        margin-top: ${props => props.mt?.xl};
        margin-bottom: ${props => props.mb?.xl};
        padding-left: ${props => props.pl?.xl};
        padding-right: ${props => props.pr?.xl};
        padding-top: ${props => props.pt?.xl};
        padding-bottom: ${props => props.pb?.xl};
    }

    @media(max-width: 1200px){
        width: ${props => props.width?.lg};
        height: ${props => props.height?.lg};
        margin-left: ${props => props.ml?.lg};
        margin-right: ${props => props.mr?.lg};
        margin-top: ${props => props.mt?.lg};
        margin-bottom: ${props => props.mb?.lg};
        padding-left: ${props => props.pl?.lg};
        padding-right: ${props => props.pr?.lg};
        padding-top: ${props => props.pt?.lg};
        padding-bottom: ${props => props.pb?.lg};
    }

    @media(max-width: 992px){
        width: ${props => props.width?.md};
        height: ${props => props.height?.md};
        margin-left: ${props => props.ml?.md};
        margin-right: ${props => props.mr?.md};
        margin-top: ${props => props.mt?.md};
        margin-bottom: ${props => props.mb?.md};
        padding-left: ${props => props.pl?.md};
        padding-right: ${props => props.pr?.md};
        padding-top: ${props => props.pt?.md};
        padding-bottom: ${props => props.pb?.md};
    }

    @media(max-width: 768px){
        width: ${props => props.width?.sm};
        height: ${props => props.height?.sm};
        margin-left: ${props => props.ml?.sm};
        margin-right: ${props => props.mr?.sm};
        margin-top: ${props => props.mt?.sm};
        margin-bottom: ${props => props.mb?.sm};
        padding-left: ${props => props.pl?.sm};
        padding-right: ${props => props.pr?.sm};
        padding-top: ${props => props.pt?.sm};
        padding-bottom: ${props => props.pb?.sm};
    }

    @media(max-width: 596px){
        width: ${props => props.width?.xs};
        height: ${props => props.height?.xs};
        margin-left: ${props => props.ml?.xs};
        margin-right: ${props => props.mr?.xs};
        margin-top: ${props => props.mt?.xs};
        margin-bottom: ${props => props.mb?.xs};
        padding-left: ${props => props.pl?.xs};
        padding-right: ${props => props.pr?.xs};
        padding-top: ${props => props.pt?.xs};
        padding-bottom: ${props => props.pb?.xs};
    }
`;

export const AbsoluteContainer = styled(ResponsiveContainer)<IAbsoluteContainerProps>`
    position: absolute;
    top: ${props => props.top};
    right: ${props => props.right};
    bottom: ${props => props.bottom};
    left: ${props => props.left};
`;

export const FlexContainer = styled(ResponsiveContainer)<IFlexContainerProps>`
    display: flex;
    flex-direction: ${props => props.direction};
    align-items: ${props => props.align};
    justify-content: ${props => props.justify};
`;

export const Control = styled(FormControl)`
    font-family: Roboto, sans-serif;
    font-size: 18px;
    height: 34px;
    box-shadow: inset 0px 1px 6px #C4C4C4;
    border: none;
    border-radius: 10px;
`;

export const Logo = styled.img<ILogoProps>`
    width: ${props => props.big ? '300px' : '200px'};
`;

export const Button = styled.button`
    border: none;
    background-color: #ec0000;
    border-radius: 10px;
    height: 42px;
    font-family: 'Roboto';
    color: white;
    transition: background-color 100ms ease-out;
    text-decoration: none;
    width: 100%;

    &:hover{
        background-color: #e40303;
        transition: background-color 100ms ease-in;
        color: white;
    }
`;

export const Link = styled.a`
    color: #ec0000;
    font-family: 'Roboto';
    font-size: 15px;
    text-decoration: none;
    transition: color 100ms ease-out;
    &:hover{
        color: #e40303;
        transition: color 100ms ease-in;
        cursor: pointer;
    }
`;

export const CardTitle = styled.h2`
    color: white;
    font-size: 20px;
    font-family: 'Roboto';
    word-break: break-word;
`;

export const CardSubTitle = styled.p`
    color: white;
    font-weight: 500;
`;

export const CardActions = styled.div`
    align-self: flex-end;
    margin-top: auto;
    margin-bottom: 15px;
    margin-right: 15px;
`;

export const SelectionButton = styled.button<ICardButton>`
    border: none;
    background-color: white;
    border-radius: 25px;
    height: 35px;
    font-family: 'Roboto';
    color: #ec0000;
    font-weight: 400;
    font-size: 14px;
    width: 80px;
    padding: 7px;
    transition: background-color 100ms ease-out;

    &:hover{
        background-color: ${props => props.accept ? '#87D883' : '#E54A4A'};
        transition: background-color 100ms ease-in;
        color: white;
    }
`;

export const DetailButton = styled(RouterLink)`
    border: none;
    background-color: white;
    border-radius: 25px;
    height: 35px;
    font-family: 'Roboto';
    color: #ec0000;
    font-weight: 400;
    font-size: 14px;
    width: 80px;
    padding: 9px;
    transition: background-color 100ms ease-out;
    vertical-align: middle;

    &:hover{
        background-color: #dbdbdb;
        transition: background-color 100ms ease-in;
        color: #ec0000;
    }
`;

export const StateInvitation = styled.p`
    float: right;
    margin-bottom: 0px;
    height: 32px;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: white;
`;

export const ActionCardDescription = styled.p`
    font-size: 18px;
    font-family: 'Roboto';
    font-weight: 300;
    color: gray;
    padding-left: 15px;
    padding-right: 15px;
`;

export const MeetingDescription = styled.p`
    width: 40vw;
    color: gray;

    @media(max-width: 768px){
        width: 100%;
    }
`;

export const PeopleList = styled.ul`
    list-style: none;
    padding: 0;
    box-shadow: 0px 2px 10px 2px #c4c4c4;
    border-radius: 15px;
    overflow-y: auto;
    height: 500px;
    li{
        border-bottom: 1px solid #e2e2e2;
    }
`;