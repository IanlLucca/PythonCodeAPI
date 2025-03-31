import serial.tools.list_ports

ports = serial.tools.list_ports.comports() 
serialInst = serial.Serial()
portList = []

for one in ports:
    portList.append(str(one))
    print(str(one))

com = input("Selecione a porta Com para o arduino: ")

for i in range(len(portList)):
    if portList[i].startswith("COM" + str(com)):
        use = "COM" + str(com)
        print(use)

serialInst.baudrate = 9600
serialInst.port = use
serialInst.open()

while True:
    command = input("Comando do Arduino (ON/OFF/exit): ")
    serialInst.write(command.encode('utf-8'))

    if command == "exit":
        exit()