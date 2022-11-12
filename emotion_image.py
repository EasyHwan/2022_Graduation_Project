from fer import Video
from fer import FER
import os
import sys
import pandas as pd

img = cv2.imread("/home/ec2-user/project/2022_Graduation_Project/hismile.jpg")
detector = FER()
try:
    print(detector.detect_emotions(img))
except:
    detector.detect_emotions(img)
    print(decector)


