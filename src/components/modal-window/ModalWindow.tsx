import style from "./ModalWindow.module.scss";
import Button from "@/components/button/Button.tsx";

const ModalWindow = ({setModalWindowMode, onClickDeleteComment}:
                         {
                             setModalWindowMode: (modalWindowMode: boolean) => void
                             onClickDeleteComment: () => void
                         }) => {
    return (
        <>
            <div className={style.darkBG} onClick={() => setModalWindowMode(false)}/>
            <div className={style.centered}>
                <div className={style.modal}>
                    <h5 className={style.heading}>Delete comment</h5>
                    <div className={style.modalContent}>
                        Are you sure you want to delete this comment? This will remove the comment and can’t be undone.
                    </div>
                    <div className={style.buttons}>
                        <Button title='NO, CANCEL'
                                width='161px'
                                height='48px'
                                bg='#67727E'
                                border='none'
                                color='#FFFFF'
                                fontSize='16px'
                                borderRadius='8px'
                                onClick={() => setModalWindowMode(false)}/>
                        <Button title='YES, DELETE'
                                width='161px'
                                height='48px'
                                bg='#ED6368'
                                border='none'
                                color='#FFFFF'
                                fontSize='16px'
                                borderRadius='8px'
                                onClick={onClickDeleteComment}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalWindow;