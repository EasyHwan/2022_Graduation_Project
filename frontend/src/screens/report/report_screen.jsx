import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import guide4 from '../../assets/images/guide4.svg';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import style from './report.module.scss';

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
        justify
        className="mb-3"
      >
        <Tab eventKey="evaluate1" title="종합 총평">
          <div className={style.Evaluate}>
            <div className={style.contentEvaluate}>
              <div>
                <h1 style={{fontWeight : 'bold'}}>총 평가</h1>
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
            <div className={style.contentEvaluate2}>
              <div className={style.detailContent}>
                <h4 style={{fontWeight : 'bold', color : '#408CFF', fontSize : 35}}>표정 분석</h4>
                <label style={{fontWeight : 'bold', fontSize : 24}}>B&nbsp;</label><label style={{fontSize : 24}}>등급</label>
                <br/>
                <br/>
                <label style={{fontWeight : 'bold', fontSize : 20}}>3번 - 당신의 인생에서 가장 중요했던 순간은 언제였는지 이에 대해 소개해주세요.</label>
                <p style={{fontWeight : 'bold'}}>답변 시간 - 68초</p>
                <p>3번 질문의 답변 도중 표정유지가 적절하게 이루어지지 못하였습니다. 답변을 하면서 밝은 표정을 유지하여야 하는 점을 유의해주세요. 밝은 표정이 유지되었던 비율이 52.3%로 대체로 낮은 평가를 받았습니다. 답변에서 키워드가 무엇인지 고민하고 이에 자신감있는 어투와 함께 표정을 개선해보세요! </p>
                <br/>
                <label style={{fontWeight : 'bold', fontSize : 20}}>5번 - 자신을 형용사로 표현한다면 어떤 단어로 표현할 수 있을까요?</label>
                <p style={{fontWeight : 'bold'}}>답변 시간 - 68초</p>
                <p>5번 질문의 답변 도중 표정유지가 적절하게 이루어지지 못하였습니다. 답변을 하면서 밝은 표정을 유지하여야 하는 점을 유의해주세요. 밝은 표정이 유지되었던 비율이 52.3%로 대체로 낮은 평가를 받았습니다. 답변에서 키워드가 무엇인지 고민하고 이에 자신감있는 어투와 함께 표정을 개선해보세요! </p>
              </div>
              <div className={style.detailContent}>
                <h4 style={{fontWeight : 'bold', color : '#408CFF', fontSize : 35}}>시선 처리</h4>
                <label style={{fontWeight : 'bold', fontSize : 24}}>B&nbsp;</label><label style={{fontSize : 24}}>등급</label>
                <br/>
                <br/>
                <label style={{fontWeight : 'bold', fontSize : 20}}>3번 - 당신의 인생에서 가장 중요했던 순간은 언제였는지 이에 대해 소개해주세요.</label>
                <p style={{fontWeight : 'bold'}}>답변 시간 - 68초</p>
                <p>3번 질문의 답변 도중 표정유지가 적절하게 이루어지지 못하였습니다. 답변을 하면서 밝은 표정을 유지하여야 하는 점을 유의해주세요. 밝은 표정이 유지되었던 비율이 52.3%로 대체로 낮은 평가를 받았습니다. 답변에서 키워드가 무엇인지 고민하고 이에 자신감있는 어투와 함께 표정을 개선해보세요! </p>
                <br/>
                <label style={{fontWeight : 'bold', fontSize : 20}}>5번 - 자신을 형용사로 표현한다면 어떤 단어로 표현할 수 있을까요?</label>
                <p style={{fontWeight : 'bold'}}>답변 시간 - 68초</p>
                <p>5번 질문의 답변 도중 표정유지가 적절하게 이루어지지 못하였습니다. 답변을 하면서 밝은 표정을 유지하여야 하는 점을 유의해주세요. 밝은 표정이 유지되었던 비율이 52.3%로 대체로 낮은 평가를 받았습니다. 답변에서 키워드가 무엇인지 고민하고 이에 자신감있는 어투와 함께 표정을 개선해보세요! </p>
              </div>
              <div className={style.detailContent}>
                <p style={{fontWeight : 'bold', color : '#408CFF', fontSize : 35}}>습관어 처리</p>
                <label style={{fontWeight : 'bold', fontSize : 24}}>S&nbsp;</label><label style={{fontSize : 24}}>등급</label>
                <br/>
                <br/>
                <p>모든 질문에서 좋은 평가를 받았습니다. 본 프로그램에서 측정되는 습관어는 ‘음, 어, 살짝, 진짜' 등 으로 반복적인 단어가 발생하지 않았습니다. 계속 연습한다면 AI 면접에서 좋은 평가를 받으실 수 있습니다.</p>
              </div>
              <div style={{textAlign : 'center', marginBottom : 30, marginTop : 50}}>
                <Button className={style.button}>결과 pdf 다운 받기</Button>
              </div>
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
          <img src={guide4} className={style.currentPage} alt="profile" />
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