from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from elasticsearch import Elasticsearch
import datetime
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

es = Elasticsearch("http://localhost:9200")
LOG_FILE_PATH = "/home/abdul06/Desktop/custom-log-monitor/backend/test.log"
SEVERITIES = ["ERROR", "WARNING", "CRITICAL"]

def send_to_elasticsearch(logs):
    try:
        if not es.ping():
            print("Elasticsearch not reachable")
            return
        for log in logs:
            doc = {
                "timestamp": datetime.datetime.now().isoformat(),
                "message": log
            }
            res = es.index(index="system-logs", document=doc)
            print(f"Indexed log: {res['_id']}")
    except Exception as e:
        print(f"Error sending to Elasticsearch: {type(e).__name__}: {str(e)}")

def get_filtered_logs():
    filtered_logs = []
    try:
        with open(LOG_FILE_PATH, "r") as file:
            for line in file:
                if any(severity in line.upper() for severity in SEVERITIES):
                    filtered_logs.append(line.strip())
        return filtered_logs[-100:]
    except PermissionError:
        print(f"Permission denied accessing {LOG_FILE_PATH}")
        return ["Permission denied - cannot read log file"]
    except Exception as e:
        print(f"Error reading log file: {e}")
        return []

@app.get("/")
def root():
    return {"message": "Welcome to the Log Monitor API"}

@app.get("/logs")
def get_logs():
    try:
        logs = get_filtered_logs()
        if logs:
            send_to_elasticsearch(logs)
        return {"logs": logs}
    except Exception as e:
        print(f"Error in get_logs: {e}")
        return {"logs": [], "error": str(e)}