from flask import Flask
from flask import request
import pymysql
import json
from dotenv import load_dotenv
import os

app = Flask(__name__)


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


if __name__ == "__main__":
    app.run()
