import math
import numpy as np
import cv2
from .pupil import Pupil

# 클래스명 : Eye
# 기능 : 눈을 분리하는 새로운 프레임을 만들고 동공 감지를 시작하게 한다.
# 작성일자 : 2022/04/27


class Eye(object):

    LEFT_EYE_POINTS = [36, 37, 38, 39, 40, 41]
    RIGHT_EYE_POINTS = [42, 43, 44, 45, 46, 47]

    def __init__(self, original_frame, landmarks, side, calibration):
        self.frame = None
        self.origin = None
        self.center = None
        self.pupil = None
        self.landmark_points = None

        self._analyze(original_frame, landmarks, side, calibration)

    # 함수명 : _middle_point
    # 기능 : 두 점 사이의 중앙값을 반환한다.
    # 매개변수 : p1(첫번째 점), p2(두번째 점)
    # 반환값: 중앙값의 좌표
    # 작성일자 : 2022/04/27
    @staticmethod
    def _middle_point(p1, p2):
        x = int((p1.x + p2.x) / 2)
        y = int((p1.y + p2.y) / 2)
        return (x, y)

    # 함수명 : _isolate
    # 기능 : 얼굴의 다른 부분을 제외한 눈만의 프레임을 갖도록 분리한다.
    # 매개변수 : self(자기 자신 객체), frame(얼굴을 담고 있는 프레임), landmarks(얼굴 부분에 대한 랜드마크), points(눈의 좌표들)
    # 작성일자 : 2022/04/27
    def _isolate(self, frame, landmarks, points):
        region = np.array(
            [(landmarks.part(point).x, landmarks.part(point).y) for point in points])
        region = region.astype(np.int32)
        self.landmark_points = region

        # 눈에만 마스크를 적용시킨다.
        height, width = frame.shape[:2]
        black_frame = np.zeros((height, width), np.uint8)
        mask = np.full((height, width), 255, np.uint8)
        cv2.fillPoly(mask, [region], (0, 0, 0))
        eye = cv2.bitwise_not(black_frame, frame.copy(), mask=mask)

        # 눈 좌표에서 margin을 잘라낸다.
        margin = 5
        min_x = np.min(region[:, 0]) - margin
        max_x = np.max(region[:, 0]) + margin
        min_y = np.min(region[:, 1]) - margin
        max_y = np.max(region[:, 1]) + margin

        self.frame = eye[min_y:max_y, min_x:max_x]
        self.origin = (min_x, min_y)

        height, width = self.frame.shape[:2]
        self.center = (width / 2, height / 2)

    # 함수명 : _blinking_ratio
    # 기능 : 눈이 닫혔는지 여부를 판단하기 위한 비율을 계산한다.
    # 매개변수 : self(자기 자신 객체), landmarks(얼굴 부분에 대한 랜드마크), points(눈의 좌표들)
    # 반환값: 계산된 비율
    # 작성일자 : 2022/04/27
    def _blinking_ratio(self, landmarks, points):
        left = (landmarks.part(points[0]).x, landmarks.part(points[0]).y)
        right = (landmarks.part(points[3]).x, landmarks.part(points[3]).y)
        top = self._middle_point(landmarks.part(
            points[1]), landmarks.part(points[2]))
        bottom = self._middle_point(landmarks.part(
            points[5]), landmarks.part(points[4]))

        eye_width = math.hypot((left[0] - right[0]), (left[1] - right[1]))
        eye_height = math.hypot((top[0] - bottom[0]), (top[1] - bottom[1]))

        try:
            ratio = eye_width / eye_height
        except ZeroDivisionError:
            ratio = None

        return ratio

    # 함수명 : _analyze
    # 기능 : 새로운 프레임에서 눈을 탐지하고 분리하며, calibration에 데이터를 보내고 눈동자 객체를 생성한다.
    # 매개변수 : self(자기 자신 객체), original_frame(user로부터 받은 프레임), landmarks(얼굴 부분에 대한 랜드마크), side(왼쪽 눈이면 0이고 오른쪽 눈이면 1), calibration(이진화된 임계값을 관리)
    # 작성일자 : 2022/04/27
    def _analyze(self, original_frame, landmarks, side, calibration):

        if side == 0:
            points = self.LEFT_EYE_POINTS
        elif side == 1:
            points = self.RIGHT_EYE_POINTS
        else:
            return

        self.blinking = self._blinking_ratio(landmarks, points)
        self._isolate(original_frame, landmarks, points)

        if not calibration.is_complete():
            calibration.evaluate(self.frame, side)

        threshold = calibration.threshold(side)
        self.pupil = Pupil(self.frame, threshold)
