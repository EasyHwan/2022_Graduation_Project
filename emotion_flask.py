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
from emotion_analyze import *


app = Flask(__name__)
#CORS(app, supports_credentials=True)
CORS(app, resources={r'*': {'origins': ['https://letmeinterview.vercel.app', 'http://localhost:3000']}}, supports_credentials=True)


@app.route('/')
def index():
    my_res = {"res": "hi"}
    return my_res


@app.route('/emotion', methods=['POST'])
def emotion_post():

    conn = pymysql.connect(
        user=os.environ.get("MYSQL_USER"),
        password=os.environ.get("MYSQL_PASSWORD"),
        host=os.environ.get("MYSQL_HOST"),
        db=os.environ.get("MYSQL_DB"),
        charset='utf8mb4'
    )
    mov_data = request.files['data']
    name = request.args.get('name')
    angry, disgust, fear, happy, sad, surprise, neutral = emotion(mov_data)

    ret = {
        "angry": angry,
        "disgust": disgust,
        "fear": fear,
        "happy": happy,
        "sad": sad,
        "surprise": surprise,
        "neutral": neutral,
    }

    with conn:
        with conn.cursor() as cur:
            cur.execute("INSERT INTO emotion (name, angry, disgust, fear, happy, sad, surprise, neutral) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')" % (name, angry, disgust, fear, happy, sad, surprise, neutral))
            conn.commit()

    return ret


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
