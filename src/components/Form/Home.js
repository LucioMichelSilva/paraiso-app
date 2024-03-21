import React, { useState, useEffect } from 'react';
import {Text, View,TouchableOpacity, Vibration, Pressable, Keyboard,Alert,ActivityIndicator,Image} from 'react-native';
import styles from './style';
import {FontAwesome} from "@expo/vector-icons";
import {useFonts, Roboto_100Thin,Roboto_700Bold} from '@expo-google-fonts/roboto';
import ModalSelector from 'react-native-modal-selector';
import { Modal } from 'react-native';
import axios from 'axios';

 function HomeScreen({navigation,route}) {

  const CustomAlert = ({ visible, onClose, onConfirm }) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Paraiso Jardinagem</Text>
            <Text style={styles.modalText}>Dados comprovados com sucesso!</Text>
            <Text style={styles.textAtencao}>Confirma:</Text>
            <Text style={styles.textAviso}>Empresa escolhida: {empresa} Serviço escolhido: {servico}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.but} onPress={onConfirm}>
                <Text style={styles.textmodal}>Confirma</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.but2} onPress={() => { onClose(); clearSelection(); }} >
                <Text style={styles.textmodal2}>Redefinir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

    const[empresa, setEmpresa] = useState(null);
    const[servico, setServico] = useState(null);

    const [servicos, setServices] = useState([]);
    const [empresas, setCompanies] = useState([]);

    const[errorMessage, setErroMessage] = useState(null);
    const[message,setmassage] = useState(null);
    const[txtbutton, setTextButton] = useState('Enviar');  
    const[errorMessage2, setErroMessage2] = useState(null);
    const[message2,setmassage2] = useState(null);
    const[loading, setLoading] = useState(false);
    const[isTouchableDisabled, setIsTouchableDisabled] = useState(false);
    const[modalVisible, setModalVisible] = useState(false);

    //const capturedPhotoURI = route.params?.capturedPhotoURI;

    /*<View style={styles.viewImg}>
    {capturedPhotoURI && (
        <Image source={{ uri: capturedPhotoURI }} style={styles.image} />
      )}
    </View>*/


    useEffect(() => {
      fetchServices(); // Fetch data when component mounts
    }, []);
    const fetchServices = async () => {
      try {

        const response = await axios.get('http://localhost:3001/services');

        console.log(response);

        setServices(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };
    
  
    const [fonteLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_700Bold,
    });

    if(!fonteLoaded){
        return null;
    }

    /*
    const empresas =[
      { key: 0, label: 'Empresa 01', value: 'empresa 01' },
      { key: 1, label: 'Empresa 02', value: 'empresa 02' },
      { key: 2, label: 'Empresa 03', value: 'empresa 03' },
      
    ];

    const servicos =[

      {key:0,label:'serviços 01', value:'serviços 01'},
      {key:1,label:'serviços 02', value:'serviços 02'},
      {key:2,label:'serviços 03', value:'serviços 03'},
    
    ];
   */

    async function verificaCampos() {
      try {
          if (empresa == null && servico == null) {
              Vibration.vibrate();
              setErroMessage("Empresa Obrigatória*");
              setErroMessage2("Serviço Obrigatório*");
          } else if (empresa != null && servico != null) {
              setErroMessage("");
              setErroMessage2("");
              setmassage("Empresa comprovada");
              setmassage2("Serviço comprovado");
  
              setLoading(true);
              await new Promise(resolve => setTimeout(resolve, 2500)); 
              setLoading(false);
              toggleModal();
              //setIsTouchableDisabled(false);
          } else if (empresa != null && servico == null) {
              setmassage("Empresa comprovada");
              setErroMessage("");
              Vibration.vibrate();
              setErroMessage2("Serviço Obrigatório*");
          } else if (servico != null && empresa == null) {
              setmassage2("Serviço comprovado");
              setErroMessage2("");
              Vibration.vibrate();
              setErroMessage("Empresa comprovada*");
          }
      } catch (error) {
          console.error('Erro ao verificar campos:', error);
      }
  }
    const clearSelection = () => {
      setEmpresa(null);
      setServico(null);
      setmassage("");
      setmassage2("");
      setIsTouchableDisabled(false);
    };

    const handleConfirm = () => {
      console.log('Dados confirmados');
      toggleModal();
    };

    return (                   
    
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>         
          <View style={styles.form}>
          
          <Text style={styles.textLabel}>EMPRESAS</Text>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <ModalSelector
            data={empresas}
            initValue="Selecione a Empresa"
            onChange={(option) => setEmpresa(option.label)}
            id='cboEmpresas'
            style={styles.modalSelector}
            selectTextStyle={styles.selectTextStyle}
            selectStyle={styles.selectStyle}
            optionTextStyle={styles.optionTextStyle}
            optionContainerStyle={styles.optionContainer}
            cancelTextStyle={styles.cancelTextStyle}
            cancelContainerStyle={styles.cancelContainerStyle}
            initValueTextStyle={styles.initValueTextStyle}
          />
          {empresa && (
            <View style={styles.conttainer}>
              <View style={styles.textWrapper}>
                <Text style={styles.text}>Empresa Escolhida: </Text>      
                <Text style={styles.textSelecao}>{empresa}</Text>
               </View>
             </View>
           )}
                
           <Text style={styles.textLabel}>SERVIÇOS</Text>
           <Text style={styles.message}>{message2}</Text>
           <Text style={styles.errorMessage}>{errorMessage2}</Text>
           <ModalSelector
            data={servicos}
            initValue ="Selecione o Serviço"
            onChange={(option) => setServico(option.name)}
            id='cboServicos'
            style={styles.modalSelector}
            selectTextStyle={styles.selectTextStyle}
            selectStyle={styles.selectStyle}
            optionTextStyle={styles.optionTextStyle}
            optionContainerStyle={styles.optionContainer}
            cancelTextStyle={styles.cancelTextStyle}
            cancelContainerStyle={styles.cancelContainerStyle}
            initValueTextStyle={styles.initValueTextStyle}
          />
          {servico && (
              <View style={styles.conttainer}>
                <View style={styles.textWrapper}>
                 <Text style={styles.text}>Serviço Escolhido: </Text>      
                  <Text style={styles.textSelecao}>{servico}</Text>
                 </View>
               </View>
           )}


           <View>
            <TouchableOpacity 
             name="botao"
             disabled={isTouchableDisabled}
             onPress={() => navigation.navigate('Camera')}
             style={[
              styles.buttonCamera,
              { backgroundColor: isTouchableDisabled ? '#8FBC8F' : '#006400' }]}>
              <FontAwesome name='camera' size={23} color="#fff"/>
            </TouchableOpacity>
           </View>

           <View>
            <TouchableOpacity
             value={setTextButton} 
             style={styles.ButtonEnviar} 
             disabled={loading}
             onPress={() => {verificaCampos()}}>
            {loading ? ( <ActivityIndicator color={'#FFF'} /> ) : ( <Text style={styles.txtButton}>{txtbutton}  <FontAwesome name='paper-plane' size={20}/></Text> )}
           </TouchableOpacity>
            
            <Text style={styles.messagemsub}>preencha os dados de serviço</Text>
           </View>
         
          </View>
          <CustomAlert visible={modalVisible} onClose={toggleModal} onConfirm={handleConfirm} />
      </Pressable>
      
    );
}
export default HomeScreen;


