import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import style from './test.module.css';

const url = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/681b25e4-6f4b-40a8-a6e6-293ec5390827/sample.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220509%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220509T113201Z&X-Amz-Expires=86400&X-Amz-Signature=35cc2897dd8df9976e0fae3038cb4faa79a2aa50b706bec585171077b15bba96&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22sample.json%22&x-id=GetObject'

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

function EndModal(props){
  return(
    <Modal
      {...props}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <p>마지막 질문입니다.</p>
        <p>결과화면으로 이동할까요?</p>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/report">
            <Button variant="outline-primary" className={style.button}>결과보기</Button>
        </Link>
        <Button variant="outline-primary" onClick={props.onHide} className={style.button}>계속 진행하기</Button>
      </Modal.Footer>
    </Modal>
  ); 
}

function Header(){
  const [question, setQuestion] = useState(1);
  const [second, setSecond] = useState(60);
  const [secondCheck, setSecondCheck] = useState(false);
  const [retryShow, setRetryShow] = useState(false);
  const [thinking, setThinking] = useState(true);
  const [endShow, setEndShow] = useState(false);
  const [content, setContent] = useState([]);

  const onClick = () => {
    if(thinking){
      // 생각시간은 못넘어가게 팝업 창 잠시 띄우기
    }
    else{
      if(second > 30){
        // 60초이상 지난 후 지나갈 수 있다는 팝업 창 잠시 띄우기
      }
      else{
        if(question < 5){
          setQuestion(question + 1);
          setSecond(60);
          setThinking(true);
          setSecondCheck(!secondCheck);
        }
        else{
          setEndShow(true);
        }
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond(second - 1)
    }, 1000);

    // endpoint  /question?no=
    // no=숫자 이 때 숫자는 params로 질문 번호 될 예정
    //url 뒤에 url + question으로 요청시킬거
    fetch(url).then(
      response=>{
        return response.json();
      }
    ).then(data=>{
      setContent(data);
    });

    if(question === 5 && second === -1 && !thinking){
      setEndShow(true);
      setSecond(0);
    }
    else{
      if(second === -1){
        setSecondCheck(!secondCheck);
        if(secondCheck){
          setSecond(60);
          setThinking(true);
          setQuestion(question + 1);
        }
        else{
          setSecond(90);
          setThinking(false);
        }
      }
    }
    return () => clearInterval(timer);
  },[question, second, thinking, secondCheck])

  return(
    <>
      <div className={style.article}>
        <h2 className={style.question}>Q{question}. {content.content} </h2>
        <div className={style.box2}>
        <h4>{second} {thinking ? "(생각시간)" : "(답변시간)"} </h4>
          <Button variant="outline-primary" onClick={onClick} className={style.button}>다음 질문</Button>
          <Button variant="outline-primary" onClick={() => setRetryShow(true)} className={style.button}>다시하기</Button>
          <RetryButton
            show={retryShow}
            onHide={() => setRetryShow(false)}
          />
          <EndModal
            show={endShow}
            onHide={() => setEndShow(false)}
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