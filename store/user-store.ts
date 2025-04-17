import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface User {
  email: string;
  name: string;
  addresses: Address[];
  defaultAddressIndex: number;
}

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addAddress: (address: Address) => void;
  updateAddress: (index: number, address: Address) => void;
  removeAddress: (index: number) => void;
  setDefaultAddress: (index: number) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      
      login: (user) => {
        set({ user, isLoggedIn: true });
      },
      
      logout: () => {
        set({ user: null, isLoggedIn: false });
      },
      
      updateUser: (userData) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null
        }));
      },
      
      addAddress: (address) => {
        set((state) => {
          if (!state.user) return state;
          
          const addresses = [...state.user.addresses, address];
          return {
            user: {
              ...state.user,
              addresses,
              defaultAddressIndex: state.user.addresses.length === 0 ? 0 : state.user.defaultAddressIndex
            }
          };
        });
      },
      
      updateAddress: (index, address) => {
        set((state) => {
          if (!state.user) return state;
          
          const addresses = [...state.user.addresses];
          addresses[index] = address;
          
          return {
            user: {
              ...state.user,
              addresses
            }
          };
        });
      },
      
      removeAddress: (index) => {
        set((state) => {
          if (!state.user) return state;
          
          const addresses = state.user.addresses.filter((_, i) => i !== index);
          let defaultAddressIndex = state.user.defaultAddressIndex;
          
          if (index === defaultAddressIndex) {
            defaultAddressIndex = addresses.length > 0 ? 0 : -1;
          } else if (index < defaultAddressIndex) {
            defaultAddressIndex--;
          }
          
          return {
            user: {
              ...state.user,
              addresses,
              defaultAddressIndex
            }
          };
        });
      },
      
      setDefaultAddress: (index) => {
        set((state) => {
          if (!state.user) return state;
          
          return {
            user: {
              ...state.user,
              defaultAddressIndex: index
            }
          };
        });
      }
    }),
    {
      name: 'kranian-farms-user',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);