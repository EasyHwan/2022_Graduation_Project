from flask import Flask
from flask import request
import pymysql
import json
from dotenv import load_dotenv
import os
from flask_cors import CORS

import sys, os, base64, datetime, hashlib, hmac
import requests # pip install requests

import boto3

app = Flask(__name__)
CORS(app)


@app.route('/')
def index():
    return "hi"


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


def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()


def getSignatureKey(key, dateStamp, regionName, serviceName):
    kDate = sign(('AWS4' + key).encode('utf-8'), dateStamp)
    kRegion = sign(kDate, regionName)
    kService = sign(kRegion, serviceName)
    kSigning = sign(kService, 'aws4_request')
    return kSigning


@app.route('/s3-signature')
def s3_signature():
    method = 'GET'
    service = 'ec2'
    host = 'ec2.amazonaws.com'
    region = 'ap-northeast-2'
    endpoint = 'https://ec2.amazonaws.com'

    access_key = os.environ.get('AWS_ACCESS_KEY_ID')
    secret_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
    if access_key is None or secret_key is None:
        return 'No access key is available.'

    t = datetime.datetime.utcnow()
    amzdate = t.strftime('%Y%m%dT%H%M%SZ')
    datestamp = t.strftime('%Y%m%d') # Date w/o time, used in credential scope

    canonical_uri = '/'

    canonical_headers = 'host:' + host + '\n' + 'x-amz-date:' + amzdate + '\n'

    signed_headers = 'host;x-amz-date'

    payload_hash = hashlib.sha256(('').encode('utf-8')).hexdigest()

    canonical_request = method + '\n' + canonical_uri + '\n' + canonical_querystring + '\n' + canonical_headers + '\n' + signed_headers + '\n' + payload_hash

    algorithm = 'AWS4-HMAC-SHA256'
    credential_scope = datestamp + '/' + region + '/' + service + '/' + 'aws4_request'
    string_to_sign = algorithm + '\n' + amzdate + '\n' + credential_scope + '\n' + hashlib.sha256(canonical_request.encode('utf-8')).hexdigest()

    signing_key = getSignatureKey(secret_key, datestamp, region, service)

    signature = hmac.new(signing_key, (string_to_sign).encode('utf-8'), hashlib.sha256).hexdigest()

    authorization_header = algorithm + ' ' + 'Credential=' + access_key + '/' + credential_scope + ', ' + 'SignedHeaders=' + signed_headers + ', ' + 'Signature=' + signature

    headers = {'x-amz-date':amzdate, 'Authorization':authorization_header}

    # ************* SEND THE REQUEST *************
    request_url = endpoint + '?' + canonical_querystring

    print('\nBEGIN REQUEST++++++++++++++++++++++++++++++++++++')
    print('Request URL = ' + request_url)
    r = requests.get(request_url, headers=headers)

    print('\nRESPONSE++++++++++++++++++++++++++++++++++++')
    print('Response code: %d\n' % r.status_code)
    print(r.text)


@app.route('/s3-upload', methods=['POST'])
def s3_upload():
    try:
        file_name = request.form['file_name']
        data = request.form['data']
        bucket = os.environ.get('BUCKET_NAME')
        s3 = boto3.client(
            's3',
            region_name='ap-northeast-2',
            aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
            aws_secret_access_key=os.environ.get('AWS_SECRET_ACCESS_KEY')
        )
        content="requirement.txt"
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
def s3_upload2():
    try:
        file_name = request.args.get('file_name')
        data = request.form['data']
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

if __name__ == "__main__":
    app.run(host='0.0.0.0')
