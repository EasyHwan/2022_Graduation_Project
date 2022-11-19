import React, { Component } from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.module.scss';
import Main from './screens/main/main_screen';
import Test from './screens/test/test_screen';
import Report from './screens/report/report_screen';
import Check from './screens/check/check_screen';
import Guide from './screens/guide/guide_screen';
import { useMediaQuery } from "react-responsive";
import notPc from "./assets/images/notPcGuide.svg";

class App extends Component {
  render() {
    const Desktop = ({ children }) => {
      const isDesktop = useMediaQuery({ minWidth: 1024 })
      return isDesktop ? children : null
    }

    const Mobile = ({ children }) => {
      const isMobile = useMediaQuery({ maxWidth: 1023 })
      return isMobile ? children : null
    }

    return(
      <div>
        <Desktop>
          <BrowserRouter>
            <Routes> 
              <Route path="/" element={<Main />}/>
              <Route path="/check" element={<Check />}/>
              <Route path="/guide" element={<Guide />}/>
              <Route path="/test" element={<Test />}/>
              <Route path="/report" element={<Report />}/> 
            </Routes>
          </BrowserRouter>
        </Desktop>
        <Mobile>
          <div style={{
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            flexDirection : 'column',
            textAlign : 'center',
            marginTop : '100px',
            marginLeft : '20px',
            marginRight : '20px',
            fontFamily : 'NotoSansKR'
          }}>
            <img style={{width : '60vw', minWidth : '360px', marginBottom : '50px'}} src={notPc} alt=""></img>
            <p style={{fontSize : '30px', fontWeight : 'bold', marginBottom : '50px'}}>화면 크기가 너무 작습니다.</p>
            <p style={{fontSize : '20px'}}>'면접을 부탁해' 를 이용하기 위해서 브라우저 창을 최대로 키워주시고, 최소 화면 너비가 가로 1024px가 되도록 설정해주세요.</p>
          </div>
        </Mobile>
      </div>
    );
  }
}

export default App;
