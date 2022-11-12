from flask import Flask
from flask import request, Response
import pymysql
import json
from dotenv import load_dotenv
import os
from flask_cors import CORS, cross_origin
import bcrypt
from collections import defaultdict

import sys, os, base64, datetime, hashlib, hmac
import requests # pip install requests
from habit import *
from gazeTracking import *

import boto3

app = Flask(__name__)
#CORS(app, supports_credentials=True)
CORS(app, resources={r'*': {'origins': ['https://letmeinterview.vercel.app', 'http://localhost:3000']}}, supports_credentials=True)



@app.route('/')
def index():
    my_res = {"res": "hi"}
    return my_res


@app.route('/question')
def question():
    num = int(request.args.get('no', "1"))
    conn = pymysql.connect(
        user=os.environ.get("MYSQL_USER"),
        password=os.environ.get("MYSQL_PASSWORD"),
        host=os.environ.get("MYSQL_HOST"),
        db=os.environ.get("MYSQL_DB"),
        charset='utf8mb4'
    )

    if num == 2:
        sql = "SELECT * FROM basic_question ORDER BY RAND() LIMIT 1;"
        ret = {}
        with conn:
            with conn.cursor() as cur:
                cur.execute(sql)
                result = cur.fetchall()
                ret["id"] = result[0][0]
                ret["text"] = result[0][1]
        return ret
    elif num == 3 or num == 4:
        sql = "SELECT * FROM short_question ORDER BY RAND() LIMIT 1;"
        ret = {}
        with conn:
            with conn.cursor() as cur:
                cur.execute(sql)
                result = cur.fetchall()
                ret["id"] = result[0][0]
                ret["text"] = result[0][1]
        return ret
    elif num == 5:
        sql = "SELECT * FROM long_question ORDER BY RAND() LIMIT 1;"
        ret = {}
        with conn:
            with conn.cursor() as cur:
                cur.execute(sql)
                result = cur.fetchall()
                ret["id"] = result[0][0]
                ret["text"] = result[0][1]
        return ret
    else:
        return "you have to include question_no (2 <= no <= 5)"


@app.route('/s3-upload', methods=['POST'])
@cross_origin()
def s3_upload():
    try:
        file_name = request.form['file_name']
        data = request.files['data']
        bucket = os.environ.get('BUCKET_NAME')
        s3 = boto3.client(
            's3',
            region_name='ap-northeast-2',
            aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY')
        )
        #content="requirement.txt"
        #s3.Object('s3-video-example', 'exxx.txt').put(Body=content)
        s3.put_object(
            Bucket=bucket,
            Body=data,
            Key=file_name,
            ContentType='video/mp4')
        return "success"
    except Exception as e:
        print('예외가 발생했습니다.', e)
        return str(e)


@app.route('/s3-upload2', methods=['POST'])
@cross_origin()
def s3_upload2():
    try:
        file_name = request.args.get('file_name')
        data = request.files['data']
        bucket = os.environ.get('BUCKET_NAME')
        s3 = boto3.client(
            's3',
            region_name='ap-northeast-2',
            aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY')
        )
        #content="requirement.txt"
        #s3.Object('s3-video-example', 'exxx.txt').put(Body=content)
        s3.put_object(
            Bucket=bucket,
            Body=data,
            Key=file_name,
            ContentType='video/mp4')
        return "success"
    except Exception as e:
        print('예외가 발생했습니다.', e)
        return str(e)


@app.route('/habit', methods=['POST'])
def habit_post():
    sound_data = request.files['data']
    #print(sound_data.content_type)
    #print(sound_data.mimetype)
    name = request.args.get('name')

    conn = pymysql.connect(
        user=os.environ.get("MYSQL_USER"),
        password=os.environ.get("MYSQL_PASSWORD"),
        host=os.environ.get("MYSQL_HOST"),
        db=os.environ.get("MYSQL_DB"),
        charset='utf8mb4'
    )
    #sound_data.save('src/' + sound_data.name)
    try:
        sound_count = analyze_habit(sound_data)
    except Exception as e:
        ret = {
            "err": str(e),
            "content_type": str(sound_data.content_type),
            "mimetype": str(sound_data.mimetype)
        }
        return ret

    word = ['아', '아니', '그', '음', '어', '습', '엄']
    ret = {}

    #delete_file = f"./src/{sound_data.filename}"
    #if os.path.isfile(delete_file):
    #    os.remove(delete_file)

    with conn:
        with conn.cursor() as cur:
            for i in range(len(word)):
                cur.execute("INSERT INTO habit_word (name, word, count) VALUES ('%s', '%s', '%s')" % (name, word[i], sound_count[i]))
                conn.commit()
                temp = {}
                ret[word[i]] = sound_count[i]

    return ret


@app.route('/gaze', methods=['POST'])
def gaze_post():
    mov_data = request.files['data']
    name = request.args.get('name')

    conn = pymysql.connect(
        user=os.environ.get("MYSQL_USER"),
        password=os.environ.get("MYSQL_PASSWORD"),
        host=os.environ.get("MYSQL_HOST"),
        db=os.environ.get("MYSQL_DB"),
        charset='utf8mb4'
    )
    movie_count = gaze_track(mov_data)
    word = ["blinking", "right", "left", "center"]
    b, r, l, c = movie_count["blinking"], movie_count["right"], movie_count["left"], movie_count["center"]

    delete_file = f"./src/{mov_data.filename}"

    if os.path.isfile(delete_file):
        os.remove(delete_file)

    ret = {}
    with conn:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO gaze (name, blinking_count, right_count, left_count, center_count) VALUES ('%s', '%s', '%s', '%s', '%s')" % (name, b, r, l, c))
            conn.commit()

    ret["blinking"] = b
    ret["right"] = r
    ret["left"] = l
    ret["center"] = c

    return ret


@app.route('/name', methods=['POST'])
def form_post():
    params = request.get_json()
    name = params['name']
    b = bcrypt.hashpw(name.encode('utf-8'), bcrypt.gensalt())
    b = b.decode('utf-8')
    uname = name + b[9:13].upper()

    conn = pymysql.connect(
        user=os.environ.get("MYSQL_USER"),
        password=os.environ.get("MYSQL_PASSWORD"),
        host=os.environ.get("MYSQL_HOST"),
        db=os.environ.get("MYSQL_DB"),
        charset='utf8mb4'
    )
    with conn:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO user (name, uname) VALUES ('%s', '%s')" % (name, uname))
            conn.commit()

    ret = {"msg": uname}

    return ret


@app.route('/result', methods=['GET'])
def result():
    name = request.args.get('name')

    conn = pymysql.connect(
        user=os.environ.get("MYSQL_USER"),
        password=os.environ.get("MYSQL_PASSWORD"),
        host=os.environ.get("MYSQL_HOST"),
        db=os.environ.get("MYSQL_DB"),
        charset='utf8mb4'
    )

    ret = {}
    ret["habit"] = []
    ret["gaze"] = []
    blinking = right = left = center = 0
    habit = defaultdict(int)
    habit_sum = 0
    with conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM gaze WHERE name = ('%s')" % (name))
            res1 = cur.fetchall()

            for id, name, b, r, l, c in res1:
                blinking += b
                right += r
                left += l
                center += c
                if l+r == 0:
                    ratio = 0
                else:
                    ratio = (r+l) / (b+r+l+c)
                temp = {
                    "id": id,
                    "name": name,
                    "ratio": ratio
                }
                ret["gaze"].append(temp)
            if right + left == 0:
                gaze_ratio = 0
            else:
                gaze_ratio = (right+left) / (blinking+right+left+center)
            if gaze_ratio <= 0.01:
                gaze_grade = "상"
            elif gaze_ratio >= 0.05:
                gaze_grade = "하"
            else:
                gaze_grade = "중"
            ret["gaze_grade"] = gaze_grade
            ret["gaze_ratio"] = gaze_ratio

            cur.execute("SELECT * FROM habit_word WHERE name = ('%s')" % (name))
            res2 = cur.fetchall()

            for id, name, text, cnt in res2:
                habit[text] += cnt
                habit_sum += cnt
            sort_habit = sorted(habit.items(), key=lambda x:-x[1])
            ret["habit"].append((sort_habit[0][0], sort_habit[0][1]))
            ret["habit"].append((sort_habit[1][0], sort_habit[1][1]))
            ret["habit"].append((sort_habit[2][0], sort_habit[2][1]))
            ret["habit_sum"] = habit_sum
    return ret


@app.route('/gara_result', methods=['GET'])
def gara_result():
    ret = {
        "gaze": [
            {
                "id": 1,
                "name": "name",
                "ratio": 0.0113475177304964
            },
            {
                "id": 2,
                "name": "name",
                "ratio": 0.2134751773049643
            },
            {
                "id": 3,
                "name": "name",
                "ratio": 0.0413475177304964
            },
            {
                "id": 4,
                "name": "name",
                "ratio": 0.0513475177304964
            },
            {
                "id": 5,
                "name": "name",
                "ratio": 0.0774193548387097
            }
        ],
        "gaze_grade": "하",
        "gaze_ratio": 0.0972329688814129,
        "habit": [
            [
                "아",
                8
            ],
            [
                "그",
                4
            ],
            [
                "아니",
                1
            ]
        ],
        "habit_sum": 15,
        "emotion": [
            {
                "id": 1,
                "name": "name",
                "ratio": 0.9113475177304964
            },
            {
                "id": 2,
                "name": "name",
                "ratio": 0.1134751773049643
            },
            {
                "id": 3,
                "name": "name",
                "ratio": 0.8413475177304964
            },
            {
                "id": 4,
                "name": "name",
                "ratio": 0.0513475177304964
            },
            {
                "id": 5,
                "name": "name",
                "ratio": 0.1774193548387097
            }
        ],
        "emotion_grade": "중",
        "emotion_ratio": 0.6072329688814129,
    }
    return ret

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
