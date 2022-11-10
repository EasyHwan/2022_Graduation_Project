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
    uname = name + "#" + b[9:13].upper()

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
                    ratio = (b+r+l+c) / (r+l)
                temp = {
                    "id": id,
                    "name": name,
                    "ratio": ratio
                }
                ret["gaze"].append(temp)
            if right + left == 0:
                gaze_ratio = 0
            else:
                gaze_ratio = (blinking+right+left+center) / (right+left)
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
            sort_habit = sorted(habit.items(), key=lambda x:-x[1])
            ret["habit"].append((sort_habit[0][0], sort_habit[0][1]))
            ret["habit"].append((sort_habit[1][0], sort_habit[1][1]))
            ret["habit"].append((sort_habit[2][0], sort_habit[2][1]))
    return ret
'''
((1, 'name', 53, 141, 0, 5), (2, 'name', 0, 0, 0, 0), (3, 'name', 53, 141, 0, 5), (4, 'name', 53, 141, 0, 5), (5, 'name', 7, 180, 6, 26), (6, 'name', 7, 180, 6, 26), (7, 'name', 97, 1, 9, 112), (8, 'name', 96, 3, 9, 111), (9, 'name', 7, 180, 6, 26), (10, 'name', 7, 180, 6, 26))
((9, 'name', '아', 2), (10, 'name', '아니', 0), (11, 'name', '그', 1), (12, 'name', '음', 0), (13, 'name', '어', 0), (14, 'name', '습', 0), (15, 'name', '엄', 0), (16, 'name', '아', 2), (17, 'name', '아니', 0), (18, 'name', '그', 1), (19', 0), (20, 'name', '어', 0), (21, 'name', '습', 0), (22, 'name', '엄', 0), (23, 'name', '아', 2), (24, 'name', '아니', 0), (25, 'name', '그', 1), (26, 'name', '음', 0), (27, 'name', '어', 0), (28, 'name', '습', 0), (29, 'name', '엄', 0)e', '아', 2), (31, 'name', '아니', 0), (32, 'name', '그', 1), (33, 'name', '음', 0), (34, 'name', '어', 0), (35, 'name', '습', 0), (36, 'name', '엄', 0))
'''


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
