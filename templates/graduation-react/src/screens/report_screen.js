import React, { Component } from 'react';

class Report extends Component {

  render() {
    return (
        <div>
          <div>
            <h2> 규빈 님의 면접 분석 결과입니다. </h2>
            <div>
              <div>
                <h3>왼쪽에</h3>
                <h3>면접 진행시간</h3>
                <h3>면접 문항</h3>
                <h3>표정 분석 등급</h3>
              </div>
              <div>
                <h3>총 평가 우측에</h3>
                <h3>더 자세한 결과 내용</h3>
              </div>
            </div>
            <div>
              <h4>다시하기</h4>
              <h4>공유 버튼들</h4>
            </div>
          </div>
        </div>
    );
  }
}

export default Report;