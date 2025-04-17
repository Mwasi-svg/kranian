import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  View
} from 'react-native';
import Colors from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
  icon
}) => {
  const getButtonStyle = () => {
    let buttonStyle: StyleProp<ViewStyle> = [styles.button];
    
    // Variant styles
    if (variant === 'primary') {
      buttonStyle = [...buttonStyle, styles.primaryButton];
    } else if (variant === 'secondary') {
      buttonStyle = [...buttonStyle, styles.secondaryButton];
    } else if (variant === 'outline') {
      buttonStyle = [...buttonStyle, styles.outlineButton];
    }
    
    // Size styles
    if (size === 'small') {
      buttonStyle = [...buttonStyle, styles.smallButton];
    } else if (size === 'large') {
      buttonStyle = [...buttonStyle, styles.largeButton];
    }
    
    // Full width
    if (fullWidth) {
      buttonStyle = [...buttonStyle, styles.fullWidth];
    }
    
    // Disabled state
    if (disabled) {
      buttonStyle = [...buttonStyle, styles.disabledButton];
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleArray: StyleProp<TextStyle> = [styles.buttonText];
    
    if (variant === 'primary') {
      textStyleArray = [...textStyleArray, styles.primaryText];
    } else if (variant === 'secondary') {
      textStyleArray = [...textStyleArray, styles.secondaryText];
    } else if (variant === 'outline') {
      textStyleArray = [...textStyleArray, styles.outlineText];
    }
    
    if (size === 'small') {
      textStyleArray = [...textStyleArray, styles.smallText];
    } else if (size === 'large') {
      textStyleArray = [...textStyleArray, styles.largeText];
    }
    
    if (disabled) {
      textStyleArray = [...textStyleArray, styles.disabledText];
    }
    
    return textStyleArray;
  };
  
  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? Colors.primary : Colors.white} 
          size="small" 
        />
      ) : (
        <View style={styles.buttonContent}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  largeButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  fullWidth: {
    width: '100%',
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  buttonText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.text,
  },
  outlineText: {
    color: Colors.primary,
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    opacity: 0.8,
  },
});

export default Button;