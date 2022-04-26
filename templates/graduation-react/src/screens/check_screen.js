import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal } from 'react-bootstrap';
import style from './check.module.css';

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
          면접 진행 과정
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>1</h4>
        <p>
          60초 동안의 면접 질문 답변 고민 시간
        </p>
        <h4>2</h4>
        <p>
          90초 동안의 면접 답변 시간
        </p>
        <h4>3</h4>
        <p>
          반듯한 자세 유지하기
        </p>
        <h4>4</h4>
        <p>
          준비가 되셨다면 버튼을 눌러 진행해주세요!
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Link to="/test">
            <Button variant="outline-primary" className={style.button}>시작합니다!</Button>
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
        <div>
          <div className={style.article}>
            <h3> 면접 환경 테스트 화면입니다. </h3>
          </div>
          <div className={style.buttonbox}>
            <Button variant="outline-primary" onClick={() => this.setState({modalShow : this.state.modalShow = true})} className={style.button}>시작하기</Button>
            <InterviewGuideModal
              show={this.state.modalShow}
              onHide={() => this.setState({modalShow : this.state.modalShow = false})}
            />
          </div>
        </div>
      </div>
    );
  }
}
  
export default Main;