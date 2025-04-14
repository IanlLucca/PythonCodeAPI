import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TelaEsqueceuSenha({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagemEnviada, setMensagemEnviada] = useState(false);

  const handleRecuperarSenha = async () => {
    if (!email) {
      Alert.alert('Por favor, insira seu e-mail.');
      return;
    }

    setLoading(true);

    try {
      // Simulação de resposta da API
      const response = {
        success: true,
        message: 'Um link de recuperação foi enviado para o email.',
      };
      if (response && response.success) {
        setMensagemEnviada(true);
      } else {
        Alert.alert(
          'Erro',
          response.message ||
            'Falha ao enviar e-mail de recuperação. Verifique o e-mail inserido.'
        );
      }
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao tentar solicitar a recuperação de senha. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.welcomeText}>Esqueceu sua senha?</Text>
        <Text style={styles.loginText}>
          Informe seu e-mail para recuperação
        </Text>

        {!mensagemEnviada ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Seu e-mail"
              placeholderTextColor="#fff"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleRecuperarSenha}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Enviar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.registerText}>Voltar para o login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.mensagemContainer}>
            <Text style={styles.mensagemSucesso}>
              Um link de recuperação foi enviado para o email {email}. Por
              favor, verifique sua caixa de entrada e siga as instruções.
            </Text>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.voltarLogin}>Voltar para o login</Text>
            </TouchableOpacity>
          </View>
        )}
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
    justifyContent: 'center',
  },

  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#DC0072',
    marginBottom: 10,
    textAlign: 'center',
  },

  loginText: {
    fontSize: 17,
    color: '#DC0072',
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    width: '85%',
    height: 45,
    borderColor: '#DC0072',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 30,
    paddingHorizontal: 5,
    color: '#fff',
    alignSelf: 'center',
  },

  button: {
    backgroundColor: '#DC0072',
    paddingVertical: 12,
    borderRadius: 100,
    width: '85%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  registerText: {
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 10,
  },

  mensagemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mensagemSucesso: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },

  voltarLogin: {
    color: '#ffffff',
    fontSize: 16,
  },
});
