import style from './Textarea.module.scss';
const Textarea = ({disabled, textLabel, error, value, onChangeHandler, placeholderText, width, id, height}:
                   {
                       disabled?: boolean
                       textLabel?: string
                       error?: string
                       value?: string
                       onChangeHandler?: () => void
                       placeholderText?: string
                       width?: string
                       id?: string
                       height: string
                   }
) => {

    return (
        <div>
                {textLabel && <label htmlFor={id} className={style.textLabel}>{textLabel}</label>}
            <textarea value={value}
                   id={id}
                   onChange={onChangeHandler}
                   className={error ? `${style.input} ${style.error}` : style.input}
                   disabled={disabled}
                   placeholder={placeholderText}
                   style={{width: width, height: height}}
            />
        </div>
    );
};

export default Textarea;