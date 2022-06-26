import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import style from './main.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from "swiper";
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

SwiperCore.use([Navigation, Autoplay])

class Main extends Component {

  render() {
    return (
      <div className={style.box}>
          <div className={style.article}> 
            <p className={style.article1}>면접을 부탁해</p>
            <p className={style.article2}>합격을 위해 연습해 보세요!</p>
            <Link to="./check">
              <Button className={style.buttonBox}>바로 시작하기</Button>
            </Link>
          </div>
          <Swiper
            style={{width : '50%', position : 'absolute', right : '8%', top: '25%'}}
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
          {/* <div className={style.slideBox}>
            <div className={style.imagespace}></div>
            <div className={style.lefttop}></div>
            <div className={style.righttop}></div>
            <div className={style.leftbottom}></div>
            <div className={style.rightbottom}></div>
            <button className={style.rightButton}></button>
            <button className={style.leftButton}></button>
          </div> */}
      </div>
    );
  }
}

export default Main;