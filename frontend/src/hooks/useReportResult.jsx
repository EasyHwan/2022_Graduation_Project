import { useState, useEffect } from 'react';
import axios from 'axios';

const url = 'https://api.interview-please.ml/result?name='

const useReportResult = () => {
    const [result, setResult] = useState({});

    useEffect(() => {
        const name = localStorage.getItem('name');
        axios.get(url + `${name}`)
        .then((res)=>{
          console.log(res.data)
          setResult(res.data)
        }).catch((err)=>{
          console.log(err)
        });
    },[])

    return {result};
}

export default useReportResult;