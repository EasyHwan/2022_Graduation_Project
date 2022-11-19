import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import guide3 from '../assets/images/guide3.svg';
import wait from '../assets/images/waiting.svg';
import record from '../assets/images/recording.svg';
import EndButton from '../components/test/endButton';
import EndModal from '../components/test/endModal';
import AudioAnalyser from "react-audio-analyser";
import style from '../screens/test/test.module.scss';

const CONSTRAINTS = { video: true };

let videoMediaStream = null;

let videoRecorder = null;
let videoBlob = null;

const UseTestTimer = () => {
    const videoRef = useRef(null);
    const [question, setQuestion] = useState(1);
    const [second, setSecond] = useState(5);
    const [secondCheck, setSecondCheck] = useState(false);
    const [thinking, setThinking] = useState(true);
    const [endShow, setEndShow] = useState(false);
    const [content, setContent] = useState("");
    const [contents, setContents] = useState(["본인에 대한 자기소개를 해주세요!"]);
    const name = localStorage.getItem('name');
  
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
      if (videoRef && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;
        videoMediaStream = stream;
      }
    };
  
    const VideoCaptureStart = () => {
      if (navigator.mediaDevices.getUserMedia) {
        console.log("녹화 시작");
        let videoData = [];
  
        videoRecorder = new MediaRecorder(videoMediaStream, {
          mimeType: "video/webm; codecs=vp9",
        });  
        videoRecorder.ondataavailable = (event) => {
          if (event.data?.size > 0) {
            videoData.push(event.data);
          }
        } 
        videoRecorder.onstop = () => {
          videoBlob = new Blob(videoData, {type: "video/webm"});
          sendGaze(videoBlob);
          sendFace(videoBlob);
          console.log(videoBlob)
          console.log('녹화 완료');
        }
        videoRecorder.start();  
      }
    };
  
    const VideoCaptureEnd = () => {
      if(videoRecorder){
        videoRecorder.stop();
        videoRecorder = null;
      }
    };
  

    const sendGaze = (blob) => {
      if (blob == null) return;
      let filename = `gaze${question}.webm`;  
      let fd = new FormData();
      fd.append('data', blob, filename);
  
      axios.post(`https://api.interview-please.ml/gaze?name=${name}`, fd).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err)
      })
    }

    const sendFace = (blob) => {
      if (blob == null) return;
      let filename = `face${question}.webm`;  
      let fd = new FormData();
      fd.append('data', blob, filename);
  
      axios.post(`https://emotion.interview-please.ml/emotion?name=${name}`, fd).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err)
      })
    }

    const [status, setStatus] = useState('');
    const [audioSrc, setAudioSrc] = useState('');
    const [audioType, setAudioType] = useState('');

    const controlAudio = (status) => {
      setStatus(status);
    };

    const audioProps = {
      audioType,
      status,
      audioSrc,
      startCallback: e => {
        console.log("녹음 시작");
      },
      stopCallback: (e) => {
        setAudioSrc(URL.createObjectURL(e));
        console.log(e);
        console.log("녹음 종료");
        // 통신 진행하기
        if (e == null) return;
        let filename = "test2.wav";
        let fd = new FormData();
        fd.append('data', e, filename);
        axios.post(`https://api.interview-please.ml/habit?name=${name}`, fd).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err)
        })
      },
      errorCallback: err => {
        console.log("error", err);
      }
    };

    useEffect(() => {
      setAudioType('audio/wav');
    }, [audioType]);

    const url = 'https://api.interview-please.ml/question?no='

    const onClick = () => {
        if(thinking){
        // 생각시간은 못넘어가게 팝업 창 잠시 띄우기
        }
        else{
            if(second > 15){
                // 60초이상 지난 후 지나갈 수 있다는 팝업 창 잠시 띄우기
            }
            else{
                if(question < 3){
                    VideoCaptureEnd();
                    controlAudio("inactive");
                    setQuestion(question + 1);
                    setSecond(5);
                    setThinking(true);
                    setSecondCheck(!secondCheck);
                }
                else{
                    VideoCaptureEnd();
                    controlAudio("inactive");
                    setEndShow(true);
                }
            }
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setSecond(second - 1)
        }, 1000);

        // endpoint  /question?no=
        // no=숫자 이 때 숫자는 params로 질문 번호 될 예정
        //url 뒤에 url + question으로 요청시킬거
        

        if(question === 3 && second === -1 && !thinking){
            setEndShow(true);
            setSecond(0);
            VideoCaptureEnd();
            controlAudio("inactive");
        }
        else{
            if(second === -1){
                setSecondCheck(!secondCheck);
                if(secondCheck){
                    VideoCaptureEnd();
                    controlAudio("inactive");
                    setSecond(5);
                    setThinking(true);
                    setQuestion(question + 1);
                }
                else{
                    VideoCaptureStart();
                    controlAudio("recording");
                    setSecond(15);
                    setThinking(false);
                }
            }
        }
        return () => clearInterval(timer);
    },[question, second, thinking, secondCheck, VideoCaptureStart, VideoCaptureEnd])

    useEffect(() => {
        question === 1 ?
            setContent("본인에 대한 자기소개를 해주세요!")
        :
        axios.get(url + `${question}`)
        .then(
            response => {
                setContent(response.data.text);
                setContents((contents)=>{
                  return [...contents, response.data.text]
                })
            }
        );
        startVideo();
    },[question])

    const [retryShow, setRetryShow] = useState(false);

    return (
      <div className={style.box}>
        <div>
         <img src={guide3} className={style.currentPage} alt="profile" />
          <div className={style.box2}>
            <div style={{width : '150px'}}>
              <label style={{fontWeight : 'bold'}}> {thinking ? "생각시간" : "답변시간"} </label>
              <h2>{second}</h2>
              <button onClick={onClick} className={style.button}>다음 질문</button>
            </div>
            <div className={style.questionBox}>
              <label className={style.fadein}>Q{question}. {content} </label>
            </div>
            <div style={{display: 'flex', flexDirection : 'column', alignItems : 'center'}}>
              {
                thinking ?
                <img src={wait} style={{width: '150px'}} alt="wait" />
                : 
                <img src={record} style={{width: '150px'}} alt="record" />
              }
              <button onClick={() => setRetryShow(true)} className={style.button}>종료하기</button>
              <EndButton
                show={retryShow}
                onHide={() => setRetryShow(false)}
              />
            </div>
            <EndModal
              show={endShow}
              contents={contents}
              onHide={() => setEndShow(false)}
            />
          </div>
        </div>
        <video id={style.videoElement} autoPlay ref={videoRef}/>
        <AudioAnalyser {...audioProps} backgroundColor="transparent" className={style.audioanalyser} />
      </div>
    );
}

export default UseTestTimer;