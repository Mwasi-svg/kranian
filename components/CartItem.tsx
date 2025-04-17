import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CartItem as CartItemType } from '@/store/cart-store';
import Colors from '@/constants/colors';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const { product, quantity } = item;
  
  const handleIncrease = () => {
    onUpdateQuantity(product.id, quantity + 1);
  };
  
  const handleDecrease = () => {
    if (quantity > 1) {
      onUpdateQuantity(product.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    onRemove(product.id);
  };
  
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{product.name}</Text>
          <TouchableOpacity onPress={handleRemove} hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}>
            <Trash2 size={18} color={Colors.error} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={[styles.quantityButton, quantity <= 1 && styles.disabledButton]} 
              onPress={handleDecrease}
              disabled={quantity <= 1}
            >
              <Minus size={16} color={quantity <= 1 ? Colors.textLight : Colors.text} />
            </TouchableOpacity>
            
            <Text style={styles.quantity}>{quantity}</Text>
            
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
              <Plus size={16} color={Colors.text} />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.totalPrice}>
            ${(product.price * quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 14,
    color: Colors.textLight,
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 6,
    overflow: 'hidden',
  },
  quantityButton: {
    padding: 6,
    backgroundColor: Colors.backgroundLight,
  },
  disabledButton: {
    opacity: 0.5,
  },
  quantity: {
    paddingHorizontal: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
});

export default CartItem;