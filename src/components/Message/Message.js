import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './Message.module.css';

export default function Message() {

    const message = useSelector(state => state.TaskReducer.message);
    const dispatch = useDispatch();
    const bg = message.type === 'danger' ? { backgroundColor: '#f5365c' } : { backgroundColor: '#68c15f' };

    return (
        <div className={style.containerMessage} style={bg}>
            {message.type === 'danger' ? <i className="fa fa-exclamation-circle"></i> : <i className="fa fa-check-circle"></i>} {message.content}
            <div className={style.closeMessage} onClick={() => {
                dispatch({
                    type: 'CLOSE_MESSAGE'
                });
            }}><i className="fa fa-times"></i></div>
        </div>
    )
}
