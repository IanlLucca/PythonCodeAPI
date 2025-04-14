import { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, StatusBar, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TelaRegistro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegistrar = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não correspondem.');
      return;
    }

    setLoading(true);

    try {
      // Simulação de resposta do servidor
      const response = { success: true };

      if (response && response.success) {
        Alert.alert('Sucesso', 'Registro efetuado com sucesso!');
        navigation.navigate('TelaLogin');
      } else {
        Alert.alert(
          'Erro',
          response.message || 'Falha ao efetuar registro. Tente novamente.'
        );
      }
    } catch (error) {
      console.error('Erro durante o registro', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao tentar fazer o registro. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
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
      <View style={styles.text}>
        <Text style={styles.welcomeText}>Cadastre-se</Text>
        <Text style={styles.loginText}>Crie sua conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor="#fff"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#fff"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#fff"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar senha"
          placeholderTextColor="#fff"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegistrar}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Registrar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.registerText}>Já tem uma conta? Faça login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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

  text: {
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

  registerText: {
    color: '#fff',
    marginTop: 15,
    textDecorationLine: 'none',
  },
});
