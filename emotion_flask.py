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
    mov_data = request.files['data']
    name = request.args.get('name')
    angry, disgust, fear, happy, sad, surprise, neutral = emotion(mov_data)

    delete_file = f"src/{mov_data.filename}"
    if os.path.isfile(delete_file):
        os.remove(delete_file)

    ret = {
        "angry": angry,
        "disgust": disgust,
        "fear": fear,
        "happy": happy,
        "sad": sad,
        "surprise": surprise,
        "neutral": neutral,
    }
    return ret


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000)
