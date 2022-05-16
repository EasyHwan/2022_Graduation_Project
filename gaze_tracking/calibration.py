from __future__ import division
import cv2
from .pupil import Pupil

# 클래스명 : Calibration
# 기능 : 웹캠에서 동공 탐지 알고리즘에서 최선의 이진 임계값을 찾아서 눈금을 매긴다.
# 작성일자 : 2022/04/26


class Calibration(object):

    def __init__(self):
        self.nb_frames = 20
        self.thresholds_left = []
        self.thresholds_right = []

    # 함수명 : is_complete
    # 기능 : 눈금 매기는 것이 완료됐다면 True를 반환
    # 매개변수 : self (자기 자신 객체)
    # 반환값: True or False
    # 작성일자 : 2022/04/26
    def is_complete(self):
        return len(self.thresholds_left) >= self.nb_frames and len(self.thresholds_right) >= self.nb_frames

    # 함수명 : threshold
    # 기능 : 화면 상의 눈에서 임계값을 반환한다.
    # 매개변수 : self (자기 자신 객체), side(왼쪽 눈이면 0이고 오른쪽 눈이면 1)
    # 반환값: 계산된 임계값
    # 작성일자 : 2022/04/26
    def threshold(self, side):
        if side == 0:
            return int(sum(self.thresholds_left) / len(self.thresholds_left))
        elif side == 1:
            return int(sum(self.thresholds_right) / len(self.thresholds_right))

    # 함수명 : iris_size
    # 기능 : 홍채가 눈의 표면에서 차지하는 비율울 반환한다.
    # 매개변수 : frame (이진화된 홍채의 프레임)
    # 반환값: 비율 반환
    # 작성일자 : 2022/04/26
    @staticmethod
    def iris_size(frame):
        frame = frame[5:-5, 5:-5]
        height, width = frame.shape[:2]
        nb_pixels = height * width
        nb_blacks = nb_pixels - cv2.countNonZero(frame)
        return nb_blacks / nb_pixels

    # 함수명 : find_best_threshold
    # 기능 : 눈의 프레임을 이진화하기 위한 최적의 임계값을 계산한다.
    # 매개변수 : eye_frame (눈의 프레임)
    # 반환값: 최적의 임계값
    # 작성일자 : 2022/04/26
    @staticmethod
    def find_best_threshold(eye_frame):
        average_iris_size = 0.7  # 0.48
        trials = {}

        for threshold in range(5, 100, 5):
            iris_frame = Pupil.image_processing(eye_frame, threshold)
            trials[threshold] = Calibration.iris_size(iris_frame)

        best_threshold, iris_size = min(trials.items(), key=(
            lambda p: abs(p[1] - average_iris_size)))
        return best_threshold

    # 함수명 : evaluate
    # 기능 : 주어진 이미지를 고려해서 매긴 눈금을 개선시킨다.
    # 매개변수 : self(자기 자신 객체), eye_frame(눈의 프레임), side(왼쪽 눈이면 0이고 오른쪽 눈이면 1)
    # 작성일자 : 2022/04/26
    def evaluate(self, eye_frame, side):
        threshold = self.find_best_threshold(eye_frame)

        if side == 0:
            self.thresholds_left.append(threshold)
        elif side == 1:
            self.thresholds_right.append(threshold)
