import React from 'react';
import { Modal } from 'react-bootstrap';
import style from '../../screens/guide/guide.module.scss';
import axios from 'axios';
import { useState } from 'react';

const GuideToTest = (props) => {
    const [name, setName] = useState('');

    const goTo = () => {
        window.location.assign('./test')
    };

    const changeName = (e) => {
        setName(e.target.value);
    }

    const sendName = () => {
        axios.post('https://api.interview-please.ml/name', {
            'name' : name
        }).then((res) => {
            localStorage.setItem('name', res.data.msg)
            goTo();
        })
    }

    return(
        <Modal
            {...props}
            centered
        >
            <Modal.Body>
                <p>면접을 시작합니다!</p>
                <p>
                    성함을 입력하신 후, &nbsp;
                    <input className={style.inputStyle} type="text" maxLength='5'  onChange={changeName}/>
                </p>
                <p>마음의 준비가 되셨다면 '면접 시작하기' 버튼을 눌러주세요.</p>
            </Modal.Body>
            <Modal.Footer
                style={{
                    display: "flex",
                    justifyContent: 'center',
                }}
            >
                <button onClick={props.onHide} className={style.modalButton}>한번 더 확인하기</button>
                <button onClick={sendName} className={style.modalButton}>면접 시작하기</button>
            </Modal.Footer>
        </Modal>
    ); 
}

export default GuideToTest;