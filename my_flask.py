from flask import Flask
from flask import request, Response
import pymysql
import json
from dotenv import load_dotenv
import os
from flask_cors import CORS, cross_origin

import sys, os, base64, datetime, hashlib, hmac
import requests # pip install requests
from habit import *

import boto3

app = Flask(__name__)
#CORS(app, supports_credentials=True)
CORS(app, resources={r'*': {'origins': ['https://letmeinterview.vercel.app', 'http://localhost:3000']}}, supports_credentials=True)



@app.route('/')
def index():
    my_res = flask.Response("hi")
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
    name = request.args.get('name')

    conn = pymysql.connect(
        user=os.environ.get("MYSQL_USER"),
        password=os.environ.get("MYSQL_PASSWORD"),
        host=os.environ.get("MYSQL_HOST"),
        db=os.environ.get("MYSQL_DB"),
        charset='utf8mb4'
    )
    sound_count = analyze_habit(sound_data)
    word = ['아', '아니', '그', '음', '어', '습', '엄']
    with conn:
        with conn.cursor() as cur:
            for i in range(len(word)):
                cur.execute("INSERT INTO habit_word (name, word, count) VALUES ('%s', '%s', '%s')" % (name, word[i], sound_count[i]))
                conn.commit()
    return "success"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
