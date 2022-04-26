import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import style from './test.module.css';

function RetryButton(props) {
  return(
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <p>지금까지 진행사항은 기록되지 않습니다!!</p>
        <p>진행을 멈추고 시작화면으로 돌아갈까요??</p>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/">
            <Button variant="outline-primary" className={style.button}>다시하기</Button>
        </Link>
        <Button variant="outline-primary" onClick={props.onHide} className={style.button}>계속 진행하기</Button>
      </Modal.Footer>
    </Modal>
  ); 
}

function Header(){
  const [question, setQuestion] = useState(1);
  const [second, setCount] = useState(60);
  const [secondCheck, setSecondCheck] = useState(false);
  const [retryShow, setRetryShow] = useState(false);
  const [thinking, setThinking] = useState(true);

  const onClick = () => {
    setQuestion(question + 1);
    setCount(60);
    setThinking(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCount(second - 1)
    }, 1000);
    if(second === -1){
      setSecondCheck(!secondCheck);
      if(secondCheck){
        setCount(60);
        setThinking(true);
        setQuestion(question + 1);
      }
      else{
        setCount(90);
        setThinking(false);
      }
    }
    return () => clearInterval(timer);
  })

  return(
    <>
      <div className={style.article}>
        <h2 className={style.question}>Q{question}. 질문 내용 </h2>
        <div className={style.box2}>
        <h4>{second} {thinking ? "(생각시간)" : "(답변시간)"} </h4>
          <Button variant="outline-primary" onClick={onClick} className={style.button}>다음 질문</Button>
          <Button variant="outline-primary" onClick={() => setRetryShow(true)} className={style.button}>다시하기</Button>
          <RetryButton
            show={retryShow}
            onHide={() => setRetryShow(false)}
          />
        </div>
      </div>
    </>
  );
}

class Test extends Component {

  render() {
    return (
        <div>
          <div className={style.box}>
            <Header/>
            <div className={style.cameraScreen}>
              <h3>렌더링한 영상 화면</h3>
            </div>
          </div>
        </div>
    );
  }
}

export default Test;