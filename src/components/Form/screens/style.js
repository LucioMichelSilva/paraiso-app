import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      Camera: {
        width: "100%",
        height: "100%" ,
      },
      contentButtons :{
        flex: 1,
        backgroundColor: "transparente",
        flexDirection: "row",
      },
      ButtonFlip:{
        position: "absolute",
        bottom: 110,
        left: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        margin:20,
        height:50,
        width:50,
        borderRadius:50,
        borderWidth: 2, 
        borderColor: 'green', 
        padding: 10,    
      },
      buttonCamera:{
       position: "absolute",
        bottom: 110,
        right:"25%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        margin:20,
        height:55,
        width:"35%",
        borderRadius:50 ,
        borderWidth: 2,
        borderColor: 'green',
        padding: 10, 
      },
      contentModal:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#a9a9a9",
      },
      closeButton :{
        position: "absolute",
        top:"20%",
        left:5,
      
      },
      imgPhoto:{
        width:"100%",
        height:400,
        marginTop:"50%",
        marginBottom:"40%"
      },
      update:{
        position: "absolute",
        top:"21%",
        left:"15%",
        },
})

export default styles