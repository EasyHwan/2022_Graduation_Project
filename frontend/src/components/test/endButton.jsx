import React from 'react';
import { Modal } from 'react-bootstrap';
import style from '../../screens/test/test.module.scss';

const EndButton = (props) => {
    const goMain = () => {
      window.location.assign('/')
    };
  
    return(
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className={style.modalBody}>
          <p>지금까지 진행사항은 기록되지 않습니다!</p>
          <p>진행을 멈추고 시작화면으로 돌아갈까요?</p>
        </Modal.Body>
        <Modal.Footer 
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <button onClick={goMain} className={style.modalButton}>종료하기</button>
          <button onClick={props.onHide} className={style.modalButton}>계속 진행하기</button>
        </Modal.Footer>
      </Modal>
    ); 
  }

  export default EndButton;