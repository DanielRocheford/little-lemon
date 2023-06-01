import { View, Text, Image, StyleSheet, ScrollView,TextInput,TouchableOpacity,Dimensions , KeyboardAvoidingView} from 'react-native'
import { useState ,useContext} from 'react'
import React from 'react'
import { AuthContext } from '../AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Onboarding = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [isDisabled, setDisable] = useState(true);
  const [isEmailValid, setMailValid] = useState(false);
  const { setLogIn } = useContext(AuthContext); 
  const insets = useSafeAreaInsets();
  const { updateLoginStatus } = useContext(AuthContext);



  function handleInputName(value){
 
    setFirstName(value);
    if (isEmailValid && firstName.length>0)
       setDisable(false);
    else
       setDisable(true);
  }
  function handleMail(value){
   
    setEmail(value);
    const regexExp = /(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

    const str = value;
    setMailValid(regexExp.test(str));

    if (isEmailValid && firstName.length>0)
       setDisable(false);
    else
       setDisable(true);
  }
  const _storeData = async (value) => {
    try {
        console.log('save user')
        await AsyncStorage.setItem(
        'USER',
        JSON.stringify(value),
      );
    } catch (error) {
      // Error saving data
      console.log('error in submit '+error);
    }
  };
  function submitNext (){
   
    const value = {
        UfName: firstName,
        Uemail: email,
      };
      updateLoginStatus(true);
    console.log('save phase in')
    _storeData(value);
  }
  return (
     <KeyboardAvoidingView style={{    
        flex: 1,
       
        backgroundColor: '#495E57',
        alignItems: 'center',
        justifyContent: 'center',
        
        marginBottom: insets.bottom,
        marginTop: insets.top,
        }}>

        <ScrollView  keyboardDismissMode='on-drag'>
            <Image style={Styles.logo} source={require('../assets/LogoWtypo.png')}/>
            <Text style={Styles.BigTitle}>Let us get to know you</Text>
            <TextInput style={Styles.TextInput} placeholder='first name' onChangeText={(value)=> handleInputName(value)}  placeholderTextColor="rgba(255,255,255,0.5)"  underlineColorAndroid={'transparent'}></TextInput>
            <TextInput style={Styles.TextInput} placeholder='email' onChangeText={(value)=> handleMail(value)}  placeholderTextColor="rgba(255,255,255,0.5)"   underlineColorAndroid={'transparent'}></TextInput>
            <TouchableOpacity style={isDisabled ? Styles.buttonInValid: Styles.buttonValid} onPress={submitNext} disabled={isDisabled} >
                <Text style={Styles.TextButton}>
                    Next
                </Text>
            </TouchableOpacity>
        </ScrollView>
        
     </KeyboardAvoidingView>
    
    

   
  )
}
const Styles = StyleSheet.create({
    
    logo : {
        width : 200,
        height: 268,
        alignSelf: 'center',
    },

    BigTitle: {
        fontSize: 25,
        color : '#fff',
        marginTop :40,
        marginBottom: 40,
     
    },
    TextInput :{
        alignSelf:'stretch',
        height: 40,
        marginBottom: 30,
        color:'#ffffff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth : 1,
       
    },

    buttonValid: {
        
        alignSelf:'stretch',
        padding: 20,        
        alignItems: 'center',
        alignContent:'center',
        marginTop :20,
        backgroundColor:'#F4CE14'
    },
    buttonInValid: {
        
        alignSelf:'stretch',
        padding: 20,        
        alignItems: 'center',
        alignContent:'center',
        marginTop :20,
        backgroundColor:'#f6e17c'
    },
    TextButton :{
        fontSize: 25,
        fontWeight: 'bold',
        color: "#fff",
    },
   

})
export default Onboarding