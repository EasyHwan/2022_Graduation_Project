import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import guide2 from '../../assets/images/guide2.svg';
import style from './guide.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay } from "swiper";
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'

SwiperCore.use([Navigation, Autoplay])

class Guide extends Component {

  render() {
    return (
      <div className={style.box}>
        <img src={guide2} className={style.currentPage} alt="profile" />
        <div className={style.swiperPos}>
            <Swiper
            slidesPerView={2}
            navigation
            autoplay={{
                delay: 5000,
                disableOnInteraction: false
            }}
            >
                <SwiperSlide className={style.imgBox}>
                    <div className={style.imagespace}>
                    질문을 확인하고 60초동안 질문에 대한 답변을 고민해주세요.<br/>
                    60초가 모두 넘어가야 답변시간이 주어집니다. 
                    </div>
                </SwiperSlide>
                <SwiperSlide className={style.imgBox}>
                    <div className={style.imagespace}>
                    표정, 시선, 습관어 사용을 분석하여 결과를 제공합니다. <br/>
                    실제 기업 문항들에 대한 답변을 대비할 수 있습니다.
                    </div>
                </SwiperSlide>
                <SwiperSlide className={style.imgBox}>
                    <div className={style.imagespace}>
                    표정, 시선, 습관어 사용을 분석하여 결과를 제공합니다. <br/>
                    실제 기업 문항들에 대한 답변을 대비할 수 있습니다.
                    </div>
                </SwiperSlide>  
                <SwiperSlide className={style.imgBox}>
                    <div className={style.imagespace}>
                    표정, 시선, 습관어 사용을 분석하여 결과를 제공합니다. <br/>
                    실제 기업 문항들에 대한 답변을 대비할 수 있습니다.
                    </div>
                </SwiperSlide>  
            </Swiper>
        </div>
        <Link to="/test">
            <Button className={style.button}>면접 시작하기</Button>
        </Link>
      </div>
    );
  }
}

export default Guide;