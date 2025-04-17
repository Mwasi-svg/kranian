import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Easing
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import Button from '@/components/Button';
import { CheckCircle } from 'lucide-react-native';

export default function OrderSuccessScreen() {
  const router = useRouter();
  const scaleAnim = new Animated.Value(0);
  const opacityAnim = new Animated.Value(0);
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.elastic(1),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);
  
  const handleContinueShopping = () => {
    router.push('/');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <CheckCircle size={80} color={Colors.primary} />
        </View>
        
        <Text style={styles.title}>Order Placed Successfully!</Text>
        
        <Text style={styles.message}>
          Thank you for your order. We've received your order and will begin processing it right away.
          You will receive a confirmation email shortly.
        </Text>
        
        <View style={styles.orderInfo}>
          <Text style={styles.orderInfoText}>
            Your order will be delivered within 2-3 business days.
          </Text>
        </View>
        
        <Button
          title="Continue Shopping"
          onPress={handleContinueShopping}
          style={styles.button}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    width: '90%',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  orderInfo: {
    backgroundColor: Colors.primaryLight,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    width: '100%',
  },
  orderInfoText: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
  },
  button: {
    minWidth: 200,
  },
});