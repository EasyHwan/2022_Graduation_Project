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
        <h4>60초 동안의 면접 답변 고민시간</h4>
        <p>
          면접이 시작되면 곧바로 첫 질문이 주어집니다!
          질문을 확인하고 60초동안 질문에 대한 답변을 고민해주세요!
        </p>
        <h4>90초 동안의 면접 답변시간</h4>
        <p>
          60초의 고민하는 시간이 지난 뒤 실제 답변을 기록하기 시작합니다.
          90초 동안 자유롭게 질문에 대해서 답변을 진행해주시고, 밝은 표정을 유지해주세요!
        </p>
        <h4>진지한 자세</h4>
        <p>
          면접이 진행되는 동안 진지한 자세로 임해주세요. 
          면접 안내에 맞춰 올바르게 진행해주실수록 보다 더 정확한 측정 결과를 확인할 수 있습니다!
          그럼 준비가 되셨다면 버튼을 눌러 진행해주세요!
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