import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import style from './main.module.css';

class Main extends Component {
  render() {
    return (
      <div className={style.box}>
        <div>
          <div className={style.article}>
            <h1>제목</h1>
            <h3> 안녕하세요. 규빈 님!! 면접 시작 전 면접 안내를 확인해주세요. </h3>
          </div>
          <div className={style.select}>
            <div>
              <Form.Select className={style.selectbox}>
                <option>시간 설정</option>
                <option value="1">5분</option>
                <option value="2">8분</option>
                <option value="3">10분</option>
                <option value="4">12분</option>
                <option value="5">15분</option>
              </Form.Select>
              <Form.Select className={style.selectbox}>
                <option>질문 최대 개수</option>
                <option value="1">5개</option>
                <option value="2">8개</option>
                <option value="3">10개</option>
              </Form.Select>
            </div>
          </div>
          <div className={style.buttonbox}>
            <Button variant="outline-primary" className={style.button}>면접 안내</Button>
            <Button variant="outline-primary" className={style.button}>시작하기</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;