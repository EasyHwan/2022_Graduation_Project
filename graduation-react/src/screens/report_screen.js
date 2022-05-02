import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import style from './report.module.css';

class Report extends Component {

  render() {
    return (
        <div className={style.box}>
          <div>
            <h4> 규빈 님의 면접 분석 결과입니다. </h4>
            <div>
              <div className={style.form}>
                <div className={style.leftform}>
                  <h4>면접 진행시간</h4>
                  <h4>면접 문항</h4>
                  <h4>표정 분석 등급</h4>
                  <h4>시선 처리 등급</h4>
                </div>
                <div className={style.rightform}>
                  <div>
                    <h3>총 평가</h3>
                    <h3>S 등급</h3>
                  </div>
                  <Button variant="outline-primary" className={style.button}>더 자세한 결과 보기</Button>
                </div>
              </div>
              <Link to="/">
                <Button variant="outline-primary" className={style.button}>다시하기</Button>
              </Link>
            </div>
          </div>
        </div>
    );
  }
}

export default Report;