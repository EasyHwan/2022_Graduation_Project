import numpy as np
import cv2

# 클래스명 : Pupil
# 기능 : 눈의 홍채를 감지하고 추정한다.
# 작성일자 : 2022/05/02


class Pupil(object):

    def __init__(self, eye_frame, threshold):
        self.iris_frame = None
        self.threshold = threshold
        self.x = None
        self.y = None

        self.detect_iris(eye_frame)

    # 함수명 : image_processing
    # 기능 : 안구 프레임에 대한 작업을 통해 홍채를 분리한다.
    # 매개변수 : eye_frame(눈만을 담고 있는 프레임), threshold(눈 프레임을 이진화하기 위한 임계값)
    # 반환값: 홍채를 나타내는 새로운 프레임
    # 작성일자 : 2022/05/02
    @staticmethod
    def image_processing(eye_frame, threshold):
        kernel = np.ones((3, 3), np.uint8)
        new_frame = cv2.bilateralFilter(eye_frame, 10, 15, 15)
        new_frame = cv2.erode(new_frame, kernel, iterations=3)
        new_frame = cv2.threshold(
            new_frame, threshold, 255, cv2.THRESH_BINARY)[1]

        return new_frame

    # 함수명 : detect_iris
    # 기능 : 홍채를 탐지하고 도심을 계산하여 홍채의 위치를 계산한다.
    # 매개변수 : self(자기 자신 객체),eye_frame(눈만을 담고 있는 프레임)
    # 작성일자 : 2022/05/02
    def detect_iris(self, eye_frame):
        self.iris_frame = self.image_processing(eye_frame, self.threshold)

        contours, _ = cv2.findContours(
            self.iris_frame, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)[-2:]
        contours = sorted(contours, key=cv2.contourArea)

        try:
            moments = cv2.moments(contours[-2])
            self.x = int(moments['m10'] / moments['m00'])
            self.y = int(moments['m01'] / moments['m00'])
        except (IndexError, ZeroDivisionError):
            pass
