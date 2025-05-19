from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import asyncio
from pydantic import BaseModel
import subprocess
import uuid

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
     allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.websocket("/ws/logs")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    process = await asyncio.create_subprocess_exec(
        'sudo', 'tail', '-n', '50', '-f', '/var/log/syslog',  # or test.log for testing
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )

    try:
        while True:
            line = await process.stdout.readline()
            if not line:
                break
            await websocket.send_text(line.decode().strip())
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        process.kill()
        await websocket.close()


class Ticket(BaseModel):
    log: str

# Dummy storage for tickets (in-memory list)
tickets_db = []

@app.post("/create-ticket")
async def create_ticket(ticket: Ticket):
    ticket_id = str(uuid.uuid4())
    ticket_entry = {
        "id": ticket_id,
        "log": ticket.log,
        "created_at": datetime.now().isoformat()
    }
    tickets_db.append(ticket_entry)
    print(f"Ticket created: {ticket_entry}")
    return {"message": "Ticket created successfully", "ticket_id": ticket_id}