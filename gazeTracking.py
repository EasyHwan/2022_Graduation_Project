"""
Demonstration of the GazeTracking library.
Check the README.md for complete documentation.
"""

import datetime
import cv2
from gaze_tracking import GazeTracking


def gaze_track(data):
    gaze = GazeTracking()
    data.save('src/' + data.filename)
    webcam = cv2.VideoCapture(f"src/{data.filename}")
    gazeVal = 0

    now = datetime.datetime.now()

    if webcam.isOpened():

        while True:
            #print("go?")
            #print(gaze.GazeScore)
            ret, frame = webcam.read()

            if ret:

                #cv2.waitKey(1) # 이 샛키가 프레임 조절같긴한데.. ㅁㄹ겠네
                gaze.refresh(frame)

                frame = gaze.annotated_frame()
                text = ""

                if gaze.is_right():
                    gaze.GazeScore["right"] += 1
                    text = "right"
                    gazeVal += 1
                elif gaze.is_left():
                    gaze.GazeScore["left"] += 1
                    text = "left"
                    gazeVal += 1
                elif gaze.is_blinking():
                    gaze.GazeScore["blinking"] += 1
                    text = "blinking"
                    gazeVal += 1
                elif gaze.is_center():
                    gaze.GazeScore["center"] += 1
                    text = "Looking center"
                    gazeVal += 1

                # 혹시 영상으로 추출해주는 것 때문에 느리나 했지만 밑 부분 주석처리해도 똑같음
                #cv2.putText(frame, text, (90, 60), cv2.FONT_HERSHEY_DUPLEX, 1.6, (147, 58, 31), 2)

                #left_pupil = gaze.pupil_left_coords()
                #right_pupil = gaze.pupil_right_coords()
                #cv2.putText(frame, "Left pupil:  " + str(left_pupil), (90, 130), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)
                #cv2.putText(frame, "Right pupil: " + str(right_pupil), (90, 165), cv2.FONT_HERSHEY_DUPLEX, 0.9, (147, 58, 31), 1)

                #cv2.imshow("Demo", frame)
            else:
                #print("can`t read frame")
                break
    #else:
    #    print("Can't open video.")

    return gaze.GazeScore
    print(gaze.GazeScore)
    print(gazeVal)
    print(now)
    print(datetime.datetime.now())
    webcam.release()
    cv2.destroyAllWindows()
