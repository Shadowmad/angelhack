import cv2
import socket
import struct
import pickle


def read_webcam():
	cam = cv2.VideoCapture(0)
	clientsocket = socket.socket(socket.AF_INET,socket.SOCK_STREAM)
	clientsocket.connect(('localhost', 8089))
	while True:
		ret_val, frame = cam.read()
		data = pickle.dumps(frame)
		data = struct.pack("L", len(data)) + data
		#data = data.encode("utf-8")
		print(len(data))
		# sending frame to the server
		clientsocket.sendall(data)

		# displaying frame on the screen
		# cv2.imshow('my webcam', frame)
		# if cv2.waitKey(1) == 27: 
		# 	break  # esc to quit
	cv2.destroyAllWindows()


def main():
	read_webcam()


if __name__ == '__main__':
	main()
