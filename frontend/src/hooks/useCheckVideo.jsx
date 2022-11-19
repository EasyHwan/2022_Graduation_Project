import { useState } from 'react';

const useCheckVideo = () => {
    const [isShowVideo, setIsShowVideo] = useState(false);

    const startCam = () => {
        !isShowVideo ?
        setIsShowVideo(true)
        :setIsShowVideo(false);
    }

    return {isShowVideo, startCam};
}

export default useCheckVideo;