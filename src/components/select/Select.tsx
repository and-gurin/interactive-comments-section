import style from './Select.module.scss';
import {ChangeEvent} from "react";
import {UserType} from "@/components/comments/Comments.tsx";

export type OptionsType = {
    id: string
    src: string
    title: string
    label: string
}

const Select = ({disabled, textLabel, options, value, onChangeHandler, placeholderText, width, id}:
                    {
                        disabled?: boolean
                        textLabel?: string
                        options?: UserType[]
                        error?: string
                        value?: string
                        onChangeHandler?: (e: ChangeEvent<HTMLSelectElement>) => void
                        placeholderText?: string
                        width?: string
                        id?: string
                    }
) => {

    const mappedOptions = options
        ? options.map((o) => (
            <option
                className={style.option}
                key={o?.id}
                value={o?.id}
            >
                {o?.title}
            </option>
        ))
        : []

    return (
        <div>
            {textLabel && <label htmlFor={id} className={style.textLabel}>{textLabel}</label>}
            <select value={value}
                    id={id}
                    onChange={onChangeHandler}
                    className={style.select}
                    disabled={disabled}
                    placeholder={placeholderText}
                    style={{width: width}}
            >
                {mappedOptions}
            </select>
        </div>
    );
};

export default Select;