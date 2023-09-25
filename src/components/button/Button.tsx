import s from './Button.module.scss'

const Button = ({title, onClick, borderRadius, width, height, bg, fontSize, icon, color, fontWeight, border, marginLeft}:
                        {
                            title:string,
                            onClick?: ()=>void,
                            borderRadius?: string,
                            width: string,
                            height?: string,
                            bg?: string,
                            fontSize?: string
                            icon?: string
                            color?: string
                            fontWeight?: string
                            border?: string
                            marginLeft?: string
                        }) => {
    return (
            <button className={icon ? s.button + ' ' + s.button_icon: s.button}
                    onClick={onClick}
                    style={
                        {
                            borderRadius: borderRadius,
                            width: width,
                            height: height,
                            background: bg,
                            fontSize: fontSize,
                            color: color,
                            fontWeight: fontWeight,
                            border: border,
                            marginLeft: marginLeft
                        }}>
                {icon && <img src={icon} width='14px' height='12px' alt='button-icon'/>}
                <span>{title}</span>
            </button>

    );
};

export default Button;