import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Category } from '@/mocks/categories';
import Colors from '@/constants/colors';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/shop/${category.id}`);
  };
  
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <ImageBackground 
        source={{ uri: category.image }} 
        style={styles.background}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.name}>{category.name}</Text>
          <Text style={styles.description}>{category.description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  background: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 12,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },
});

export default CategoryCard;