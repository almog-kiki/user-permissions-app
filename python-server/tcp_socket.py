# run : python tcp_socket.py
import socket

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind(('localhost', 1337))
s.listen(5)
print("wait..")
while True:
    conn, addr = s.accept()
    while 1:
        data = conn.recv(1024)
        print( data )
        if not data:
            break
    conn.sendall(data)

conn.close()

