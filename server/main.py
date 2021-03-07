import time
import serial
import threading
import os
from requests import get
from typing import Any, Dict
from flask import Flask, jsonify
from flask_cors import CORS
from twilio.rest import Client

# Twillio Setup
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
to_phone_number = os.environ['PHONE_NUMBER']
client = Client(account_sid, auth_token)

# Serial Setup
ser = serial.Serial("/dev/ttyUSB0", 9600)
time.sleep(2)

# Flask Setup
app = Flask(__name__)
CORS(app)

# Data Points setup
electricity = 0
sound = 0
gas = 0
uv = 0
temperature = 0
pulse = 0
fall_event = 0

# Arduino Helpers
def readFromArduino() -> str:
    message = ser.readline().decode().strip()
    print(message)
    return message


def writeToArduino(message: str) -> None:
    print(message)
    ser.write(message.encode("utf-8"))


def getArduinoData() -> None:
    threading.Timer(3.0, getArduinoData).start()
    message = readFromArduino()
    if message and message != "" and message.replace(" ", "") != "":
        # Update globals / return data here
        data_points = message.split()
        sound = message[0]
        uv = message[1]
        gas = message[2]
        temperature = message[3]
        electricity = message[4]
        pulse = message[5]
        fall_event = message[6]
        print(data_points)


def sendArduinoData() -> None:
    threading.Timer(3.0, sendArduinoData).start()
    # Get data and comma separate here
    message = "Hello World"
    writeToArduino(message)

# SMS helper functions
def sendSMS(message: str) -> None:
    client.messages \
                .create(
                     body=message,
                     from_='+16144121004',
                     to=to_phone_number
                 )


# Flask Helpers
@app.route("/")
def root() -> Dict[str, Any]:
    data = {"success": True}
    return data

@app.route("/hud")
def hud() -> Dict[str, Any]:
    return {"electricity": electricity, "sound": sound, "gas": gas}

# GET /hud
# gas (int), sound (int), electricity (int 0-100)
# Return {“electricity”: 10, “sound”: 73, “gas”: 940}


# Main
def main() -> None:
    # sendArduinoData()
    getArduinoData()
    app.run(host="0.0.0.0", port=5000)
    # sendSMS("Execute Order 66")


if __name__ == "__main__":
    main()