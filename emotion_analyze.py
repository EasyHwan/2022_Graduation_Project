from fer import Video
from fer import FER
import os
import sys
import pandas as pd

def emotion(mov_data):
    print(mov_data.filename)
    print(mov_data.name)
    print(mov_data)
    mov_data.save('src/' + mov_data.filename)
    location_videofile = f"src/{mov_data.filename}"

    face_detector = FER()
    input_video = Video(location_videofile)

    processing_data = input_video.analyze(face_detector, display=False, frequency=6)
    vid_df = input_video.to_pandas(processing_data)
    vid_df = input_video.get_first_face(vid_df)
    vid_df = input_video.get_emotions(vid_df)

    pltfig = vid_df.plot(figsize=(20, 8), fontsize=16).get_figure()
    angry = sum(vid_df.angry)
    disgust = sum(vid_df.disgust)
    fear = sum(vid_df.fear)
    happy = sum(vid_df.happy)
    sad = sum(vid_df.sad)
    surprise = sum(vid_df.surprise)
    neutral = sum(vid_df.neutral)

    emotions = ['Angry', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutal']

    return (angry, disgust, fear, happy, sad, surprise, neutral)

    emotions_values = [angry, disgust, fear, happy, sad, surprise, neutral]
    score_comparisons = pd.DataFrame(emotions, columns=['Human Emotions'])
    score_comparisons['Emotion Value from the Video'] = emotions_values
    print(score_comparisons)
