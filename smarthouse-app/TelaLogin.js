import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, Switch, Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [manterConectado, setManterConectado] = useState(false);

  const handleAcessar = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      // Simulação de uma resposta bem-sucedida da API
      const response = { token: 'fake_token' };

      if (response && response.token) {
        Alert.alert('Sucesso', 'Login efetuado com sucesso!');
        // Salva o estado de "manter conectado" para futuras sessões
        console.log('Manter conectado:', manterConectado);
        navigation.navigate('TelaDispositivo');
      } else {
        Alert.alert(
          'Erro',
          response.message ||
            'Falha ao efetuar login. Verifique suas informações.'
        );
      }
    } catch (error) {
      console.error('Erro durante o login', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao tentar fazer o login. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('TelaEsqueceuSenha'); // Navega para a tela EsqueceuSenha
  };

  const handleRegister = () => {
    navigation.navigate('TelaRegistro'); // Navega para a tela de registro
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.time}>8:00</Text>
        <View style={styles.rightIcons}>
          <View style={styles.signal}>
            <Image
              source={require('./assets/sinal.png')}
              style={styles.imgIcon}
            />
          </View>
          <View style={styles.wifiSignal}>
            <Ionicons name="wifi" size={20} color="white" />
          </View>
          <View style={styles.battery}>
            <Ionicons name="battery-full" size={20} color="white" />
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.welcomeText}>Seja bem-vindo</Text>
        <Text style={styles.loginText}>Efetue o seu login</Text>

        <TextInput
          style={styles.input}
          placeholder="E-mail ou usuário"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#fff"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <View style={styles.manterConectadoContainer}>
          <Switch
            value={manterConectado}
            onValueChange={setManterConectado}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={manterConectado ? '#f4f3f4' : '#f4f3f4'}
          />
          <Text style={styles.manterConectadoText}>Manter-me conectado</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAcessar}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Acessar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text style={styles.registerText}>
            Não tem uma conta? Registre-se
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },

  time: {
    color: 'white',
    fontSize: 16,
  },

  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  wifiSignal: {
    marginRight: 5,
  },

  battery: {
    marginRight: 5,
  },

  imgIcon: {
    width: 15,
    height: 15,
    tintColor: 'white',
    marginRight: 5,
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#DC0072',
    marginBottom: 15,
  },

  loginText: {
    fontSize: 17,
    color: '#DC0072',
    marginBottom: 30,
  },

  input: {
    width: '90%',
    height: 40,
    borderColor: '#DC0072',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 12,
    color: '#fff',
  },

  button: {
    backgroundColor: '#DC0072',
    paddingVertical: 12,
    borderRadius: 100,
    width: '90%',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  forgotPasswordText: {
    color: '#fff',
    marginTop: 20,
    textDecorationLine: 'none',
  },

  registerButton: {
    marginTop: 15,
    textDecorationLine: 'none',
  },

  registerText: {
    color: '#fff',
    fontSize: 14,
  },

  manterConectadoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '60%',
  },

  manterConectadoText: {
    color: '#fff',
    marginLeft: 8,
  },
});
