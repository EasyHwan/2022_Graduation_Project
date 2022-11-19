import React from 'react';
import { Modal } from 'react-bootstrap';
import style from '../../screens/test/test.module.scss';

const EndModal = (props) => {
    const goTo = () => {
        localStorage.setItem("contents", JSON.stringify(props.contents));
        window.location.assign('./report');
    };

    return(
        <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Body className={style.modalBody}>
            <p>마지막 질문입니다.</p>
            <p>결과화면으로 이동할까요?</p>
        </Modal.Body>
        <Modal.Footer
            style={{
                display: "flex",
                justifyContent: "center",
            }}
        >
            <button onClick={goTo} className={style.button}>결과보기</button>
            <button onClick={props.onHide} className={style.button}>계속 진행하기</button>
        </Modal.Footer>
        </Modal>
    ); 
}

export default EndModal;