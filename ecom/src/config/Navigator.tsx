import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Products from '../screens/Products';

export type StackNavigatorParams = {
  Products: undefined;
  ProductDetails: {id: number};
  //TODO: Cart Model
};

const Stack = createNativeStackNavigator<StackNavigatorParams>();

const Navigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1FE687',
        },
        headerTintColor: '#141414',
        // headerRight: () => <CartButton />,
      }}>
      <Stack.Screen
        name={'Products'}
        component={Products}
        options={{
          headerTitle: 'My E-commerce',
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigator;
