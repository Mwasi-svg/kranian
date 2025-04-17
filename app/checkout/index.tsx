import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { useCartStore } from '@/store/cart-store';
import Header from '@/components/Header';
import Button from '@/components/Button';
import CartItem from '@/components/CartItem';

interface CheckoutForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
}

export default function CheckoutScreen() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  
  const [form, setForm] = useState<CheckoutForm>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  });
  
  const [loading, setLoading] = useState(false);
  
  const updateForm = (key: keyof CheckoutForm, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };
  
  const handlePlaceOrder = () => {
    // Basic validation
    if (!form.fullName || !form.email || !form.phone || !form.address || 
        !form.city || !form.zipCode || !form.country) {
      Alert.alert('Missing Information', 'Please fill in all required fields.');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      clearCart();
      router.push('/checkout/success');
    }, 1500);
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Checkout" showBackButton />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          
          {items.map(item => (
            <CartItem
              key={item.product.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Information</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={form.fullName}
              onChangeText={(value) => updateForm('fullName', value)}
              placeholder="Enter your full name"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={form.email}
              onChangeText={(value) => updateForm('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone *</Text>
            <TextInput
              style={styles.input}
              value={form.phone}
              onChangeText={(value) => updateForm('phone', value)}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              value={form.address}
              onChangeText={(value) => updateForm('address', value)}
              placeholder="Enter your street address"
            />
          </View>
          
          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.formGroupHalf]}>
              <Text style={styles.label}>City *</Text>
              <TextInput
                style={styles.input}
                value={form.city}
                onChangeText={(value) => updateForm('city', value)}
                placeholder="City"
              />
            </View>
            
            <View style={[styles.formGroup, styles.formGroupHalf]}>
              <Text style={styles.label}>Zip Code *</Text>
              <TextInput
                style={styles.input}
                value={form.zipCode}
                onChangeText={(value) => updateForm('zipCode', value)}
                placeholder="Zip Code"
              />
            </View>
          </View>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Country *</Text>
            <TextInput
              style={styles.input}
              value={form.country}
              onChangeText={(value) => updateForm('country', value)}
              placeholder="Country"
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          
          <View style={styles.formGroup}>
            <Text style={styles.label}>Card Number *</Text>
            <TextInput
              style={styles.input}
              value={form.cardNumber}
              onChangeText={(value) => updateForm('cardNumber', value)}
              placeholder="1234 5678 9012 3456"
              keyboardType="number-pad"
            />
          </View>
          
          <View style={styles.formRow}>
            <View style={[styles.formGroup, styles.formGroupHalf]}>
              <Text style={styles.label}>Expiry Date *</Text>
              <TextInput
                style={styles.input}
                value={form.cardExpiry}
                onChangeText={(value) => updateForm('cardExpiry', value)}
                placeholder="MM/YY"
              />
            </View>
            
            <View style={[styles.formGroup, styles.formGroupHalf]}>
              <Text style={styles.label}>CVV *</Text>
              <TextInput
                style={styles.input}
                value={form.cardCvv}
                onChangeText={(value) => updateForm('cardCvv', value)}
                placeholder="123"
                keyboardType="number-pad"
                secureTextEntry
              />
            </View>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Place Order"
            onPress={handlePlaceOrder}
            fullWidth
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  section: {
    backgroundColor: Colors.white,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formGroupHalf: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.backgroundLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonContainer: {
    padding: 16,
    marginBottom: 24,
  },
});