import style from './Textarea.module.scss';
import {ChangeEvent} from "react";

const Textarea = ({disabled, textLabel, error, value, onChangeHandler, placeholderText, width, id, height}:
                      {
                          disabled?: boolean
                          textLabel?: string
                          error?: string
                          value?: string
                          onChangeHandler?: (e: ChangeEvent<HTMLTextAreaElement>) => void
                          placeholderText?: string
                          width?: string
                          id?: string
                          height: string
                      }
) => {

    return (
        <>
            {textLabel && <label htmlFor={id} className={style.textLabel}>{textLabel}</label>}
            <textarea value={value}
                      id={id}
                      onChange={onChangeHandler}
                      className={error ? `${style.input} ${style.error}` : style.input}
                      disabled={disabled}
                      autoFocus
                      placeholder={placeholderText}
                      style={{width: width, height: height}}
            />
        </>
    );
};

export default Textarea;