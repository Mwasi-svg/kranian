import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/colors';
import { getProductsByCategory } from '@/mocks/products';
import categories from '@/mocks/categories';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import EmptyState from '@/components/EmptyState';
import { PackageOpen } from 'lucide-react-native';

export default function CategoryScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  
  const products = getProductsByCategory(category);
  const categoryInfo = categories.find(cat => cat.id === category);
  
  if (!categoryInfo) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <Header title="Category" showBackButton />
        <EmptyState
          icon={<PackageOpen size={48} color={Colors.textLight} />}
          title="Category Not Found"
          message="The category you're looking for doesn't exist."
          buttonTitle="Go Back to Shop"
          onButtonPress={() => {}}
        />
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title={categoryInfo.name} showBackButton />
      
      <View style={styles.content}>
        <Text style={styles.description}>{categoryInfo.description}</Text>
        
        {products.length > 0 ? (
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        ) : (
          <EmptyState
            icon={<PackageOpen size={48} color={Colors.textLight} />}
            title="No Products Available"
            message="There are currently no products in this category."
            buttonTitle="Go Back to Shop"
            onButtonPress={() => {}}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundLight,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    color: Colors.textLight,
    marginVertical: 16,
  },
  productsList: {
    paddingBottom: 24,
  },
  productRow: {
    justifyContent: 'space-between',
  },
});