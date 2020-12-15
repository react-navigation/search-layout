import React, { useState } from 'react';
import { View, Text, Platform, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import SearchLayout from 'react-navigation-addon-search-layout';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Result: { text: string };
};

type ResultScreenRouteProp = RouteProp<RootStackParamList, 'Result'>;

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello there!!!</Text>
    </View>
  );
}

function SearchScreen () {

  const [ searchText, setSearchText ] = useState('');
  const navigation = useNavigation();

  const _handleQueryChange = ( searchText: string ) => {
    setSearchText(searchText);
  };

  const _executeSearch = () => {
    alert('do search!');
  };

  return (
    <SearchLayout
      onChangeQuery={_handleQueryChange}
      onSubmit={_executeSearch}>
      {searchText ? (
        <RectButton
          style={{
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: '#eee',
            paddingVertical: 20,
            paddingHorizontal: 15,
          }}
          onPress={() =>
            navigation.navigate('Result', {
              text: searchText,
            })
          }>
          <Text style={{ fontSize: 14 }}>{searchText}!</Text>
        </RectButton>
      ) : null}
    </SearchLayout>
  );
}

function ResultScreen (props: ResultScreenRouteProp) {
  return (
    <View style={styles.container}>
      <Text>{props.params.text} result!</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: (props) => {
              const navigation = useNavigation();
              return (
                <BorderlessButton
                  onPress={() => navigation.navigate('Search')}
                  style={{ marginRight: 15 }}>
                  <Ionicons
                    name="md-search"
                    size={Platform.OS === 'ios' ? 22 : 25}
                    color={SearchLayout.DefaultTintColor}
                  />
                </BorderlessButton>
            )},
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animationEnabled:false
          }}
        />

        <Stack.Screen
          name="Result"
          component={ResultScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});