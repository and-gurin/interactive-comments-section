import s from './Button.module.scss'

const Button = ({title, onClick, borderRadius, width, height, bg, fontSize, icon, color, fontWeight, border}:
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
                        }) => {
    return (
            <button className={icon ? s.button + ' ' + s.button_icon : s.button}
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
                            border: border
                        }}>
                <span>{title}</span>
                {icon && <img src={icon} width='18px' height='9px' alt='button-icon'/>}
            </button>

    );
};

export default Button;