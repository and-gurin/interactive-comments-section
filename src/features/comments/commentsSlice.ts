import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import {UserType} from "@/components/comments/Comments.tsx";

export type CommentType = {
    id: string
    userId: string | undefined
    userName: string | undefined
    userAvatar: string | undefined
    label: string | undefined
    date: number
    text: string
    likes: number
    answers: CommentType[]
}

const initialState: CommentType[] = [];

const changeComment = (state: CommentType[],
                       id: string,
                       handler: (state: CommentType[], index: number) => void) => {

    state.forEach((comment, index) => {
        comment.id === id ? handler(state, index)
            : comment.answers.length ? changeComment(comment.answers, id, handler) : null
    })
}

const changeUser = (state: CommentType[],
                    userId: string,
                    handler: (state: CommentType[], index: number) => void) => {

    state.forEach((comment, index) => {
        if (comment.userId === userId) {
            handler(state, index)
        }
        else if (comment.answers.length) {
            changeUser(comment.answers, userId, handler)
        }
        else {
            comment.label = ''
        }
    })
}

export const cartSlice = createSlice({
        name: 'products',
        initialState,
        reducers: {
            addComment: (state,
                         action: PayloadAction<{ user: UserType, text: string, id?: string }>) => {
                const newComment: CommentType = {
                    id: v1(),
                    userId: action.payload.user?.id,
                    userName: action.payload.user?.title,
                    userAvatar: action.payload.user?.src,
                    label: 'you',
                    date: Date.now(),
                    text: action.payload.text,
                    likes: 0,
                    answers: []
                }
                const addAnswerHandler = (state: CommentType[], index: number) => {
                    state[index].answers.unshift(newComment)
                }
                !action.payload.id ? state.unshift(newComment)
                    : changeComment(state, action.payload.id, addAnswerHandler);
            },
            changeLikes: (state,
                          action: PayloadAction<{ likes: number, id: string }>) => {
                const changeLikesHandler = (state: CommentType[], index: number) => {
                    state[index].likes = action.payload.likes
                    console.log(current(state[index]))
                }
                if (action.payload.likes > 0) {
                    changeComment(state, action.payload.id, changeLikesHandler);
                }

                console.log(current(state))
            },
            editComment: (state,
                          action: PayloadAction<{ text: string, id: string }>) => {
                const editCommentHandler = (state: CommentType[], index: number) => {
                    state[index].text = action.payload.text
                }
                changeComment(state, action.payload.id, editCommentHandler);
            },
            deleteComment: (state,
                            action: PayloadAction<{ id: string }>) => {
                const editCommentHandler = (state: CommentType[], index: number) => {
                    state.splice(index, 1)
                }
                changeComment(state, action.payload.id, editCommentHandler);
            },
            changeUserLabel: (state,
                              action: PayloadAction<{ id: string }>) => {
                const changeUserLabelHandler = (state: CommentType[], index: number) => {
                    state[index].label = 'you'
                }
                changeUser(state, action.payload.id, changeUserLabelHandler);
            },
        }
    }
)

export const {
    addComment,
    changeLikes,
    deleteComment,
    editComment,
    changeUserLabel
} = cartSlice.actions;
export const commentsReducer = cartSlice.reducer