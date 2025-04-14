import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaInicial() {
  const navigation = useNavigation();
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      navigation.navigate('TelaLogin');
    });
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.time}>8:00</Text>
        <View style={styles.rightIcons}>
          <View style={styles.signal}>
            <Image source={require('./assets/sinal.png')} style={styles.imgIcon}/>
          </View>

          <View style={styles.wifiSignal}>
            <Ionicons name="wifi" size={20} color="white" />
          </View>
          <View style={styles.battery}>
            <Ionicons name="battery-full" size={20} color="white" />
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.content}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <Animated.View style={[styles.circle, animatedStyle]}>
          <Text style={styles.text}>Smart House</Text>
        </Animated.View>
      </TouchableOpacity>
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

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#DC0072',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },

  text: {
    fontSize: 24,
    fontWeight: 'regular',
    color: '#f7f7f7',
  },
});