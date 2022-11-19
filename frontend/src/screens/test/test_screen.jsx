import React from 'react';
import style from './test.module.scss';
import UseTestTimer from '../../hooks/useTestTimer';

function Test (){
  return (
    <div className={style.box}>
      <UseTestTimer/>
    </div>
  );
}

export default Test;