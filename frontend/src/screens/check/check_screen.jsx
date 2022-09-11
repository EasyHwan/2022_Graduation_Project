import React from 'react';
import { useState } from 'react';
import guide1 from '../../assets/images/guide1.svg';
import style from './check.module.scss';
import Webcam from 'react-webcam';
import Switch from '@mui/material/Switch';


function Check () {
  const [isShowVideo, setIsShowVideo] = useState(false);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
  };

  const startCam = () => {
    !isShowVideo ?
    setIsShowVideo(true)
    :setIsShowVideo(false);
  }

  const goTo = () => {
    window.location.assign('/guide')
  }

  return (
    <div className={style.box}>
      <img src={guide1} className={style.currentPage} alt="profile" />
      {
        isShowVideo ? <Webcam className={style.cameraBox} audio videoConstraints={videoConstraints}/> 
        : <div className={style.emptySpace}/>
      }
      <div className={style.checkbox}>
        <div className={style.cameraCheck}>
          <Switch checked={isShowVideo} onChange={startCam} />
          카메라 / 마이크 권한 확인하기
        </div>
        <button onClick={goTo} className={style.button} disabled={!isShowVideo}>테스트 안내</button>
      </div>
    </div>
  );
}
  
export default Check;