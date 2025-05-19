import React, { useState, useEffect  } from 'react';
import { View, Text, Switch, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TelaDispositivo() {
  const [temperatura, setTemperatura] = useState(15);
  const [localizacao, setLocalizacao] = useState('São Paulo');
  const [sensorTempLigado, setSensorTempLigado] = useState(true);
  const [sensorFumacaLigado, setSensorFumacaLigado] = useState(true);
  const [alarmeLigado, setAlarmeLigado] = useState(false);

  const sensacaoTermica = 10;
  const temperaturaMinima = 10;
  const temperaturaMaxima = 20;
  const descricaoClima = 'Nublado com chuva';
  const iconeNome = 'rainy';
  const iconeTamanho = 30;
  const iconeCor = 'white';

const ipESP32 = '192.168.108.198';

  const Localizacao = () => {
    return (
      <View style={styles.container}>
        <LinearGradient colors={['#A480CF', '#DC0072']} style={styles.gradient}>
          <View style={styles.infoContainer}>
            <Text style={styles.localizacao}>{localizacao}</Text>
            <Ionicons name={iconeNome} size={iconeTamanho} color={iconeCor} style={styles.icone} />
            <Text style={styles.temperatura}>{temperatura}°</Text>
            <Text style={styles.descricao}>{descricaoClima}</Text>
            <Text style={styles.sensacao}>Sensação: {sensacaoTermica}°</Text>
            <View style={styles.tempMinMax}>
              <Text style={styles.minMaxText}>Min: {temperaturaMinima}°</Text>
              <Text style={styles.minMaxText}>Max: {temperaturaMaxima}°</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  const SensorTemperatura = () => {
  const [temperatura, setTemperatura] = useState(false);

  useEffect(() => {
    const fetchTemperatura = async () => {
      try {
        const response = await fetch(`http://${ipESP32}/temp`);
        const temp = await response.text(); 
        setTemperatura(temp);
      } catch (error) {
        console.error("Erro ao buscar temperatura:", error);
        setTemperatura("Erro");
      }
    };

    
    fetchTemperatura();
    const intervalo = setInterval(fetchTemperatura, 10000);

    return () => clearInterval(intervalo); 
  }, []);

  return (
    <View style={styles.sensorContainer}>
      <Text style={styles.sensorTexto}>Temperatura da Casa:</Text>
      <Text style={styles.sensorValor}>
        {temperatura !== null ? `${temperatura} °C` : 'Carregando...'}
      </Text>
    </View>
  );
};

  const LuzesSala = () => {
    const [luzSalaLigada, setLuzSalaLigada] = useState(false);

  const toggleLed = async (led, novoEstado) => {
    const comando = novoEstado ? 'on' : 'off';
    const url = `http://${ipESP32}/led1/${comando}`;

    try {
      const resposta = await fetch(url);
      if (resposta.ok) {
        console.log(`Comando ${comando} enviado com sucesso`);
      } else {
        console.error('Erro ao enviar comando para ESP32');
      }
    } catch (erro) {
      console.error('Erro de conexão:', erro);
    }
  };

  return (
    <View style={styles.luzContainer}>
      <Text style={styles.luzTexto}>Luz Sala</Text>
      <Switch
        value={luzSalaLigada}
        onValueChange={() => {
          const novoEstado = !luzSalaLigada;
          setLuzSalaLigada(novoEstado);
          toggleLed('luzSala', novoEstado);
        }}
      />
    </View>
  );
};

  const SensorFumaca = () => {
    return (
      <View style={styles.sensorContainer}>
        <Text style={styles.sensorTexto}>Sensor de Fumaça</Text>
        <Switch value={sensorFumacaLigado} onValueChange={() => { setSensorFumacaLigado(!sensorFumacaLigado); toggleLed('sensorFumaca', !sensorFumacaLigado); }} />
      </View>
    );
  };

  const LuzesCozinha = () => {
    const [luzCozinhaLigada, setLuzCozinhaLigada] = useState(false);

  const toggleLed = async (led, novoEstado) => {
    const comando = novoEstado ? 'on' : 'off';
    const url = `http://${ipESP32}/led2/${comando}`;

    try {
      const resposta = await fetch(url);
      if (resposta.ok) {
        console.log(`Comando ${comando} enviado com sucesso`);
      } else {
        console.error('Erro ao enviar comando para ESP32');
      }
    } catch (erro) {
      console.error('Erro de conexão:', erro);
    }
  };

  return (
    <View style={styles.luzContainer}>
      <Text style={styles.luzTexto}>Luz Cozinha</Text>
      <Switch
        value={luzCozinhaLigada}
        onValueChange={() => {
          const novoEstado = !luzCozinhaLigada;
          setLuzCozinhaLigada(novoEstado);
          toggleLed('luzCozinha', novoEstado);
        }}
      />
    </View>
  );
};

  const LuzesQuarto = () => {
    const [luzQuartoLigada, setLuzQuartoLigada] = useState(false);

  const toggleLed = async (led, novoEstado) => {
    const comando = novoEstado ? 'on' : 'off';
    const url = `http://${ipESP32}/led3/${comando}`;

    try {
      const resposta = await fetch(url);
      if (resposta.ok) {
        console.log(`Comando ${comando} enviado com sucesso`);
      } else {
        console.error('Erro ao enviar comando para ESP32');
      }
    } catch (erro) {
      console.error('Erro de conexão:', erro);
    }
  };

  return (
    <View style={styles.luzContainer}>
      <Text style={styles.luzTexto}>Luz Quarto</Text>
      <Switch
        value={luzQuartoLigada}
        onValueChange={() => {
          const novoEstado = !luzQuartoLigada;
          setLuzQuartoLigada(novoEstado);
          toggleLed('luzQuarto', novoEstado);
        }}
      />
    </View>
  );
};

  const LuzesBanheiro = () => {
    const [luzBanheiroLigada, setLuzBanheiroLigada] = useState(false);

  const toggleLed = async (led, novoEstado) => {
    const comando = novoEstado ? 'on' : 'off';
    const url = `http://${ipESP32}/led4/${comando}`;

    try {
      const resposta = await fetch(url);
      if (resposta.ok) {
        console.log(`Comando ${comando} enviado com sucesso`);
      } else {
        console.error('Erro ao enviar comando para ESP32');
      }
    } catch (erro) {
      console.error('Erro de conexão:', erro);
    }
  };

  return (
    <View style={styles.luzContainer}>
      <Text style={styles.luzTexto}>Luz Banheiro</Text>
      <Switch
        value={luzBanheiroLigada}
        onValueChange={() => {
          const novoEstado = !luzBanheiroLigada;
          setLuzBanheiroLigada(novoEstado);
          toggleLed('luzBanheiro', novoEstado);
        }}
      />
    </View>
  );
};

  const LuzesExterna = () => {
    const [luzExternaLigada, setLuzExternaLigada] = useState(false);

  const toggleLed = async (led, novoEstado) => {
    const comando = novoEstado ? 'on' : 'off';
    const url = `http://${ipESP32}/led5/${comando}`;

    try {
      const resposta = await fetch(url);
      if (resposta.ok) {
        console.log(`Comando ${comando} enviado com sucesso`);
      } else {
        console.error('Erro ao enviar comando para ESP32');
      }
    } catch (erro) {
      console.error('Erro de conexão:', erro);
    }
  };

  return (
    <View style={styles.luzContainer}>
      <Text style={styles.luzTexto}>Luz Externa</Text>
      <Switch
        value={luzExternaLigada}
        onValueChange={() => {
          const novoEstado = !luzExternaLigada;
          setLuzExternaLigada(novoEstado);
          toggleLed('luzExterna', novoEstado);
        }}
      />
    </View>
  );
};

  const Alarme = () => {
    return (
      <View style={styles.alarmeContainer}>
        <Text style={styles.alarmeTexto}>Alarme</Text>
        <Switch value={alarmeLigado} onValueChange={() => { setAlarmeLigado(!alarmeLigado); toggleLed('alarme', !alarmeLigado); }} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>8:00</Text>
          <View style={styles.rightIcons}>
            <View style={styles.signal}>
              <Image source={require('./assets/sinal.png')} style={styles.imgIcon} />
            </View>
            <View style={styles.wifiSignal}>
              <Ionicons name="wifi" size={20} color="white" />
            </View>
            <View style={styles.battery}>
              <Ionicons name="battery-full" size={20} color="white" />
            </View>
          </View>
        </View>
        <View style={styles.dispositivosHeader}>
          <Text style={styles.titulo}>Dispositivos</Text>
          <MaterialIcons name="settings" size={24} color="#DC0072" />
        </View>
        <View style={styles.membrosContainer}>
          <Text style={styles.subtitulo}>Membros da Família</Text>
          <Image source={require('./assets/user.png')} style={styles.fotoUsuario} />
        </View>
        <Localizacao />
        <SensorTemperatura />
        <LuzesSala />
        <SensorFumaca />
        <LuzesCozinha />
        <LuzesQuarto />
        <LuzesBanheiro />
        <LuzesExterna />
        <Alarme />
      </ScrollView>
      <SafeAreaView style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="home" size={30} color="#DC0072" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="microphone" size={30} color="#DC0072" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Icon name="user" size={30} color="#DC0072" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#000000',
    padding: 20,
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DC0072',
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DC0072',
  },

  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },

  localizacao: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  temperatura: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  sensacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    color: 'white',
  },

  tempMinMax: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },

  minMaxText: {
    color: 'white',
  },

  descricao: {
    marginBottom: 15,
    color: 'white',
    fontSize: 14,
  },

  icone: {
    fontSize: 30,
  },

  gradient: {
    flex: 1,
    display: 'flex',
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },

  sensorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  luzContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  alarmeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  sensorTexto: {
    fontSize: 17,
    color: '#DC0072',
  },

  luzTexto: {
    fontSize: 17,
    color: '#DC0072',
  },

  alarmeTexto: {
    fontSize: 17,
    color: '#DC0072',
  },

  membrosContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  fotoUsuario: {
    width: 24,
    height: 24,
    borderRadius: 15,
    tintColor: '#DC0072',
  },

  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },

  time: {
    color: 'white',
    fontSize: 15,
  },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  signal: {
    marginRight: 5,
  },

  wifiSignal: {
    marginRight: 5,
  },

  battery: {
    marginRight: 0,
  },

  imgIcon: {
    width: 15,
    height: 15,
    tintColor: 'white',
  },

  dispositivosHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#ffffff',
  },

  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
