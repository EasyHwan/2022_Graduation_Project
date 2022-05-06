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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary"  onClick={props.onHide} className={style.button}>확인하였습니다.</Button>
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
          <h3> 안녕하세요. 규빈 님!! 면접 시작 전 안내사항을 확인해주세요. </h3>
          <div className={style.buttonBox}>
            <Button variant="outline-primary" onClick={() => this.setState({modalShow : true})} className={style.button}>안내사항</Button>
            <Link to="./check">
              <Button variant="outline-primary" className={style.button}>시작하기</Button>
            </Link>
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