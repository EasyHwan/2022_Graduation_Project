import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import style from './main.module.css';

function InterviewGuideModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        프로그램 소개
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>1</h4>
        <p>
          면접은 총 5개의 질문으로 진행됩니다. 랜덤으로 선정한 질문들에 대한 답변을 준비해주세요.
        </p>
        <h4>2</h4>
        <p>
          AI 면접
        </p>
        <h4>3</h4>
        <p>
          이러쿵,
          저러쿵,
          찌리쿵
        </p>
        <h4>4</h4>
        <p>
          위 내용을 확인하셨다면 하단 버튼을 눌러주시고 진행해주세요!
          면접 환경 테스트 화면으로 넘어갑니다.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Link to="./check">
            <Button variant="outline-primary" className={style.button}>확인하고 진행하겠습니다.</Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

class Main extends Component {

  state = {
    modalShow : false
  }

  render() {
    return (
      <div className={style.box}>
        <div className={style.article}>
          <h1>면접을 부탁해~~</h1>
          <h3> 안녕하세요. 규빈 님!! 면접 시작을 위해 안내사항을 클릭해주세요. </h3>
          <div>
            <Button variant="outline-primary" onClick={() => this.setState({modalShow : true})} className={style.button}>안내사항</Button>
            <InterviewGuideModal
              show={this.state.modalShow}
              onHide={() => this.setState({modalShow : false})}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;