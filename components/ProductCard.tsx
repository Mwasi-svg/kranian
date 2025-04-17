import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '@/mocks/products';
import Colors from '@/constants/colors';
import { ShoppingCart } from 'lucide-react-native';
import { useCartStore } from '@/store/cart-store';

interface ProductCardProps {
  product: Product;
  horizontal?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, horizontal = false }) => {
  const router = useRouter();
  const addItem = useCartStore(state => state.addItem);
  
  const handlePress = () => {
    router.push(`/shop/${product.category}/${product.id}`);
  };
  
  const handleAddToCart = () => {
    addItem(product, 1);
  };
  
  if (horizontal) {
    return (
      <TouchableOpacity 
        style={styles.horizontalContainer} 
        onPress={handlePress}
        activeOpacity={0.8}
      >
        <Image source={{ uri: product.image }} style={styles.horizontalImage} />
        <View style={styles.horizontalContent}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.horizontalFooter}>
            {!product.inStock && <Text style={styles.outOfStock}>Out of Stock</Text>}
            <TouchableOpacity 
              style={[styles.addButton, !product.inStock && styles.disabledButton]} 
              onPress={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart size={16} color={Colors.white} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.footer}>
          {!product.inStock && <Text style={styles.outOfStock}>Out of Stock</Text>}
          <TouchableOpacity 
            style={[styles.addButton, !product.inStock && styles.disabledButton]} 
            onPress={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart size={16} color={Colors.white} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: '48%',
    marginBottom: 16,
  },
  horizontalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    marginBottom: 16,
    height: 120,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  horizontalImage: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  horizontalContent: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  horizontalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  outOfStock: {
    fontSize: 12,
    color: Colors.error,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: Colors.textLight,
    opacity: 0.5,
  },
});

export default ProductCard;