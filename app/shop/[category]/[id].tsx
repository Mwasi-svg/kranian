import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { getProductById } from '@/mocks/products';
import Header from '@/components/Header';
import Button from '@/components/Button';
import { useCartStore } from '@/store/cart-store';
import { Minus, Plus, ShoppingCart, Truck, Globe, AlertTriangle } from 'lucide-react-native';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const product = getProductById(id);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  
  if (!product) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Product Not Found" showBackButton />
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>The product you're looking for doesn't exist.</Text>
          <Button 
            title="Go Back to Shop" 
            onPress={() => router.push('/shop')}
            style={styles.notFoundButton}
          />
        </View>
      </SafeAreaView>
    );
  }
  
  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };
  
  const handleAddToCart = () => {
    if (!product.inStock) {
      Alert.alert('Out of Stock', 'This product is currently unavailable.');
      return;
    }
    
    addItem(product, quantity);
    Alert.alert(
      'Added to Cart', 
      `${product.name} has been added to your cart.`,
      [
        { text: 'Continue Shopping', style: 'cancel' },
        { text: 'View Cart', onPress: () => router.push('/cart') }
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title={product.name} showBackButton />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.image }} style={styles.image} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          
          <View style={styles.infoContainer}>
            {product.isExportable ? (
              <View style={styles.infoItem}>
                <Globe size={16} color={Colors.primary} />
                <Text style={styles.infoText}>Available for export</Text>
              </View>
            ) : (
              <View style={styles.infoItem}>
                <Truck size={16} color={Colors.primary} />
                <Text style={styles.infoText}>Local delivery only</Text>
              </View>
            )}
            
            {!product.inStock && (
              <View style={styles.infoItem}>
                <AlertTriangle size={16} color={Colors.error} />
                <Text style={[styles.infoText, styles.outOfStockText]}>Out of stock</Text>
              </View>
            )}
          </View>
          
          <Text style={styles.description}>{product.description}</Text>
          
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity:</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity 
                style={[styles.quantityButton, quantity <= 1 && styles.disabledButton]} 
                onPress={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                <Minus size={16} color={quantity <= 1 ? Colors.textLight : Colors.text} />
              </TouchableOpacity>
              
              <Text style={styles.quantity}>{quantity}</Text>
              
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={() => handleQuantityChange(quantity + 1)}
              >
                <Plus size={16} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>
          
          <Button 
            title={product.inStock ? "Add to Cart" : "Out of Stock"}
            onPress={handleAddToCart}
            disabled={!product.inStock}
            fullWidth
            style={styles.addButton}
            icon={<ShoppingCart size={18} color={Colors.white} />}
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
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
  },
  infoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 6,
  },
  outOfStockText: {
    color: Colors.error,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.textLight,
    marginBottom: 24,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 10,
    backgroundColor: Colors.backgroundLight,
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantity: {
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    marginBottom: 16,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  notFoundText: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: 16,
    textAlign: 'center',
  },
  notFoundButton: {
    minWidth: 200,
  },
});