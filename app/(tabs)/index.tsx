import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const DATA = [
  { id: '1', title: 'Discover New Places' },
  { id: '2', title: 'Adventure Awaits' },
  { id: '3', title: 'Hidden Gems' },
  { id: '4', title: 'Local Favorites' },
  { id: '5', title: 'Travel Tips' },
  { id: '6', title: 'City Life' },
  { id: '7', title: 'Nature Trails' },
  { id: '8', title: 'Top Destinations' },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const animatedValues = useRef(DATA.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(
      100,
      animatedValues.map(anim =>
        Animated.timing(anim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        })
      )
    ).start();
  }, []);

  return (
    <ScrollView>
    <LinearGradient colors={['#ff6a00', '#ee0979']} style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Welcome Home</Text>
        <Text style={styles.heroSubtitle}>Your adventure starts here</Text>
      </View>

      {/* Wrapped Cards Section */}
      <View style={styles.cardsContainer}>
        {DATA.map((item, index) => {
          const scale = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1],
          });
          const opacity = animatedValues[index];

          return (
            <Animated.View
              key={item.id}
              style={[styles.card, { transform: [{ scale }], opacity }]}
            >
              <TouchableOpacity onPress={() => navigation.navigate('SomeOtherScreen')}>
                <Text style={styles.cardText}>{item.title}</Text>
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>
    </LinearGradient>
    </ScrollView>
  );
}

const CARD_WIDTH = width / 2 - 30; // 2 cards per row with spacing

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 20,
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 2,
    flexDirection: 'row',
    flexWrap: 'wrap', // THIS MAKES IT WRAP
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    width: CARD_WIDTH,
    height: 180,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  cardText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});