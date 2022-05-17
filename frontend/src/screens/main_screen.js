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
          저희 면접의 부탁해와 함께 AI면접을 준비하러 오신 것을 환영합니다!!
        </p>
        <h4>2</h4>
        <p>
          AI면접은 시선, 표정, 억양 등 추상적인 평가 지표로 면접자를 평가합니다.
        </p>
        <h4>3</h4>
        <p>
          저희 면접을 부탁해는 AI면접 대비 과정에서 스스로 대비하기 어려운 위와 같은 평가 요소들을 분석하고 정량적인 결과를 확인하실 수 있게 도와줍니다.
        </p>
        <h4>4</h4>
        <p>
          스스로 분석 결과를 확인하시고 반복 연습을 통해 부족한 부분을 개선해 나가실 수 있습니다.
        </p>
        <h4>5</h4>
        <p>
          그럼 면접을 부탁해와 함께 취업의 첫 단추인 AI면접에서 좋은 결과 있으시기를 기원하겠습니다!
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