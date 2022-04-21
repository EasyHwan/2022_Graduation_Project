import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import style from './test.module.css';

class Test extends Component {

  render() {
    return (
        <div>
          <div className={style.box}>
            <div className={style.article}>
              <h2 className={style.question}>Q1. 질문 내용</h2>
              <div className={style.box2}>
                <h4>우측 상단에 타이머</h4>
                <Button variant="outline-primary" className={style.button}>다음 질문</Button>
                <Button variant="outline-primary"className={style.button}>면접 포기</Button>
              </div>
            </div>
            <div className={style.cameraScreen}>
              <h3>렌더링한 영상 화면</h3>
            </div>
          </div>
        </div>
    );
  }
}

export default Test;