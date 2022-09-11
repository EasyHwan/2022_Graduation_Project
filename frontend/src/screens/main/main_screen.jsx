import React, { Component } from 'react';
import style from './main.module.scss';
import frame1 from '../../assets/images/frame1.svg';
import frame2 from '../../assets/images/frame2.svg';
import frame3 from '../../assets/images/frame3.svg';
import frame4 from '../../assets/images/frame4.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from "swiper";
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

SwiperCore.use([Navigation, Autoplay])

class Main extends Component {

  render() {

    const goTo = () => {
      window.location.assign('./check')
    }

    return (
      <div className={style.box}>
        <div className={style.article}> 
          <div style={{textAlign : 'left'}}>
            <p className={style.article1}>면접을 부탁해</p>
            <p className={style.article2}>합격을 위해 연습해 보세요!</p>
          </div>
          <div>
            <button className={style.button} onClick={goTo}>바로 시작하기</button>
          </div>
        </div>
        <div>
          <div style={{ display : 'flex', justifyContent : 'space-between'}}> 
            <img src={frame3} alt=""/>
            <img src={frame4} alt=""/>
          </div>
          <Swiper
            style={{width : '700px',}}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
          >
            <SwiperSlide>
              <div className={style.imgBox}>
                <div className={style.imagespace} />
              </div>
              <br/>
              ‘면접을 부탁해’에 오신 것을 환영합니다! <br/>
              ‘면접을 부탁해’는 ‘AI 면접 준비 프로그램’입니다.
            </SwiperSlide>
            <SwiperSlide>
              <div className={style.imgBox}>
                <div className={style.imagespace} />
              </div>
              <br/>
              표정, 시선, 습관어 사용을 분석하여 결과를 제공합니다. <br/>
              실제 기업 문항들에 대한 답변을 대비할 수 있습니다.
            </SwiperSlide>
            <SwiperSlide>
              <div className={style.imgBox}>
                <div className={style.imagespace} />
              </div>
              <br/>
              취업을 위한 한걸음을 나서기 위해 저희와 함께 하세요! <br/>
              좋은 결과를 위한 모의 면접을 무제한으로 연습하세요!
            </SwiperSlide>  
          </Swiper>
          <div style={{display : 'flex', justifyContent : 'space-between'}}> 
            <img src={frame2} alt=""/>
            <img src={frame1} alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;