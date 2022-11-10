# -*- coding: utf-8 -*-
import speech_recognition as sr
import librosa
from posixpath import split
from playsound import playsound
import wave
import time
import keyboard
import sys
import io


def analyze_habit(sound_data):
    global sr
    WAVE_OUTPUT_FILENAME = sound_data


    r = sr.Recognizer()


    # sample_wav, rate = librosa.core.load("/Users/junki/Desktop/project/temp/2022_Graduation_Project/file.wav")

    korean_audio = sr.AudioFile(sound_data)
    #sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')
    #sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8')

    with korean_audio as source:
        audio = r.record(source)
    num = r.recognize_google(audio_data=audio, language='ko-KR')

    sounds = num.split(' ')
    ret = []

    word = ['아', '아니', '그', '음', '어', '습', '엄']

    for i in range(len(word)):
        ret.append(sounds.count(word[i]))
    #    print(word[i], ":", sounds.count(word[i]))

    return ret

#analyze_habit()