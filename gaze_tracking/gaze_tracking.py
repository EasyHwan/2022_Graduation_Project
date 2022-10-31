from __future__ import division
import os
import cv2
import dlib
from .eye import Eye
from .calibration import Calibration

# 클래스명 : GazeTracking
# 기능 : user의 눈동자를 쫓는다.(눈, 동공의 위치, 눈을 떴는지 감았는지 여부 등의 정보를 제공)
# 작성일자 : 2022/04/28


class GazeTracking(object):

    def __init__(self):
        self.frame = None
        self.eye_left = None
        self.eye_right = None
        self.calibration = Calibration()
        self.GazeScore = {
            "blinking": 0,
            "left": 0,
            "right": 0,
            "center": 0
        }

        # 얼굴을 탐지한다.
        self._face_detector = dlib.get_frontal_face_detector()

        # 주어진 얼굴에서부터 랜드마크를 얻는다.
        cwd = os.path.abspath(os.path.dirname(__file__))
        model_path = os.path.abspath(os.path.join(cwd, "trained_models/shape_predictor_68_face_landmarks.dat"))
        self._predictor = dlib.shape_predictor(model_path)

    # 함수명 : pupils_located
    # 기능 : 동공이 위치되었는지 확인한다.
    # 매개변수 : self(자기 자신 객체)
    # 반환값: True or False
    # 작성일자 : 2022/04/29
    @property
    def pupils_located(self):
        try:
            int(self.eye_left.pupil.x)
            int(self.eye_left.pupil.y)
            int(self.eye_right.pupil.x)
            int(self.eye_right.pupil.y)
            return True
        except Exception:
            return False

    # 함수명 : _analyze
    # 기능 : 얼굴을 탐지하고 Eye 객체를 생성한다.
    # 매개변수 : self(자기 자신 객체)
    # 작성일자 : 2022/04/29
    def _analyze(self):
        frame = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
        faces = self._face_detector(frame)

        try:
            landmarks = self._predictor(frame, faces[0])
            self.eye_left = Eye(frame, landmarks, 0, self.calibration)
            self.eye_right = Eye(frame, landmarks, 1, self.calibration)

        except IndexError:
            self.eye_left = None
            self.eye_right = None

    # 함수명 : refresh
    # 기능 : 프레임을 리프레쉬하고 분석을 실행시킨다.
    # 매개변수 : self(자기 자신 객체), frame(분석할 프레임)
    # 작성일자 : 2022/04/29
    def refresh(self, frame):
        self.frame = frame
        self._analyze()

    # 함수명 : pupil_left_coords
    # 기능 : 왼쪽 눈의 좌표를 반환한다.
    # 매개변수 : self(자기 자신 객체)
    # 반환값: 왼쪽 눈의 좌표
    # 작성일자 : 2022/04/29
    def pupil_left_coords(self):
        if self.pupils_located:
            x = self.eye_left.origin[0] + self.eye_left.pupil.x
            y = self.eye_left.origin[1] + self.eye_left.pupil.y
            return (x, y)

    # 함수명 : pupil_right_coords
    # 기능 : 오른쪽 눈의 좌표를 반환한다.
    # 매개변수 : self(자기 자신 객체)
    # 반환값: 오른쪽 눈의 좌표
    # 작성일자 : 2022/04/29
    def pupil_right_coords(self):
        if self.pupils_located:
            x = self.eye_right.origin[0] + self.eye_right.pupil.x
            y = self.eye_right.origin[1] + self.eye_right.pupil.y
            return (x, y)

    # 함수명 : horizontal_ratio
    # 기능 : 시선의 수평적인 위치를 0~1 사이의 값으로 반환한다.(오른쪽은 0, 중앙은 0.5, 왼쪽은 1.0)
    # 매개변수 : self(자기 자신 객체)
    # 반환값: 계산된 값 반환
    # 작성일자 : 2022/04/29
    def horizontal_ratio(self):
        if self.pupils_located:
            pupil_left = self.eye_left.pupil.x / \
                (self.eye_left.center[0] * 2 - 10)
            pupil_right = self.eye_right.pupil.x / \
                (self.eye_right.center[0] * 2 - 10)
            return (pupil_left + pupil_right) / 2

    # 함수명 : vertical_ratio
    # 기능 : 시선의 수직적인 위치를 0~1 사이의 값으로 반환한다.(맨 위는 0, 중앙은 0.5, 맨 아래쪽은 1.0)
    # 매개변수 : self(자기 자신 객체)
    # 반환값: 계산된 값 반환
    # 작성일자 : 2022/04/29
    def vertical_ratio(self):
        if self.pupils_located:
            pupil_left = self.eye_left.pupil.y / \
                (self.eye_left.center[1] * 2 - 10)
            pupil_right = self.eye_right.pupil.y / \
                (self.eye_right.center[1] * 2 - 10)
            return (pupil_left + pupil_right) / 2

    # 함수명 : is_right
    # 기능 : user가 오른쪽을 보고 있는지 여부를 반환한다.
    # 매개변수 : self(자기 자신 객체)
    # 반환값: True or False
    # 작성일자 : 2022/04/29
    def is_right(self):
        if self.pupils_located:
            # 원래 0.35
            temp = self.horizontal_ratio()
            #print(temp)
            return temp <= 0.45

    # 함수명 : is_left
    # 기능 : user가 왼쪽을 보고 있는지 여부를 반환한다.
    # 매개변수 : self(자기 자신 객체)
    # 반환값: True or False
    # 작성일자 : 2022/04/29
    def is_left(self):
        if self.pupils_located:
            temp = self.horizontal_ratio()
            #print(temp)
            return temp >= 0.7
    # 함수명 : is_center
    # 기능 : user가 중앙을 보고 있는지 여부를 반환한다.
    # 매개변수 : self(자기 자신 객체)
    # 반환값: True or False
    # 작성일자 : 2022/04/29

    def is_center(self):
        if self.pupils_located:
            return self.is_right() is not True and self.is_left() is not True

    # 함수명 : is_blinking
    # 기능 : user가 눈을 깜박이고 있는지 여부를 반환한다.
    # 매개변수 : self(자기 자신 객체)
    # 반환값: True or False
    # 작성일자 : 2022/04/29
    def is_blinking(self):
        if self.pupils_located:
            blinking_ratio = (self.eye_left.blinking +
                              self.eye_right.blinking) / 2
            return blinking_ratio > 3.8

    # 함수명 : annotated_frame
    # 기능 : 동공이 강조 표시된 기본 프레임을 반환한다.
    # 매개변수 : self(자기 자신 객체)
    # 반환값: 프레임
    # 작성일자 : 2022/05/01
    def annotated_frame(self):
        frame = self.frame.copy()

        if self.pupils_located:
            color = (0, 255, 0)
            x_left, y_left = self.pupil_left_coords()
            x_right, y_right = self.pupil_right_coords()
            cv2.line(frame, (x_left - 5, y_left), (x_left + 5, y_left), color)
            cv2.line(frame, (x_left, y_left - 5), (x_left, y_left + 5), color)
            cv2.line(frame, (x_right - 5, y_right),
                     (x_right + 5, y_right), color)
            cv2.line(frame, (x_right, y_right - 5),
                     (x_right, y_right + 5), color)

        return frame
