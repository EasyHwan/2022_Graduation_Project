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
        면접 안내
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>1</h4>
        <p>
          총 5개의 질문
        </p>
        <h4>2</h4>
        <p>
          이러쿵,
          저러쿵,
          찌리쿵
        </p>
        <h4>3</h4>
        <p>
          이러쿵,
          저러쿵,
          찌리쿵
        </p>
        <h4>4</h4>
        <p>
          이러쿵,
          저러쿵,
          찌리쿵
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Link to="./check">
            <Button variant="outline-primary" className={style.button}>확인하고 시작하겠습니다.</Button>
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
            <h1>면접을 부탁해~~</h1>
            <h3> 안녕하세요. 규빈 님!! 면접 시작 전 면접 안내를 확인해주세요. </h3>
          </div>

          <div className={style.buttonbox}>
            <Button variant="outline-primary" onClick={() => this.setState({modalShow : this.state.modalShow = true})} className={style.button}>면접 안내</Button>
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