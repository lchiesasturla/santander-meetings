export interface IResponsiveContainerProps {
    width?: IResponsive;
    height?: IResponsive;
    bdradius?: string;
    bgcolor?: string;
    zindex?: number;
    float?: string;
    shadow?: string;
    // Margins y paddings (l = left, r = right, t = top, b = bottom)
    ml?: IResponsive;
    mr?: IResponsive;
    mt?: IResponsive;
    mb?: IResponsive;
    pl?: IResponsive;
    pr?: IResponsive;
    pt?: IResponsive;
    pb?: IResponsive;
}

export interface IAbsoluteContainerProps {
    top?: string;
    right?: string;
    left?: string;
    bottom?: string;
}

export interface IFlexContainerProps {
    justify?: string;
    align?: string;
    direction?: string;
}

export interface ILogoProps {
    big?: boolean;
}

export interface ICardButton {
    accept ?: boolean;
}

interface IResponsive {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    xxl?: string;
}