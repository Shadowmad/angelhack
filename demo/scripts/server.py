import socket
import sys
import cv2
import pickle
import struct
import time

HOST = 'localhost'
PORT = 8089
SOCKET_SPEED = 4194304

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print("Socket created")

s.bind((HOST,PORT))
print("Socket bind complete")
s.listen(1)
print("Socket now listening")

conn, addr = s.accept()

data = b""
payload_size = struct.calcsize("L")
while True:
	while len(data) < payload_size:
		data += conn.recv(4096)
	packed_msg_size = data[:payload_size]
	data = data[payload_size:]
	msg_size = struct.unpack("L", packed_msg_size)[0]
	print("Read msg size: %d", msg_size)
	while len(data) < msg_size:
		data += conn.recv(SOCKET_SPEED)
	frame_data = data[:msg_size]
	data = data[msg_size:]

	frame = pickle.loads(frame_data)
	
	# display frames on the screen
	#print(frame)
	#cv2.imshow('my webcam', frame)

	# save frames
	timestamp = time.strftime("%m%d%Y-%H:%m:%S")
	cv2.imwrite("../storage/images/image-" + timestamp + ".jpg", frame)

	if cv2.waitKey(1) == 27: 
		break  # esc to quit