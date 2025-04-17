import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { getFeaturedProducts } from '@/mocks/products';
import categories from '@/mocks/categories';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { Truck, Flower, Award, Globe } from 'lucide-react-native';

export default function HomeScreen() {
  const router = useRouter();
  const featuredProducts = getFeaturedProducts();
  
  const navigateToCategory = (categoryId: string) => {
    router.push(`/shop/${categoryId}`);
  };
  
  const navigateToAllProducts = () => {
    router.push('/shop');
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <Text style={styles.brandName}>Kranian Farms</Text>
          </View>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1611145434336-2cca8fcf739b?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' }} 
            style={styles.logo} 
          />
        </View>
        
        {/* Hero Banner */}
        <View style={styles.heroBanner}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1523810192022-5a0fb9aa7ff8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }} 
            style={styles.heroImage} 
          />
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Fresh Flowers & Produce</Text>
            <Text style={styles.heroSubtitle}>From our farm to your doorstep</Text>
            <TouchableOpacity 
              style={styles.heroButton}
              onPress={navigateToAllProducts}
            >
              <Text style={styles.heroButtonText}>Shop Now</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Truck size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Local Delivery</Text>
          </View>
          <View style={styles.featureItem}>
            <Flower size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Fresh Products</Text>
          </View>
          <View style={styles.featureItem}>
            <Award size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Premium Quality</Text>
          </View>
          <View style={styles.featureItem}>
            <Globe size={24} color={Colors.primary} />
            <Text style={styles.featureText}>Global Export</Text>
          </View>
        </View>
        
        {/* Categories */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <TouchableOpacity onPress={navigateToAllProducts}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </View>
        
        {/* Featured Products */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity onPress={navigateToAllProducts}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.productsGrid}>
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </View>
        </View>
        
        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About Kranian Farms</Text>
          <Text style={styles.aboutText}>
            We are a family-owned farm dedicated to growing the finest flowers, herbs, and vegetables. 
            Our commitment to sustainable farming practices ensures that you receive the freshest, 
            highest-quality products while we take care of our planet.
          </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.textLight,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  heroBanner: {
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroContent: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 16,
    height: '100%',
    justifyContent: 'flex-end',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
    flexWrap: 'wrap',
  },
  featureItem: {
    alignItems: 'center',
    width: '25%',
  },
  featureText: {
    fontSize: 12,
    color: Colors.text,
    marginTop: 8,
    textAlign: 'center',
  },
  sectionContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
  },
  seeAllText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  aboutSection: {
    backgroundColor: Colors.white,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.textLight,
  },
});