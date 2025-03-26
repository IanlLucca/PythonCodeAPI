import serial.tools.list_ports

ports = serial.tools.list_ports.comports() 
serialInst = serial.Serial()
portListt = []

for one in ports:
    portListt.append(str(one))
    print(str(one))

com = input("Selecione a porta Com para o arduino: ")

for i in range(len(portListt)):
    if portListt[i].startswith("COM" + (com)):
        use = "COM" + str(com)
        print(use)

serialInst.baudrate = 9600
serialInst.port = use
serialInst.open()

while True:
    command = input("Comando do Arduino (ON/OFF/Saida): ")
    serialInst.write(command.encode('utf-8'))

    if command == "Saida":
        exit()