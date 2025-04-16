import re

LOG_FILE_PATH = "/var/log/syslog"  # Or any other log file
SEVERITIES = ["ERROR", "WARNING", "CRITICAL"]

def get_filtered_logs():
    filtered_logs = []
    try:
        with open(LOG_FILE_PATH, "r") as f:
            for line in f:
                if any(severity in line.upper() for severity in SEVERITIES):
                    filtered_logs.append(line.strip())
    except Exception as e:
        print(f"Error reading log file: {e}")
    return filtered_logs
