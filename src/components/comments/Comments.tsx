import Select from '@/components/select/Select.tsx';
import {ChangeEvent, useState} from 'react';
import style from './Comments.module.scss'
import Textarea from '@/components/textarea/Textarea.tsx';
import Button from '@/components/button/Button.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks/useAppDispatch.ts';
import {
    addComment,
    changeLikes, changeUserLabel,
    CommentType,
    deleteComment,
    editComment
} from '@/features/comments/commentsSlice.ts';
import ReplyForm from "@/components/reply-form/ReplyForm.tsx";
import InputPlusMinus from "@/components/input-plus-minus/InputPlusMinus.tsx";
import ModalWindow from "@/components/modal-window/ModalWindow.tsx";
import {v1} from "uuid";

export type UserType = {
    id: string
    src: string
    title: string
    label: string
} | undefined

const users = [
    {id: v1(), src: 'juliusomo.png', title: 'juliusomo', label: ''},
    {id: v1(), src: 'amyrobson.png', title: 'amyrobson', label: ''},
    {id: v1(), src: 'maxblagun.png', title: 'maxblagun', label: ''},
    {id: v1(), src: 'ramsesmiron.png', title: 'ramsesmiron', label: ''},
]

const Comments = () => {

    const [userId, setUserId] = useState<string>(users[0].id);
    const [commentText, setCommentText] = useState<string>('');
    const [replyText, setReplyText] = useState('');
    const [replyMode, setReplyMode] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [isModalWindowOpen, setIsModalWindowOpen] = useState<boolean>(false);
    const [replyId, setReplyId] = useState<string>('');
    const [editableText, setEditableText] = useState<string>('');
    const [deletedCommentId, setDeletedCommentId] = useState<string>('');
    const [editCommentId, setEditCommentId] = useState<string>('');
    const [replyUserName, setReplyUserName] = useState<string | undefined>('');

    const currentUser: UserType = users?.find(user => user?.id === userId);

    const comments = useAppSelector(state => state.comment);
    const dispatch = useAppDispatch();

    const changeUserLabelHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setUserId(e.currentTarget.value);
        dispatch(changeUserLabel({id: e.currentTarget.value}))
    }
    const onChangeHandlerCommentText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(e.currentTarget.value)
    }
    const onClickSendCommentHandler = () => {
        dispatch(addComment({user: currentUser, text: commentText}));
        setCommentText('')
    }
    const onClickReplyButtonHandler = () => {
        dispatch(addComment({user: currentUser, text: replyText, id: replyId}));
        setReplyMode(false)
        setReplyText('')
    }
    const onClickDeleteCommentHandler = () => {
        dispatch(deleteComment({id: deletedCommentId}));
        setIsModalWindowOpen(false)
    }
    const passedTime = (date: number) => {
        const currentDate = Date.now();
        const offsetTime = currentDate - date
        const minutes: number | undefined = Math.floor(offsetTime / 1000 / 60);
        const hours: number | undefined = Math.floor(offsetTime / 1000 / 60 / 60);
        const days: number | undefined = Math.floor(offsetTime / 1000 / 60 / 60 / 24);

        return  minutes <= 60 && minutes >= 1 ? `${minutes} minute(s)`
            : hours <= 24 && hours >= 1 ? `${hours} hour(s)`
                : days <= 7 && days >= 1 ? `${days} day(s)` : 'less than minute';
    }

    const commentList = (comment: CommentType ) => {
        const onClickReplyTextHandler = () => {
            setReplyMode(!replyMode)
            setReplyId(comment.id)
            setReplyUserName(comment.userName)
        }

        const onClickEditCommentButton = () => {
            setEditMode(!editMode)
            setEditCommentId(comment.id)
            setEditableText(comment.text)
        }

        const onChangeReplyText = (e: ChangeEvent<HTMLTextAreaElement>) => {
            e.stopPropagation()
            setReplyText(e.currentTarget.value);
        }

        const onClickUpdateCommentHandler = () => {
            dispatch(editComment({id: comment.id, text: editableText}));
            setEditMode(false)
        }

        const onClickOpenModalWindowHandler = () => {
            setDeletedCommentId(comment.id)
            setIsModalWindowOpen(true)
        }

        return (
            <div key={comment.id}>
                <div
                    className={replyMode && replyId === comment.id ? style.answer + ' ' + style.answer_replyMode : style.answer}>
                    <div className={style.answer__likes}>
                        <InputPlusMinus
                            value={comment.likes}
                            onClickPlus={() => dispatch(changeLikes({likes: comment.likes + 1, id: comment.id}))}
                            onClickMinus={() => dispatch(changeLikes({likes: comment.likes <= 0 ? comment.likes : comment.likes - 1, id: comment.id}))}
                            onChange={(e) => dispatch(changeLikes({likes: +e.currentTarget.value, id: comment.id}))}
                        />
                    </div>
                    <div className={style.answer__UserInfo}>
                        <img src={comment.userAvatar} width='32px' height='32px' alt='avatar'/>
                        <span className={style.answer__name}>{comment.userName}</span>
                        {comment.label && <span className={style.answer__label}>{comment.label}</span>}
                        <span className={style.answer__date}>{`${passedTime(comment.date)} ago`}</span>
                    </div>
                    {comment?.label ? <div className={style.answer__button_edit}>
                        <Button title='Delete'
                                width='66px'
                                bg='transparent'
                                border='none'
                                color='#ED6368'
                                icon='trashbox.svg'
                                onClick={onClickOpenModalWindowHandler}/>
                        <Button title='Edit'
                                width='66px'
                                bg='transparent'
                                border='none'
                                color='#5357B6'
                                icon='pensil.svg'
                                onClick={onClickEditCommentButton}/>
                    </div> : <div className={style.answer__button}>
                        <Button title='Reply'
                                width='66px'
                                bg='transparent'
                                border='none'
                                color='#5357B6'
                                icon='reply.svg'
                                onClick={onClickReplyTextHandler}/>
                    </div>}
                    {editMode && editCommentId === comment.id ?
                        <div className={style.answer__text}>
                            <Textarea id={'12'}
                                      width='100%'
                                      height='96px'
                                      value={editableText}
                                      onChangeHandler={(e) => {setEditableText(e.currentTarget.value)}}/>
                            <div className={style.answer__button_update}>
                                <Button title='UPDATE'
                                        width='104px'
                                        height='48px'
                                        bg='#5357B6'
                                        border='none'
                                        color='#FFFFF'
                                        fontSize='16px'
                                        marginLeft='auto'
                                        borderRadius='8px'
                                        onClick={onClickUpdateCommentHandler}/>
                            </div>
                        </div>
                        : <div className={style.answer__text}><p>{comment.text}</p></div> }
                </div>
                {replyMode && replyId === comment.id ? <ReplyForm userSrc={currentUser?.src}
                                                                  replyText={replyText}
                                                                  setReplyText={onChangeReplyText}
                                                                  replyUserName={replyUserName}
                                                                  onClickReplyButtonHandler={onClickReplyButtonHandler}/> : null}

                {comment.answers.map(answer => {
                    return (
                        <div key={answer.id} className={style.reply}>
                            {commentList(answer)}
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <>
            {isModalWindowOpen && <ModalWindow setModalWindowMode={setIsModalWindowOpen}
                                               onClickDeleteComment={onClickDeleteCommentHandler}
            />}
            <Select onChangeHandler={(e) => changeUserLabelHandler(e)}
                    options={users}/>
            <section className={style.comments}>
                <div className={style.comments__wrapper}>
                    {comments.map(comment => commentList(comment))}
                    <div className={style.comments__base}>
                        <img className={style.comments__image}
                             src={currentUser?.src}
                             width='40px'
                             height='40px'
                             alt='user-avatar'/>
                        <div className={style.comments__texarea}>
                            <Textarea width='100%'
                                      id={'11'}
                                      value={commentText}
                                      height='96px'
                                      onChangeHandler={onChangeHandlerCommentText}
                                      placeholderText='Add a comment…'/>
                        </div>
                        <div className={style.comments__button}>
                            <Button title='SEND'
                                    border='none'
                                    onClick={onClickSendCommentHandler}
                                    borderRadius='8px'
                                    width='100%'
                                    fontSize='16px'
                                    fontWeight='500'
                                    height='48px'/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Comments;