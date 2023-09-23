import Select from '@/components/select/Select.tsx';
import {ChangeEvent, useState} from 'react';
import style from './Comments.module.scss'
import Textarea from '@/components/textarea/Textarea.tsx';
import Button from '@/components/button/Button.tsx';
import {useAppDispatch, useAppSelector} from '@/hooks/useAppDispatch.ts';
import {addComment, changeLikes, CommentType} from '@/features/comments/commentsSlice.ts';
import ReplyForm from "@/components/reply-form/ReplyForm.tsx";
import InputPlusMinus from "@/components/input-plus-minus/InputPlusMinus.tsx";

export type UserType = {
    id: string
    src: string
    title: string
    label: string
} | undefined

const users = [
    {id: '1', src: 'juliusomo.png', title: 'juliusomo', label: 'you'},
    {id: '2', src: 'amyrobson.png', title: 'amyrobson', label: ''},
    {id: '3', src: 'maxblagun.png', title: 'maxblagun', label: ''},
    {id: '4', src: 'ramsesmiron.png', title: 'ramsesmiron', label: ''},
]

const Comments = () => {

    const [userId, setUserId] = useState<string>('1');
    const [commentText, setCommentText] = useState<string>('');
    const [replyText, setReplyText] = useState('');
    const [replyMode, setReplyMode] = useState<boolean>(false);
    const [replyId, setReplyId] = useState<string>('');
    const [replyUserName, setReplyUserName] = useState<string | undefined>('');
    const currentUser: UserType = users?.find(user => user.id === userId);

    const comments = useAppSelector(state => state.comment);
    const dispatch = useAppDispatch();
    const onClickSendHandler = () => {
        dispatch(addComment({user: currentUser, text: commentText}));
        setCommentText('')
    }
    const onClickReplyButtonHandler = () => {
        dispatch(addComment({user: currentUser, text: replyText, id: replyId}));
        setReplyMode(false)
        setReplyText('')
    }

    const CommentList =({comment}: {comment: CommentType}) => {
        const onClickReplyTextHandler = () => {
            setReplyMode(!replyMode)
            setReplyId(comment.id)
            setReplyUserName(comment.userName)
        }

        const onChangeReplyText = (e: ChangeEvent<HTMLTextAreaElement>) => {
            setReplyText(e.currentTarget.value);
            e.preventDefault()
        }

        // useEffect(() => {
        //     dispatch(changeLikes({likes: countLikeValue, id: replyId}))
        // }, [countLikeValue])

        return (
            <div key={comment.id}>
                <div className={replyMode && replyId === comment.id ? style.answer + ' ' + style.answer_replyMode : style.answer}>
                    <div className={style.answer__likes}>
                        <InputPlusMinus
                            value={comment.likes}
                            onClickPlus={() => dispatch(changeLikes({likes: comment.likes + 1, id: comment.id}))}
                            onClickMinus={() => dispatch(changeLikes({likes: comment.likes <= 0 ? comment.likes : comment.likes - 1, id: comment.id}))}
                            onChange={(e) => dispatch(changeLikes({likes: +e.currentTarget.value, id: comment.id}))}
                        />
                    </div>
                    <div className={style.answer__header}>
                        <div className={style.answer__UserInfo}>
                            <img src={comment.userAvatar} alt='avatar'/>
                            <span>{comment.userName}</span>
                            <div className={style.answer__button}>
                                <Button title={'Reply'}
                                        width='66px'
                                        bg={'transparent'}
                                        border={'none'}
                                        color={'#5357B6'}
                                        onClick={onClickReplyTextHandler}/>
                            </div>
                        </div>
                        <p className={style.answer__text}>{comment.text}</p>
                    </div>
                </div>
                {replyMode && replyId === comment.id ? <ReplyForm userSrc={currentUser?.src}
                                                                replyText={replyText}
                                                                setReplyText={onChangeReplyText}
                                                                replyUserName={replyUserName}
                                                                onClickReplyButtonHandler={onClickReplyButtonHandler}/>  : null}

                {comment.answers.map(comment => {
                    return (
                        <div className={style.answer_answer}>
                            <CommentList comment={comment}/>
                        </div>
                    )
                } )}
            </div>
        )
    }

    return (
        <>
            <Select onChangeHandler={(e) => setUserId(e.currentTarget.value)}
                    options={users}/>
            <section className={style.comments}>
                <div className={style.comments__wrapper}>
                    {comments.map(comment => <CommentList comment={comment}/>)}
                    <div className={style.comments__base}>
                        <img className={style.comments__img}
                             src={currentUser?.src}
                             width='40px'
                             height='40px'
                             alt='user-avatar'/>
                        <Textarea width='506px'
                                  height='96px'
                                  value={commentText}
                                  onChangeHandler={(e) => setCommentText(e.currentTarget.value)}
                                  placeholderText='Add a comment…'/>
                        <div className={style.comments__button}>
                            <Button title='SEND'
                                    border='none'
                                    onClick={onClickSendHandler}
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