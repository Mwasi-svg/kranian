import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { useUserStore } from '@/store/user-store';
import Button from '@/components/Button';
import { 
  User, 
  Settings, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react-native';

export default function AccountScreen() {
  const { user, isLoggedIn, logout } = useUserStore();
  
  const handleLogin = () => {
    // For demo purposes, we'll just create a mock user
    useUserStore.getState().login({
      email: "user@example.com",
      name: "Demo User",
      addresses: [],
      defaultAddressIndex: -1
    });
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout }
      ]
    );
  };
  
  const menuItems = [
    {
      icon: <ShoppingBag size={20} color={Colors.text} />,
      title: 'My Orders',
      onPress: () => Alert.alert('Orders', 'View your order history')
    },
    {
      icon: <Heart size={20} color={Colors.text} />,
      title: 'Wishlist',
      onPress: () => Alert.alert('Wishlist', 'View your saved items')
    },
    {
      icon: <MapPin size={20} color={Colors.text} />,
      title: 'Addresses',
      onPress: () => Alert.alert('Addresses', 'Manage your delivery addresses')
    },
    {
      icon: <CreditCard size={20} color={Colors.text} />,
      title: 'Payment Methods',
      onPress: () => Alert.alert('Payment', 'Manage your payment methods')
    },
    {
      icon: <Settings size={20} color={Colors.text} />,
      title: 'Settings',
      onPress: () => Alert.alert('Settings', 'Adjust your app settings')
    },
    {
      icon: <HelpCircle size={20} color={Colors.text} />,
      title: 'Help & Support',
      onPress: () => Alert.alert('Help', 'Get assistance with your orders')
    }
  ];
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Account</Text>
        </View>
        
        <View style={styles.profileSection}>
          <View style={styles.profileIcon}>
            <User size={40} color={Colors.primary} />
          </View>
          
          {isLoggedIn ? (
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.name}</Text>
              <Text style={styles.profileEmail}>{user?.email}</Text>
              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Welcome, Guest</Text>
              <Text style={styles.profileEmail}>Sign in to access your account</Text>
              <Button 
                title="Sign In" 
                onPress={handleLogin} 
                style={styles.signInButton}
              />
            </View>
          )}
        </View>
        
        {isLoggedIn && (
          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.menuItem}
                onPress={item.onPress}
              >
                <View style={styles.menuItemLeft}>
                  {item.icon}
                  <Text style={styles.menuItemText}>{item.title}</Text>
                </View>
                <ChevronRight size={20} color={Colors.textLight} />
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity 
              style={[styles.menuItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <View style={styles.menuItemLeft}>
                <LogOut size={20} color={Colors.error} />
                <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>About Kranian Farms</Text>
          <Text style={styles.aboutText}>
            Kranian Farms is a family-owned business dedicated to providing the freshest flowers, 
            herbs, and vegetables to our local community and international markets. We take pride 
            in our sustainable farming practices and commitment to quality.
          </Text>
          
          <View style={styles.contactInfo}>
            <Text style={styles.contactTitle}>Contact Us</Text>
            <Text style={styles.contactText}>Email: info@kranianfarms.com</Text>
            <Text style={styles.contactText}>Phone: +1 (555) 123-4567</Text>
            <Text style={styles.contactText}>Address: 123 Farm Road, Krania Valley</Text>
          </View>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
  },
  profileSection: {
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  profileIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 8,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  signInButton: {
    alignSelf: 'flex-start',
  },
  menuSection: {
    backgroundColor: Colors.white,
    marginTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: Colors.error,
  },
  aboutSection: {
    backgroundColor: Colors.white,
    marginTop: 16,
    padding: 16,
    marginBottom: 24,
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
    marginBottom: 16,
  },
  contactInfo: {
    marginTop: 8,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
});