import {createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {v1} from "uuid";
import {UserType} from "@/components/comments/Comments.tsx";

export type CommentType = {
    id: string
    userId: string | undefined
    userName: string | undefined
    userAvatar: string | undefined
    date: Date
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
          : comment.answers.length ? changeComment(comment.answers, id, handler ) : null
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
                    date: new Date(),
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

            },
        }
    }
)

export const {addComment, changeLikes} = cartSlice.actions;
export const commentsReducer = cartSlice.reducer