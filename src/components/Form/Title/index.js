import React from "react";
import {  StyleSheet,View,Text } from "react-native";
//import styles from "./style";
import {FontAwesome} from "@expo/vector-icons";
import {useFonts,Roboto_100Thin, Roboto_700Bold,  } from "@expo-google-fonts/roboto";

export default function Title({navigation}){
    
    const [fonteLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_700Bold,
    });

    if(!fonteLoaded){
        return null;
    }
    
    return(
        <View style={styles.BoxTitle}>
            <FontAwesome style={styles.icon} name="leaf" size={50} color={'green'}/>

           <Text style={styles.textTitle}>PARAÍSO JARDINAGEM</Text>
           <Text style={styles.subTitle}>Empressa</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    BoxTitle: {
        alignItems:"center",
        justifyContent: "center",
        paddingTop:7,
    },
    textTitle:{
        color:"#006400",
        fontSize:20,
        fontWeight:"bold",
        fontFamily:"Roboto_700Bold",
        marginTop:15
    },
    subTitle:{
        color:"#006400",
        fontSize:14,
        fontWeight:"bold",
        fontFamily:"Roboto_100Thin",
    },
    icon:{
        alignItems:"center",
        justifyContent: "center",
    
    }
    });