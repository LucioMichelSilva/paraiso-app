import React, { useState, useEffect, useRef} from 'react';
import styles from '../screens/style';
import {Text, View, SafeAreaView, TouchableOpacity, Modal, Image} from 'react-native';
import { Camera } from 'expo-camera';
import {FontAwesome} from "@expo/vector-icons";


function DetailsScreen({navigation}) {

const camRef = useRef(null)
const [type, setType] = useState(Camera.Constants.Type.back)
const [hasPerission, setHasPermission] = useState(null)
const [capturedPhoto, setCapturedPhoto] = useState(null)
const [open, setOpen] = useState(false)
const [camerabutton, setCameraButton] = useState(false);
const [imageBase64, setImageBase64] = useState(null);


useEffect(() =>{
  (async () =>{
    const {status} = await Camera.requestCameraPermissionsAsync()
    setHasPermission(status === "granted");
  })();
}, [])

if (hasPerission === null){
  return <View/>
}

if (hasPerission  === false){
  return <Text>Acesso negado </Text>
}

async function takePicture() {
  if (!camRef.current) {
    console.error('Referência à câmera não encontrada.');
    return;
  }

  try {
    const data = await camRef.current.takePictureAsync();
    setCapturedPhoto(data.uri);
    setOpen(true);
   // navigation.navigate('Home', { capturedPhotoURI: data.uri });
  } catch (error) {
    console.error('Erro ao capturar foto:', error);
  }
}

const convertImageToBase64 = async () =>{
  try {
    const imagePath = capturedPhoto;
    const imageArrayBuffer = await RNFS.readFile(imagePath, 'base64');
    const base64 = `data:image/jpeg;base64,${imageArrayBuffer}`;
    setImageBase64(base64);
    
    console.log("Convertido para base64 com sucesso");
  } catch (error) {
    console.error('Erro ao converter imagem para base64:', error);
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <Camera type={type} style = {styles.Camera} ref={camRef}>
        <View style={styles.contentButtons}>
          
          <TouchableOpacity style={styles.ButtonFlip}
           onPress={() =>{setType (type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back)}}>
              <FontAwesome name='exchange' size={23} color="green"/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonCamera} onPress={() => {takePicture()}}>
              <FontAwesome name='camera' size={23} color="green"/>
          </TouchableOpacity>

          <View>
            <TouchableOpacity title="volta" style={styles.button} onPress={() => navigation.navigate('Home')}></TouchableOpacity>
           </View>
        </View>
        
      </Camera>
     {capturedPhoto &&(
        <Modal animationType='slide' transparent={true}  visible={open}>

          <View style={styles.contentModal}>

          <TouchableOpacity style={styles.closeButton} onPress={() => {setOpen(false)}}>
            <FontAwesome name='close' size={50} color="red"></FontAwesome>
          </TouchableOpacity> 

          <TouchableOpacity style={styles.update} onPress={() => {convertImageToBase64()}}>
            <FontAwesome name='download' size={40} color="green"/>
          </TouchableOpacity>   
  
            <Image style={styles.imgPhoto} source={{uri: capturedPhoto}}/>
          </View>

        </Modal>
        )}
    </SafeAreaView>
  );
}
export default DetailsScreen;



