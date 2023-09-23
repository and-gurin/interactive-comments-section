import {AnyAction, combineReducers, configureStore, ThunkDispatch} from '@reduxjs/toolkit';
import {commentsReducer} from '@/features/comments/commentsSlice.ts';

const rootReducer = combineReducers({
    comment: commentsReducer
});

export const store = configureStore({
    reducer: rootReducer
})

export type RootStateType = ReturnType<typeof rootReducer>;
//export type AppDispatch = typeof store.dispatch;
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>;
//export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;