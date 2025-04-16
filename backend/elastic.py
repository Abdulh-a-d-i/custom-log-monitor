from elasticsearch import Elasticsearch
import datetime

es = Elasticsearch("http://localhost:9200")

def send_to_elasticsearch(logs):
    for log in logs:
        doc = {
            "timestamp": datetime.datetime.now().isoformat(),
            "message": log
        }
        es.index(index="system-logs", document=doc)
