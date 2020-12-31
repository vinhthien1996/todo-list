import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search/Search';
import style from './TodoList.module.css';
import List from './List/List';
import Message from './Message/Message';
import Total from './Total/Total';

export default function TodoList() {
    const dispatch = useDispatch();

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('task'));
        if (data) {
            dispatch({
                type: 'SET_TASK',
                data
            });
        }
    })

    const message = useSelector(state => state.TaskReducer.message);
    

    return (
        <div className={style.containerTodo}>
            {message.active === true ? <Message /> : ''}
            <Total />
            <Search />
            <List />
        </div>
    )
}
