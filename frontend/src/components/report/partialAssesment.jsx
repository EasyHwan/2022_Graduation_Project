import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from '../../screens/report/report.module.scss';
import { SpinnerCircular } from 'spinners-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';


function Partial() {

    const customFace = [
        "밝은 표정을 잘 유지하여, 면접을 잘 마무리하였습니다! 이대로 진행시, 면접에서도 좋은 평가와 함께 좋은 인상을 남길 수 있을 것 입니다. 반복적인 연습을 통해 낯선 문항들은 없는지 연습해보세요! 더 좋은 결과를 얻을 수 있을 것 입니다.",
        "면접을 잘 진행하였지만 밝은 표정이 제대로 유지되지 않은 문항들이 있습니다. 문항을 확인하고 본인의 표정이 어떠했을지 다시 떠올려보세요. 반복적인 연습을 통해 낯선 문항들은 없는지 연습해보세요! 낯선 문항들을 더 자주 만나 당황스럽지 않은지, 밝게 유지하는지 점검하며 계속해서 연습해보세요!",
        "면접 내내 좋은 표정을 유지하지 못하였습니다...다소 아쉬운 결과이지만, 여러번의 연습을 진행한다면 보다 더 밝은 표정을 면접동안 유지할 수 있을 것 입니다. 특히 어두운 표정은 자신감, 불안, 걱정과 같은 요소들을 간접적으로 면접관에게 전달합니다. 이러한 점을 생각하며 연습을 진행하며 화면에 보이는 자신의 표정을 보고 긍정적으로 평가할 수 있을지 스스로 고민을 진행해주세요!",
    ];

    const customGaze = [
        "중앙을 잘 응시하며, 면접을 잘 마무리하였습니다! 이대로 진행시, 면접에서도 좋은 평가와 함께 좋은 인상을 남길 수 있을 것 입니다. 다른 곳을 응시하지 않고 가운데를 응시할 수 있도록 이대로만 연습해주세요!",
        "중앙을 잘 응시하였지만, 다른 곳을 응시한 경우가 다소 발견되었습니다. 면접 문항들을 확인하며 본인이 답변 도중 어떤 식으로 자신감있게 응시하였는지 떠올려보세요. 여러번 연습을 진행한 후에는 더 자신감있게 중앙을 잘 응시하여 면접을 진행할 수 있을 것입니다. 답변을 말하는 도중 이외에도 면접관을 응시하는 것은 경청, 존중의 표시이기 떄문에 중앙을 잘 응시할 수 있도록 조금 더 노력해주세요!",
        "면접 진행 중 중앙을 바라보지 않고 다른 곳을 쳐다본 경우가 많았습니다. 면접 문항들을 확인한 후, 본인이 느끼기에 답변을 어떻게 진행했어야 했을지 고민해주세요. 특히 긴장을 하거나 답변이 잘 정리되지 않았다면 중앙을 응시하지 않을 가능성이 높아집니다. 어떤 문항이 당황스러웠는지 확인하고 생각 시간 내에 빠르게 답변을 정리한 후, 중앙을 잘 유지할 수 있도록 거듭 연습을 진행한다면 더 좋은 결과를 받을 수 있을 것입니다!",
    ];

    const customHabit = [
        "전반적으로 습관어 사용 빈도 수가 낮습니다! 이대로 답변을 진행할 수 있다면 면접에서도 긴장한 티나 당황한 티가 잘 드러나지 않을 확률이 높습니다. 여러 연습을 진행해보면서 질문에 대한 답변을 빠르게 구상하여 습관어가 발생하지 않을 수 있도록 조심해주세요!",
        "많은 습관어를 사용하지는 않았지만, 높은 평가를 위해서는 조금 더 노력해야합니다! 습관어는 답변에 대한 신뢰감을 나타내기도 합니다. 따라서 당황했던 질문이 무엇이었는지 떠올려 질문에 대한 답변을 어떻게 구상해야할지 고민해보세요. 여러번 연습을 진행한다면, 분명히 더 좋은 평가를 얻을 수 있을 것입니다.",
        "습관어 사용 빈도 수가 매우 많습니다. 이는 면접관에게 긴장한 티나 당황한 티가 잘 드러날 수 있는 수치입니다. 특히 반복되는 습관어 사용은 답변의 요지가 흔들려 신뢰감이 없어보이는 평가를 받을 수 있습니다. 개선을 위해서는 반복적인 연습을 통해 정확한 답변만을 말할 수 있는 연습이 필요합니다.",
    ];

    const custom = [
        '🌈 아주 잘했어요!! 😁',
        '🔥 조금만 더 분발해요!! 😤',
        '💧 다소 아쉬워요...😢'
    ];

    const name = localStorage.getItem('name');
    const contents = JSON.parse(localStorage.getItem('contents'));
    
    const url = 'https://api.interview-please.ml/result?name=';
    const [result, setResult] = useState();
    const [dataCheck, setDataCheck] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const name = localStorage.getItem('name');
        const id = setInterval(() => {
            setCount(count => count + 1); 
            axios.get(url + `${name}`)
            .then((res)=>{
                if(res.data.gaze.length === 3){
                    setResult(res.data);
                    setDataCheck(true);
                }
            }).catch((err)=>{
                console.log(err)
            });
      }, 1000);

      if (dataCheck) {
        clearInterval(id);
        console.log(result);
      }

      return () => clearInterval(id);
    }, [count, result, dataCheck]);


    return(
        <>
        {
            dataCheck === true
            ?
            <div className={style.Evaluate}>
                <div className={style.contentEvaluate2}>
                    <div className={style.detailContent}>
                        <h4 style={{fontWeight : 'bold', fontSize : 35}}>👉 '{name.substring(0, 3)}' 님의 분석 결과입니다!!</h4>
                        <br/>
                        <h4 style={{fontWeight : 'bold', color : '#408CFF', fontSize : 35}}>표정 분석</h4>
                        <hr/>
                        <p style={{fontWeight : 'bold', fontSize : 24}}>총 평가 : <label style={{color:'#1E84FD'}}>{result.emotion_grade}</label></p>
                        <p style={{fontSize : 16}}>면접 응답을 진행한 동안 측정된 영상에 대한 표정 분석 결과를 반환합니다. '화남', '혐오감', '두려움', '행복', '슬픔', '놀람', '중립'과 같은
                        표정들을 분석하고 이에 대한 비율을 계산하여 응답 진행중 '행복' 이외에 표정 비중이 높은 문항을 기록합니다. (emotion_ratio의 비율이 높을수록 좋은 결과에 가깝습니다.)
                        </p>
                        <br/>
                        <p style={{fontWeight : 'bold', fontSize : 20}}>👇 연습이 필요한 문항 👇</p>
                        {
                            result.emotion.map((res, index)=>{
                                if (res.emotion_ratio < 0.3){
                                    return(
                                        <>
                                            <p style={{fontWeight : 'bold', fontSize : 16}} key={res}>{index + 1}번째 문항 - {contents[index]}</p>
                                        </>
                                    );
                                }
                                else{
                                    return(
                                        <></>
                                    );
                                }
                            })
                        }
                        <br/>
                        <p style={{fontWeight : 'bold', fontSize : 24}}>총 평</p>
                        <LineChart
                            width={500}
                            height={300}
                            data={result.emotion}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={(v)=> `문항 ${result.emotion.indexOf(v) + 1}`}/>
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="emotion_ratio" stroke="#0073fe" activeDot={{ r: 8 }} />
                        </LineChart>
                        <br/>
                        {
                            result.emotion_grade === '상' ?
                            <>
                                <p style={{fontWeight : 'bold', fontSize : 20}}>{custom[0]}</p>
                                <p style={{fontSize : 16}}>{customFace[0]}</p>
                            </>
                            : result.emotion_grade === '중' ?
                            <>
                                <p style={{fontWeight : 'bold', fontSize : 20}}>{custom[1]}</p>
                                <p style={{fontSize : 16}}>{customFace[1]}</p>
                            </>
                            :
                            <>
                                <p style={{fontWeight : 'bold', fontSize : 20}}>{custom[2]}</p>
                                <p style={{fontSize : 16}}>{customFace[2]}</p>
                            </>
                        }
                        <br/>
                    </div>
                    <div className={style.detailContent}>
                        <h4 style={{fontWeight : 'bold', color : '#408CFF', fontSize : 35}}>시선 처리</h4>
                        <hr/>
                        <p style={{fontWeight : 'bold', fontSize : 24}}>총 평가 : <label style={{color:'#1E84FD'}}>{result.gaze_grade}</label></p>
                        <p style={{fontSize : 16}}>면접 응답을 진행한 동안 측정된 영상에 대한 시선처리 결과를 반환합니다. 중앙을 잘 응시하지 못하여 연습이 필요한 문항을 저장하여
                            부족했던 답변에 대해 연습할 수 있도록 제공합니다. (ratio의 비율이 0.01과 가깝고 작을수록 좋은 결과에 가깝습니다.)
                        </p>
                        <br/>
                        <p style={{fontWeight : 'bold', fontSize : 20}}>👇 연습이 필요한 문항 👇</p>
                        {
                            result.gaze.map((res, index)=>{
                                if (res.ratio > 0.05){
                                    return(
                                        <>
                                            <p style={{fontWeight : 'bold', fontSize : 16}} key={res}>{index + 1}번째 문항 - {contents[index]}</p>
                                        </>
                                    );
                                }
                                else{
                                    return(
                                        <></>
                                    );
                                }
                            })
                        }
                        <br/>
                        <p style={{fontWeight : 'bold', fontSize : 24}}>총 평</p>
                        <LineChart
                            width={500}
                            height={300}
                            data={result.gaze}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={(v)=> `문항 ${result.gaze.indexOf(v) + 1}`}/>
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="ratio" stroke="#0073fe" activeDot={{ r: 8 }} />
                        </LineChart>
                        <br/>
                        {
                            result.gaze_grade === '상' ?
                            <>
                                <p style={{fontWeight : 'bold', fontSize : 20}}>{custom[0]}</p>
                                <p style={{fontSize : 16}}>{customGaze[0]}</p>
                            </>
                            : result.gaze_grade === '중' ?
                            <>
                                <p style={{fontWeight : 'bold', fontSize : 20}}>{custom[1]}</p>
                                <p style={{fontSize : 16}}>{customGaze[1]}</p>
                            </>
                            :
                            <>
                                <p style={{fontWeight : 'bold', fontSize : 20}}>{custom[2]}</p>
                                <p style={{fontSize : 16}}>{customGaze[2]}</p>
                            </>
                        }
                        <br/>
                    </div>
                    <div className={style.detailContent}>
                        <p style={{fontWeight : 'bold', color : '#408CFF', fontSize : 35}}>습관어 처리</p>
                        <hr/>
                        <p style={{fontSize : 16}}>본 프로그램에서 측정되는 습관어는 '아', '아니', '그', '음', '어', '습', '엄'으로 반복적인 단어가 발견될시에 면접자의 습관어를 기록합니다.
                            가장 많이 발견한 상위 3개의 습관어의 발견 횟수와 습관어를 확인할 수 있으며, 확인할 수 없을 경우 습관어를 사용하지 않고 면접을 마무리한 경우입니다.
                        </p>
                        <br/>
                        {
                            result.habit.map((res, index)=>{
                                if (res[1] > 0) {
                                    return(
                                        <>
                                            <p style={{fontWeight : 'bold', fontSize : 24}} key={res[0]}>{index + 1}위 '{res[0]}'</p>
                                            <p style={{fontWeight : 'bold', fontSize : 18}} key={res[1]}>{res[1]} 회</p>
                                        </>
                                    );
                                }
                                else{
                                    return(
                                        <></>
                                    );
                                }
                            })
                        }
                        <br/>
                        <p style={{fontWeight : 'bold', fontSize : 24}}>총 평</p>
                        <LineChart
                            width={500}
                            height={300}
                            data={result.habit}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey='0' />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey={v => v[1]} stroke="#0073fe" activeDot={{ r: 8 }} />
                        </LineChart>
                        <br/>
                        {
                            result.habit_sum < 5 ? 
                            <>
                                <p style={{fontWeight : 'bold', fontSize : 20}}>{custom[0]}</p>
                                <p style={{fontSize : 16}}>{customHabit[0]}</p>
                            </>
                            :
                            result.habit_sum >= 5 && result.habit_sum < 15
                            ?
                            <>
                                <p style={{fontWeight : 'bold', fontSize : 20}}>{custom[1]}</p>
                                <p style={{fontSize : 16}}>{customHabit[1]}</p>
                            </>
                            :
                            <>
                                <p style={{fontWeight : 'bold', fontSize : 20}}>{custom[2]}</p>
                                <p style={{fontSize : 16}}>{customHabit[2]}</p>
                            </>
                        }
                        <br/>
                        <hr/>
                        <p style={{fontSize : 16}}>면접을 진행할 때 가장 중요한 점은 면접자의 '자신감'입니다. 자신의 의견을 분명하게 전달할 수 있도록 자신감있는 말투와 표정을 거울을 통해 연습해주세요. 
                            충분한 연습을 통해 AI 면접을 넘어 실제 면접관에게도 좋은 평가를 받을 수 있도록 지속적인 연습을 진행해주세요!</p>
                        <p style={{fontSize : 16}}>표정, 시선, 습관어와 같은 요소들은 면접에서 평가되어지는 주요 항목이 될 수 있습니다. 이러한 요소들이 여러분의 첫인상과 함께 면접 분위기를 결정할 수 있습니다.
                            연습을 통해 본인의 모습을 확인하고, 어떠한 습관어를 사용하고 있는지 인지해주세요. 여러번의 연습은 앞으로의 더 좋은 면접 결과를 위한 발판이 되어줄 수 있을 것 입니다!</p>
                        <p style={{fontSize : 16}}>면접을 부탁해는 면접자님의 합격을 기원합니다!!</p>
                    </div>
                </div>
            </div>
            :
            <>
                <div style={{
                    position : 'absolute',
                    top : '50%',
                    left : '50%',
                    transform: 'translate(-50%,-50%)'
                }}>
                    <p>결과 분석중입니다...</p>
                    <SpinnerCircular color='#0073fe'/>
                </div>
            </>
        }
        </>
    );
}

export default Partial;