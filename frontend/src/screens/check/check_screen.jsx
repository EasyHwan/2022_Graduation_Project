import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button,  } from 'react-bootstrap';
import style from './check.module.css';
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
          <img src = "images/video-camera.png" className={style.cameraSize} alt="profile" />
          <h4 className={style.fontStyle}> 카메라 </h4>
          {
            camCheck ?
            <img src = "images/check.png" className={style.cameraSize} alt="profile" />
            : <img src = "images/false.png" className={style.cameraSize} alt="profile" />
          }
        </div>
        <div className={style.voiceCheck}>
          <img src = "images/microphone.png" className={style.microphoneSize} alt="profile" />
          <h4 className={style.fontStyle}> 마이크 </h4>
          {
            micCheck ?
            <img src = "images/check.png" className={style.cameraSize} alt="profile" />
            : <img src = "images/false.png" className={style.cameraSize} alt="profile" />
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
          <img src = "images/currentPage1.png" className={style.currentPage} alt="profile" />
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