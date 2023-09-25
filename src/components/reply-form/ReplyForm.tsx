import style from './ReplyForm.module.scss';
import Textarea from '@/components/textarea/Textarea.tsx';
import Button from '@/components/button/Button.tsx';
import {ChangeEvent} from "react";

const ReplyForm = ({userSrc, replyText, setReplyText, replyUserName, onClickReplyButtonHandler}:
                       {
                           userSrc: string | undefined
                           replyText: string
                           setReplyText: (e: ChangeEvent<HTMLTextAreaElement>) => void
                           replyUserName: string | undefined
                           onClickReplyButtonHandler: () => void
                       }) => {

    return (
        <div key={userSrc} className={style.reply}>
            <img className={style.reply__img}
                 src={userSrc}
                 width='40px'
                 height='40px'
                 alt='user-avatar'/>
            <div className={style.reply__textarea}>
                <Textarea width='100%'
                          height='96px'
                          value={replyText}
                          onChangeHandler={setReplyText}
                          placeholderText={`@ ${replyUserName}`}/>
            </div>
            <div className={style.reply__button}>
                <Button title='REPLY'
                        border='none'
                        onClick={onClickReplyButtonHandler}
                        borderRadius='8px'
                        fontSize='16px'
                        fontWeight='500'
                        width='100%'
                        height='48px'/>
            </div>
        </div>
    );
};

export default ReplyForm;