import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
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
          <Button className={style.button}>더 자세한 결과 보기</Button>
        </div>
      </div>
  );
}

function JustifiedExample() {
  return (
    <div >
      <Tabs
        defaultActiveKey="evaluate1"
        id="justify-tab-example"
        justify
        className={style.form}
      >
        <Tab eventKey="evaluate1" title="종합 총평">
          <div className={style.Evaluate}>
            <div className={style.contentEvaluate}>
              <label>총 평가</label>
            </div>
          </div>
        </Tab>
        <Tab eventKey="evaluate2" title="세부 분석">
          <div className={style.Evaluate}>
            <div className={style.contentEvaluate}>
              <label>세부 항목</label>
            </div>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}


class Report extends Component {

  render() {
    return (
        <div className={style.box}>
          <img src = "images/currentPage4.png" className={style.currentPage} alt="profile" />
          <div className={style.reportForm}>
            <JustifiedExample/>
          </div>
          <Link to="/">
            <Button className={style.button}>처음 화면으로 돌아가기</Button>
          </Link>
        </div>
    );
  }
}

export default Report;