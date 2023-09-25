import style from './Textarea.module.scss';
import {ChangeEvent} from "react";

const Textarea = ({disabled, textLabel, value, onChangeHandler, placeholderText, width, id, height, className}:
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
                          className?: string
                      }
) => {

    return (
        <>
            {textLabel && <label htmlFor={id} className={style.textLabel}>{textLabel}</label>}
            <textarea value={value}
                      id={id}
                      onChange={onChangeHandler}
                      className={style.input + ' ' + className}
                      disabled={disabled}
                      autoFocus
                      placeholder={placeholderText}
                      style={{width: width, height: height}}
            />
        </>
    );
};

export default Textarea;