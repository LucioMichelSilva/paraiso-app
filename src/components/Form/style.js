import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    formContext: {
        backgroundColor:"#ffffff",
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        //paddingTop: 30,
        width:"100%",
        height:"100%",
        bottom:0,
        alignItems:"center",
        marginTop:10,
        borderWidth: 1, 
        borderColor: 'green', 
        padding: 10,    
      },
      form:{
        width:"100%",
        height:"auto",
        marginTop:1,
        padding:5,
      },
      
      textLabel:{
        color:"#1C1C1C",
        fontSize:18,
        paddingLeft: 0,
        marginTop:10,
        fontWeight:"bold",
        fontFamily:"Roboto_700Bold",
      },
      errorMessage:{
        fontSize: 12,
        color: "red",
        fontWeight: "bold",
        paddingLeft: 4,
      },
      message:{
          fontSize: 12,
          color: "green",
          fontWeight: "bold",
          paddingLeft: 4,
      },
      ButtonEnviar:{
          borderRadius:50,
          alignItems: "center",
          justifyContent:"center",
          width: "80%",
          backgroundColor:"#006400",
          paddingTop: 15,
          paddingBottom:14,
          marginLeft:30,
         // marginTop:30,
          margin:10,
          fontFamily:"Roboto_700Bold",
      },
      buttonCamera:{
        borderRadius:50,
        alignItems: "center",
        justifyContent:"center",
        width: "80%",
        paddingTop: 15,
        paddingBottom:14,
        marginLeft:30,
        marginTop:30,
        margin:10,
        marginBottom:5,
      },
      messagemsub:{
        color:"#000000",
        fontSize:15,
        textAlign:"center",
        fontWeight:"bold",
        fontFamily:"Roboto_700Bold",
        color:'green',
        marginTop:10
      },
      txtButton:{
        fontSize:20,
        color:"#ffffff",
        fontFamily:"Roboto_700Bold"
      },
      //select
      selectStyle: {
        borderRadius: 15,
        padding: 10,
        marginBottom: 1,
       width:'100%'
      },
      modalSelector: {
         backgroundColor: '#DCDCDC',
         borderRadius: 15,
         fontWeight: "bold",
         width:'100%'
      },
      selectTextStyle: {
       fontSize:16,
       fontWeight: "bold",
      },
      optionTextStyle: {
        fontSize: 18,
        color: 'green',
        fontWeight: "bold", 
      },
      optionContainer: {
          backgroundColor: 'lightgray',
          borderRadius: 10,
          padding: 10,
      },
      cancelTextStyle: {
        color: '#B22222', 
        fontSize: 18,
        fontWeight: "bold",
      },
      cancelContainerStyle:{
        backgroundColor: 'lightgray',
        borderRadius: 10,
        //padding: 10,
      },
      initValueTextStyle:{
        color:'green',
        fontSize:18,
        fontFamily:'Roboto_700Bold'
      },
      //select
    
      //modal
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        width:'75%'
      },
      modalTitle: {
        fontSize: 23,
        marginBottom: 10,
        color:'green',
        fontWeight:'bold'
      },
      modalText: {
        marginBottom: 13,
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        
      },
      textAtencao:{
       color:'green',
       fontWeight:'bold',
       fontSize:16
      },
      textAviso:{
        marginBottom:25
      },
      but:{
        marginRight: 10, 
        backgroundColor:'green',
        padding:10,
        width:'45%',
        borderRadius:10
      },
      but2:{
        backgroundColor:'#B22222',
        padding:10,
        width:'45%',
        borderRadius:10
      },
      textmodal:{
        textAlign:'center',
        color:'white',
        fontWeight:'bold'
      },
      textmodal2:{
        textAlign:'center',
        color:'white',
        fontWeight:'bold'
      },
      //modal
      
      //style do campo text do serviço e empresa escolhidas 
      container: {
        flex: 1,
        justifyContent: 'center',
      },
      conttainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      textWrapper: {
        flexDirection: 'row', // Define o layout como linha (lado a lado)
      },
      text: {
        marginRight: 5, 
        color:'green',
        fontFamily:"Roboto_700Bold",
        fontSize:16
      },
      textSelecao:{
        color:'black',
        fontFamily:"Roboto_700Bold",
        fontSize:16,
      },
    //style do campo text do serviço e empresa escolhidas 
    viewImg: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
})

export default styles