import React from 'react';
import { useState } from 'react';
import GuideToTest from '../../components/guide/guideToTestModal';
import guide2 from '../../assets/images/guide2.svg';
import think from '../../assets/images/thinkingTime.svg';
import wait from '../../assets/images/waiting.svg';
import record from '../../assets/images/recording.svg';
import answer from '../../assets/images/answeringTime.svg';
import refresh from '../../assets/images/refresh.svg';
import result from '../../assets/images/result.svg';
import style from './guide.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from "swiper";
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

SwiperCore.use([Navigation, Autoplay])

function Guide () {
  const [show, setShow] = useState(false);

  return (
    <div className={style.box}>
      <img src={guide2} className={style.currentPage} alt="profile" />
      <div className={style.swiperPosition}>
        <Swiper
          slidesPerView={2}
          navigation
          autoplay={{
              delay: 5000,
              disableOnInteraction: false
          }}
          className={style.swiper}
          style={{height : '420px'}}
        >
          <SwiperSlide className={style.imgBox}>
              <div className={style.imagespace}>
                <div>
                  <img src={think} alt="" style={{width: '240px'}}/>
                  <img src={wait} alt="" style={{width: '200px'}}/>
                </div>
                <p>
                  질문을 확인하고 30초동안 질문에 대한 답변을 고민해주세요.
                  <br/>
                  30초가 모두 넘어가야 답변시간이 주어집니다. 
                </p>
              </div>
          </SwiperSlide>
          <SwiperSlide className={style.imgBox}>
              <div className={style.imagespace}>
                <div>
                  <img src={answer} alt="" style={{width: '240px'}}/>
                  <img src={record} alt="" style={{width: '200px'}}/>
                </div>
                <p>
                  90초동안 질문에 대해서 답변해주세요.<br/>
                  15초 미만의 시간이 남았을 때 다음 질문으로 넘어갈 수 있습니다.
                </p>
              </div>
          </SwiperSlide>
          <SwiperSlide className={style.imgBox}>
              <div className={style.imagespace}>
                <div>
                  <img src={refresh} alt="" style={{width: '400px'}}/>
                </div>
                <p>
                  중도에 면접을 포기하고, 다시 시작하고 싶으신 경우에는 <br/>
                  종료하기 버튼을 눌러 메인 화면으로 돌아가실 수 있습니다.
                </p>
              </div>
          </SwiperSlide>  
          <SwiperSlide className={style.imgBox}>
              <div className={style.imagespace}>
                <img src={result} alt="" style={{width: '450px'}}/>
                <p>
                  총 5개의 질문들을 마친 후, 결과 분석 페이지로 이동합니다.<br/>
                  표정, 시선, 습관어 사용을 분석하여 결과를 제공합니다.
                </p>
              </div>
          </SwiperSlide>  
        </Swiper>
        <button onClick={() => setShow(true)} className={style.button}>면접 시작하기</button>
        <GuideToTest show={show} onHide={() => setShow(false)}/>
      </div>
    </div>
  );
}

export default Guide;