import React, {useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import Products from '../screens/Products';
import ProductDetails from '../screens/ProductDetails';
import CartModal from '../screens/CartModal';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import useCartStore from '../state/cartStore';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';

export type StackNavigatorParams = {
  Products: undefined;
  ProductDetails: {id: number};
  CartModal: undefined;
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

export type ProductsPageProps = NativeStackScreenProps<
  StackNavigatorParams,
  'Products'
>;
export type ProductDetailsPageProps = NativeStackScreenProps<
  StackNavigatorParams,
  'ProductDetails'
>;
export type StackNavigation = NavigationProp<StackNavigatorParams>;

const CartButton = () => {
  const navigation = useNavigation<StackNavigation>();
  const {products} = useCartStore(state => ({
    products: state.products,
  }));
  const [count, setCount] = useState(0);

  useEffect(() => {
    const count = products.reduce(
      (prev, products) => prev + products.quantity,
      0,
    );
    setCount(count);
  }, [products]);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CartModal');
      }}>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{count}</Text>
      </View>
      <FontAwesomeIcon icon={faCartPlus} color={'#000'} size={24} />
    </TouchableOpacity>
  );
};

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1FE687',
        },
        headerTintColor: '#141414',
        headerRight: () => <CartButton />,
      }}>
      <Stack.Screen
        name={'Products'}
        component={Products}
        options={{
          headerTitle: 'My E-commerce',
        }}
      />
      <Stack.Screen
        name={'ProductDetails'}
        component={ProductDetails}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name={'CartModal'}
        component={CartModal}
        options={{headerShown: false, presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  countContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: -5,
    right: -10,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Navigator;
