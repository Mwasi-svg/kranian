import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { useCartStore } from '@/store/cart-store';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import { ShoppingCart } from 'lucide-react-native';

export default function CartScreen() {
  const router = useRouter();
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    clearCart 
  } = useCartStore();
  
  const handleCheckout = () => {
    if (items.length === 0) {
      Alert.alert('Empty Cart', 'Your cart is empty. Add some products before checkout.');
      return;
    }
    
    router.push('/checkout');
  };
  
  const handleClearCart = () => {
    if (items.length === 0) return;
    
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearCart }
      ]
    );
  };
  
  const handleRemoveItem = (productId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeItem(productId) }
      ]
    );
  };
  
  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Cart</Text>
        </View>
        
        <EmptyState
          icon={<ShoppingCart size={48} color={Colors.textLight} />}
          title="Your cart is empty"
          message="Add some products to your cart to see them here."
          buttonTitle="Start Shopping"
          onButtonPress={() => router.push('/shop')}
        />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>
        <Button
          title="Clear Cart"
          onPress={handleClearCart}
          variant="outline"
          size="small"
        />
      </View>
      
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onUpdateQuantity={updateQuantity}
            onRemove={handleRemoveItem}
          />
        )}
        keyExtractor={item => item.product.id}
        contentContainerStyle={styles.cartList}
      />
      
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
        </View>
        
        <Button
          title="Proceed to Checkout"
          onPress={handleCheckout}
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  cartList: {
    padding: 16,
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.primary,
  },
});