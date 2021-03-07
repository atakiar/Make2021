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
ser = serial.Serial("/dev/ttyACM0", 9600)
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
humid = 0
fall_event = False
sent_text = False

# Arduino Helpers
def readFromArduino() -> str:
    message = ser.readline().decode().strip()
    print(message)
    return message


def writeToArduino(message: str) -> None:
    print(message)
    ser.write(message.encode("utf-8"))


def getArduinoData() -> None:
    threading.Timer(0.5, getArduinoData).start()
    message = readFromArduino()
    if message and message != "" and message.replace(" ", "") != "":
        # Update globals / return data here
        data_points = message.split(",")
        global sound, uv, gas, temperature, electricity, humid, fall_event, sent_text
        electricity = int(float(data_points[0]))
        sound = int(float(data_points[1]))
        uv = data_points[2]
        gas = int(float(data_points[3]))
        temperature = data_points[4]
        humid = data_points[5]
        fall_event = data_points[6] == '1'
        if(not sent_text and fall_event):
            sent_text = True
            sendSMS('Employee Jon has taken a fall!')
            print('Sent text')
        elif(sent_text and not fall_event):
            sent_text = False
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

@app.route("/data")
def hud() -> Dict[str, Any]:
    global sound, uv, gas, temperature, electricity, humid, fall_event
    data = {"electricity": electricity, "sound": sound, "gas": gas, "uv":uv, "temperature": temperature, "humid" : humid, "fall_event": fall_event}
    return data

# GET /hud
# gas (int), sound (int), electricity (int 0-100)
# Return {“electricity”: 10, “sound”: 73, “gas”: 940}


# Main
def main() -> None:
    # sendArduinoData()
    time.sleep(3)
    getArduinoData()
    app.run(host="0.0.0.0", port=5000)
    # sendSMS("Execute Order 66")


if __name__ == "__main__":
    main()