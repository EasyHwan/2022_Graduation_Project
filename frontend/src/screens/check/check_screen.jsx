import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import guide1 from '../../assets/images/guide1.svg';
import checkIcon from '../../assets/icons/check.png';
import falseIcon from '../../assets/icons/false.png';
import microphone from '../../assets/icons/microphone.png';
import vide_Camera from '../../assets/icons/video-camera.png';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,  } from 'react-bootstrap';
import style from './check.module.scss';
import Webcam from 'react-webcam';

function PermissionCheck () {
  const [camCheck, setCamCheck] = useState(false);
  const [micCheck, setMicCheck] = useState(false);
  
  useEffect(() => {
    navigator.permissions.query({name:'camera'}).then(function(result) {
      if (result.state === 'granted') {
        setCamCheck(true);
      } else{
        setCamCheck(false);
      }
    });
    navigator.permissions.query({name:'microphone'}).then(function(result) {
      if (result.state === 'granted') {
        setMicCheck(true);
      } else {
        setMicCheck(false);
      }
    });
  },[camCheck, micCheck])

  return (
    <>
      <Webcam className={style.cameraBox} audio />
      <div className={style.checkbox}>
        <div className={style.cameraCheck}>
          <img src={vide_Camera} className={style.cameraSize} alt="profile" />
          <h4 className={style.fontStyle}> 카메라 </h4>
          {
            camCheck ?
            <img src={checkIcon} className={style.cameraSize} alt="profile" />
            : <img src={falseIcon} className={style.cameraSize} alt="profile" />
          }
        </div>
        <div className={style.voiceCheck}>
          <img src={microphone} className={style.microphoneSize} alt="profile" />
          <h4 className={style.fontStyle}> 마이크 </h4>
          {
            micCheck ?
            <img src={checkIcon} className={style.cameraSize} alt="profile" />
            : <img src={falseIcon} className={style.cameraSize} alt="profile" />
          }
        </div>
      </div>
    </>
  );
}

class Main extends Component {

  render() {
    return (
      <div className={style.box}>
          <img src={guide1} className={style.currentPage} alt="profile" />
          <br/>
          <PermissionCheck/>
          <Link to="/guide">
            <Button className={style.button}>테스트 안내</Button>
          </Link>
      </div>
    );
  }
}
  
export default Main;