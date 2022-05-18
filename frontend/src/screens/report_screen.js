import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import style from './report.module.css';

const url = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d46e4d9c-6d6d-438d-86b2-ef19867ff3be/resultSample.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220517%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220517T115040Z&X-Amz-Expires=86400&X-Amz-Signature=4c368877a0f59a4a029f49998606e6a3fc6c13fea938cae130619e148ab62b39&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22resultSample.json%22&x-id=GetObject'

function Score(){
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch(url).then(
      response=>{
        return response.json();
      }
    ).then(data=>{
      setResult(data.result);
    });
  },[])

  return(
      <div className={style.form}>
        <div className={style.leftform}>
          <h4>면접 진행시간</h4>
          <h4>면접 문항</h4>
          <div>
            <h4>표정 분석 등급 : {result.emotionScore}</h4>
            <h5>평가 내용 : {result.emotionSummary}</h5>
          </div>
          <div>
            <h4>시선 처리 등급 : {result.gazeScore}</h4> 
            <h5>평가 내용 : {result.gazeSummary}</h5>
          </div>
          <div>
            <h4>시선 처리 등급 : {result.languageScore}</h4>
            <h5>평가 내용 : {result.languageSummary}</h5>
          </div>
        </div>
        <div className={style.rightform}>
          <div>
            <h3>총 평가</h3>
            <h3>S 등급</h3>
          </div>
          <Button variant="outline-primary" className={style.button}>더 자세한 결과 보기</Button>
        </div>
      </div>
  );
}

class Report extends Component {

  render() {
    return (
        <div className={style.box}>
          <div>
            <h4> 규빈 님의 면접 분석 결과입니다. </h4>
            <div>
              <Score/>
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