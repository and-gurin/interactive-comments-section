import style from './Textarea.module.scss';
import {ChangeEvent} from "react";

const Textarea = ({disabled, value, onChangeHandler, placeholderText, width, id, height, className}:
                      {
                          disabled?: boolean
                          value?: string
                          onChangeHandler?: (e: ChangeEvent<HTMLTextAreaElement>) => void
                          placeholderText?: string
                          width?: string
                          id?: string
                          height: string
                          className?: string
                          isFocus?: boolean
                      }
) => {

    const onChangeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.stopPropagation();
        onChangeHandler?.(e)
    }

    return (
        <>
            <textarea value={value}
                      id={id}
                      onChange={onChangeTextarea}
                      className={style.input + ' ' + className}
                      disabled={disabled}
                      placeholder={placeholderText}
                      style={{width: width, height: height}}
            />
        </>
    );
};

export default Textarea;