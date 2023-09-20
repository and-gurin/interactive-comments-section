import Select from '@/components/select/Select.tsx';
import {useState} from 'react';
import style from './Comments.module.scss'
import Textarea from "@/components/textarea/Textarea.tsx";
import Button from "@/components/button/Button.tsx";

const users = [
    {id: '1', src: 'juliusomo.png', title: 'juliusomo', label: 'you'},
    {id: '2', src: 'amyrobson.png', title: 'amyrobson', label: ''},
    {id: '3', src: 'maxblagun.png', title: 'maxblagun', label: ''},
    {id: '4', src: 'ramsesmiron.png', title: 'ramsesmiron', label: ''},
]

const Comments = () => {

const [userId, setUserId] = useState<string>('1');
const currentUser = users?.find(user => user.id === userId);

    return (
        <>
            <section className={style.comments}>
                <div className={style.comments__base}>
                    <img src={currentUser?.src} width='40px' height='40px' alt='user-avatar'/>
                    <Textarea width='506px'
                              height='96px'
                              placeholderText='Add a comment…'/>
                    <Button title='SEND' border='none' borderRadius='8px' width='104px' height='48px'/>
                </div>
            </section>
            <Select onChangeHandler={(e) => setUserId(e.currentTarget.value)}
                    options={users}/>
        </>

    );
};

export default Comments;