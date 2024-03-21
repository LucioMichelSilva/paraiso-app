import React from 'react';
import { StyleSheet,  View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Title from './src/components/Form/Title/index'
import HomeScreen from './src/components/Form/Home';
import DetailsScreen from './src/components/Form/screens/Details';
import {useFonts, Roboto_100Thin,Roboto_700Bold} from '@expo-google-fonts/roboto';

const Stack = createStackNavigator();

export default function App() {
      const [fonteLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_700Bold,
    });

    if(!fonteLoaded){
        return null;
    }
  return (
    
    <View style={styles.container}>
      <Title />
       <View style={styles.menu}>
          <NavigationContainer >
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Menu" component={HomeScreen}
              options={{
               title:"Central De Serviço",
               headerTitleAlign:'center',
               headerStyle:{
                height:40,
                backgroundColor:"#006400"
               },
               headerTitleStyle:{
                fontSize:17,
                fontFamily: 'Roboto_700Bold',
                color:"#ffffff"
               },
              }} />
              <Stack.Screen name="Camera" component={DetailsScreen} 
                 options={{
                  title:"Camera",
                  headerTitleAlign:'center',
                  headerStyle:{
                    height:40,
                  },
                  headerTitleStyle:{
                   fontSize:17,
                   fontFamily: 'Roboto_700Bold',
                  },
                 }}/>
            </Stack.Navigator>
          </NavigationContainer>
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#e0e5e5',
    paddingTop:60,
  },
  menu:{
    width:"100%",
    height:"100%",
    marginTop:10,   
  }, 
  titulo:{
    alignItems:"center",
    justifyContent: "center",
  }
});
