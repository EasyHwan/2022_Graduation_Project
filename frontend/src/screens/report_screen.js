import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import style from './report.module.css';

const url = 'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d46e4d9c-6d6d-438d-86b2-ef19867ff3be/resultSample.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220710%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220710T071230Z&X-Amz-Expires=86400&X-Amz-Signature=1e33312a0b46c6aa6d95597f871c78d0d4278b962816c7f6b031c509fb6676e2&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22resultSample.json%22&x-id=GetObject'

function TabBar() {
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
              <div>
                <h2 style={{fontWeight : 'bold'}}>총 평가</h2>
                <label style={{color : '#408CFF', fontWeight : 'bold', fontSize : 40}}>S&nbsp;</label>
                <label style={{fontSize : 30}}>등급</label>
              </div>
              <div className={style.scoreBox}>
                <div>
                  <h4 style={{fontWeight : 'bold'}}>표정 분석</h4>
                  <label style={{fontWeight : 'bold', fontSize : 20}}>{result.emotionScore}&nbsp;</label><label style={{fontSize : 20}}>등급</label>
                  <p>{result.emotionSummary}</p>
                </div>
                <div>
                  <h4 style={{fontWeight : 'bold'}}>시선 처리</h4> 
                  <label style={{fontWeight : 'bold', fontSize : 20}}>{result.gazeScore}&nbsp;</label><label style={{fontSize : 20}}>등급</label>
                  <p>{result.gazeSummary}</p>
                </div>
                <div>
                  <h4 style={{fontWeight : 'bold'}}>습관어 처리</h4>
                  <label style={{fontWeight : 'bold', fontSize : 20}}>{result.languageScore}&nbsp;</label><label style={{fontSize : 20}}>등급</label>
                  <p>{result.languageSummary}</p>
                </div>
              </div>
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
            <TabBar/>
          </div>
          <Link to="/">
            <Button className={style.button}>처음 화면으로 돌아가기</Button>
          </Link>
        </div>
    );
  }
}

export default Report;