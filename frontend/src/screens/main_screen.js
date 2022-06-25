import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import style from './main.module.css';

class Main extends Component {

  render() {
    return (
      <div className={style.box}>
        <div>
          <div className={style.article}> 
            <p className={style.article1}>면접을 부탁해</p>
            <p className={style.article2}>합격을 위해 연습해 보세요!</p>
          </div>
          <div>
            <div className={style.imagespace}></div>
            <div className={style.lefttop}></div>
            <div className={style.righttop}></div>
            <div className={style.leftbottom}></div>
            <div className={style.rightbottom}></div>
            <button className={style.rightButton}></button>
            <button className={style.leftButton}></button>
          </div>
          <div>
            <Link to="./check">
              <Button className={style.buttonBox}>바로 시작하기</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;