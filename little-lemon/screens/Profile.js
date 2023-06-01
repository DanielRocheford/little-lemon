import { View, Text , Image, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView,TextInput } from 'react-native'
import CheckBox from 'expo-checkbox'
import React, { useState ,useContext, useRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

const Profile = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [isOrderStatus, setOrderStatus] = useState(false);
  const [isPasswordChange, setPasswordChange] = useState(false);
  const [isSpecialOffer, setSpecialOffer] = useState(false);
  const [isNewsletter, setNewsletter] = useState(false);
  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [isLastName, setLastNameValid] = useState(false);
  const [UserInitial, setUserInitial] = useState('');
  const { setLogIn } = useContext(AuthContext); 
  const [originalValues, setOriginalValues] = useState({});  
  const prevDataRef = useRef();
  const { updateData,AUserInitial, AsetUserInitial } = useContext(AuthContext);
  const [ImageShowing, setImageShow] = useState(false);

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    // Validate the phone number format
    const isValidPhoneNumber = /^\d{3}-\d{3}-\d{4}$/.test(value);
    setPhoneValid(isValidPhoneNumber);
  };
  const handlefirsNameChange = (value) => {
    setFirstName(value);
    
  };
  const handleEmailChange = (value) => {
    setEmail(value);
    
    
  };
  const handleLastNameChange = (value) => {
    setLastName(value);
   };
  
  const handlelogOut = async ()=>{
     
      try {
          await AsyncStorage.removeItem('USER');
          setLogIn(false);
          return true;
      }
      catch(exception) {
          return false;
      }
  
  }
  const handleSaveChanges =() =>{
    const value = {
        UfName: firstName,
        Uemail: email,
        ULastName :lastName,
        UPhone : phoneNumber,
        UOrderStatus: isOrderStatus,
        USpecialOffer: isSpecialOffer,
        UPassChange: isPasswordChange,
        UNewsLetter: isNewsletter,
        UuriImage : image,

      };
      _storeData(value);
  }
  const _storeData = async (value) => {
    try {
        console.log('Update user')
        await AsyncStorage.setItem(
        'USER',
        JSON.stringify(value),
      );
    } catch (error) {
      // Error saving data
      console.log('error in submit '+error);
    }
  };
  const  _retrieveData = async () => {
    try {
      
      const value =  await AsyncStorage.getItem('USER')
      const user = await JSON.parse(value);
      return user;        
    
    
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
  useEffect(()=>{
        
    
    const fetchData = async () => {
      const userResponse = await  _retrieveData();    
    
      const str = userResponse;

      if (typeof JSON.stringify(str.UfName) !== "undefined") setFirstName(JSON.stringify(str.UfName).replaceAll('"', ''));
      if (typeof JSON.stringify(str.ULastName) !== "undefined") setLastName(JSON.stringify(str.ULastName).replaceAll('"', ''));
      if (typeof JSON.stringify(str.Uemail) !== "undefined") setEmail(JSON.stringify(str.Uemail).replaceAll('"', ''));
      if (typeof JSON.stringify(str.UPhone) !== "undefined")setPhoneNumber(JSON.stringify(str.UPhone).replaceAll('"', ''));
      if (typeof JSON.stringify(str.UOrderStatus) !== "undefined")setOrderStatus(JSON.stringify(str.UOrderStatus).replaceAll('"', '')=="true");
      if (typeof JSON.stringify(str.UPassChange) !== "undefined")setPasswordChange(JSON.stringify(str.UPassChange).replaceAll('"', '')=="true");
      if (typeof JSON.stringify(str.USpecialOffer) !== "undefined")setSpecialOffer(JSON.stringify(str.USpecialOffer).replaceAll('"', '')=="true");
      if (typeof JSON.stringify(str.UNewsLetter) !== "undefined")setNewsletter( JSON.stringify(str.UNewsLetter).replaceAll('"', '')=="true");
      if (typeof JSON.stringify(str.UuriImage) !== "undefined")setImage( JSON.stringify(str.UuriImage).replaceAll('"', ''));
      const originalValues = {
        UfName: str.UfName,
        Uemail: str.Uemail,
        ULastName: str.ULastName,
        UPhone: str.UPhone,
        UOrderStatus: str.UOrderStatus,
        USpecialOffer: str.USpecialOffer,
        UPassChange: str.UPassChange,
        UNewsLetter: str.UNewsLetter,
        UuriImage: str.UuriImage,
      };
      prevDataRef.current = originalValues;
      setOriginalValues(originalValues);

    };
    
    fetchData();
  },[])
  const discardChanges = () => {
    setFirstName(originalValues.UfName);
    setLastName(originalValues.ULastName);
    setEmail(originalValues.Uemail);
    setPhoneNumber(originalValues.UPhone);
    setOrderStatus(originalValues.UOrderStatus);
    setSpecialOffer(originalValues.USpecialOffer);
    setPasswordChange(originalValues.UPassChange);
    setNewsletter(originalValues.UNewsLetter);
    setImage(originalValues.UuriImage);
  };
  
  useEffect(()=>{
    
      if (lastName.length>0){
          setLastNameValid(!isLastName);
          console.log('last name exist');
          AsetUserInitial(firstName.slice(0,1).toUpperCase() + lastName.slice(0,1).toUpperCase()) ;
          console.log(UserInitial); 
      }else{
          console.log('last name doesnt exist');
            
          AsetUserInitial(firstName.slice(0,1).toUpperCase());
          console.log(UserInitial);
      }
    
    _retrieveData(); 
  },[lastName,image,firstName]) 

  useEffect(()=>{


    if(image.length>0){
      
      console.log('imag '+ image)
      setImageShow(true)
    }else{
      console.log('imag not'+ image)
      setImageShow(false)

    }

  },[image])
 
  const handleUpdateData = () => {
   
    const updatedData = {
      UfName: firstName,
      Uemail: email,
      ULastName :lastName,
      UPhone : phoneNumber, 
      UOrderStatus: isOrderStatus,
      USpecialOffer: isSpecialOffer,
      UPassChange: isPasswordChange,
      UNewsLetter: isNewsletter,
      UuriImage : image,

    };
    // Call the updateData callback function from the previous screen
    if (updatedData !== originalValues) {
      console.log('change will be made')
      updateData(updatedData);
    }

    // Go back to the previous screen
    navigation.goBack();
  };

  const pickImage = async () => {
    
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    
    console.log('ici c paris'+ result.assets[0].uri);

    if (!result.canceled) {
      console.log('ici c paris'+ result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };
  const removeImage = ()=>{
    
    setImageShow(false)
    setImage('')
  }
  return (
    

    <KeyboardAvoidingView style={{    
        flex: 1,   
        alignItems: 'center',
        justifyContent: 'center',    
        marginBottom: insets.bottom,
        marginTop: insets.top,
        backgroundColor: '#495E57',
        }}>
        <View style={Styles.Header} >
                <TouchableOpacity onPress={handleUpdateData}>
                    <Image style={Styles.goBack} source={require('../assets/gobackB.png')}/>
                </TouchableOpacity>
                <Image style={Styles.logo} source={require('../assets/LogoLittleL.png')}/>
                <TouchableOpacity style={Styles.profilPicheaderbtn} onPress={pickImage} >                    
                    {ImageShowing ?  <Image source={{ uri: image }} style={Styles.profilPicHeader} /> : <Text style={Styles.textPicProfilHeader}>{AUserInitial}</Text>}
                </TouchableOpacity>      
            
            </View>     
        <ScrollView keyboardDismissMode='on-drag'>
            <Text style={Styles.headline}>Personal information</Text>
            <View style={Styles.HeaderSecond}>
                <TouchableOpacity style ={Styles.profilbtn}>
                     {ImageShowing ?  <Image source={{ uri: image }} style={Styles.profilPic} /> : <Text style={Styles.textPicProfil}>{AUserInitial}</Text>}
                </TouchableOpacity>  
                <TouchableOpacity onPress={pickImage} style={Styles.buttonChangePic}>
                    <Text style={Styles.TextButton}>Change </Text>
                </TouchableOpacity>   
                <TouchableOpacity onPress={removeImage} style={Styles.buttonRemovePic}>
                    <Text style={Styles.text}>Remove</Text>
                </TouchableOpacity>   
            </View>
            <TextInput style={Styles.TextInput} placeholder='first name' placeholderTextColor="rgba(255,255,255,0.5)" onChangeText={handlefirsNameChange}  underlineColorAndroid={'transparent'}>{firstName}</TextInput>
            <TextInput style={Styles.TextInput} placeholder='Last name'   placeholderTextColor="rgba(255,255,255,0.5)"  onChangeText={handleLastNameChange} underlineColorAndroid={'transparent'}>{lastName}</TextInput>
            <TextInput style={Styles.TextInput} placeholder='email' placeholderTextColor="#fff"  onChangeText={handleEmailChange}  underlineColorAndroid={'transparent'}>{email}</TextInput>
            <TextInput style={Styles.TextInput} keyboardType='phone-pad'  placeholder='Phone number ex: 123-456-7890' onChangeText={handlePhoneNumberChange}  placeholderTextColor="rgba(255,255,255,0.5)"  underlineColorAndroid={'transparent'}>{phoneNumber}</TextInput>
            {!isPhoneValid && <Text style={Styles.errorText}>Invalid phone number</Text>}
            
            <Text style={Styles.headline}>Email notifications</Text>
            <View style={Styles.wrapper}>
                <CheckBox
                  value={isOrderStatus}               
                  onValueChange={() => setOrderStatus(!isOrderStatus)}  
                />
                <Text style={Styles.text}>
                    Order statuses 
                </Text>
            </View>
            
            <View style={Styles.wrapper}>
                <CheckBox
                  value={isPasswordChange}               
                  onValueChange={() => setPasswordChange(!isPasswordChange)}  
                />
                <Text style={Styles.text}>
                   Password changes 
                </Text>
            </View>

            <View style={Styles.wrapper}>
                <CheckBox
                  value={isSpecialOffer}               
                  onValueChange={() => setSpecialOffer(!isSpecialOffer)}  
                />
                <Text style={Styles.text}>
                   Special offers
                </Text>
            </View>

            <View style={Styles.wrapper}>
                <CheckBox
                  value={isNewsletter}               
                  onValueChange={() => setNewsletter(!isNewsletter)}  
                />
                <Text style={Styles.text}>
                    Newsletter
                </Text>
            </View>
            <TouchableOpacity onPress={handlelogOut} style={Styles.buttonLogout}  >
                <Text style={Styles.TextButton}>
                    Log out
                </Text>
            </TouchableOpacity>
            <View style={Styles.buttonDiscardHeader}>
               <TouchableOpacity onPress={discardChanges} style={Styles.btnDiscard}>
                    <Text style={Styles.text}>Discard changes</Text>
                </TouchableOpacity>   
                <TouchableOpacity onPress={handleSaveChanges} style={Styles.buttonLogout}>
                    <Text style={Styles.TextButton}>Save changes</Text>
                </TouchableOpacity>  
            </View>

        </ScrollView>
        
    </KeyboardAvoidingView>
  )
}
const Styles = StyleSheet.create({
    container :{
        
        backgroundColor: '#495E57',       
     
    },
    Header :{
        flexDirection : 'row',
        backgroundColor : '#fff',
        alignSelf:'stretch'
    },
    
    HeaderSecond :{
        flexDirection : 'row',
        justifyContent :'flex-start',
        alignContent: 'flex-start',
       
    },
    goBack :{
      height: 60,
      width: 60,
    },
    logo : {
        height: 40,
        width : 185, 
        marginLeft: 40,
        marginTop: 5,
        
    },
    
    profilPicHeader :{
        width: 60,
        height: 60,      
        borderRadius: 100,    
        padding: 10,
        
        justifyContent: 'center',
        alignItems: 'center',

    },
    profilPic:{

        width: 90,
        height: 90,
        borderRadius: 100,
        
       
        justifyContent: 'center',
        alignItems: 'center',
        
        padding: 10,

        

    },
    profilPicheaderbtn :{
        justifyContent: 'center',
        alignItems :'center',
        width: 60,
        height: 60,
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#62d6c4',
        marginLeft: 20,
    },
    textPicProfilHeader : {
        fontWeight : 'bold',
        alignSelf: 'center',  
        fontSize : 20,
     
       
    },
    textPicProfil : {
        fontWeight : 'bold',
        alignSelf: 'center',
        fontSize : 40,
       
    },
    profilbtn : {
        justifyContent: 'center',
        alignItems :'center',
        width: 90,
        height: 90,
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#62d6c4',
        marginLeft: 20,
        marginTop :10,
    },
    buttonChangePic : {
            
        alignItems: 'center',
        alignContent:'center',
        marginTop :35,
        backgroundColor:'#F4CE14',
        marginLeft : 20,
        height : 50,
        justifyContent: 'center',
        width : '25%'
    },
    buttonRemovePic :{
           
        alignItems: 'center',
        alignContent:'center',
        marginTop :35,
        backgroundColor : '#495E57',
        borderColor : '#F4CE14',
        borderRadius : 5, 
        borderWidth: 1,
        marginLeft : 20,
        height : 50,
        justifyContent: 'center',
        width : '25%'
    }, 
    TextInput :{
        alignSelf:'stretch',
        height: 40,
        marginTop: 30,
        color:'#ffffff',
        borderBottomColor: '#f8f8f8',
        borderBottomWidth : 1,
       
    },
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignContent: "center",
        paddingVertical: 15,
      },  
    buttonLogout: {
        
        alignSelf:'stretch',
        padding: 20,        
        alignItems: 'center',
        alignContent:'center',
        marginTop :20,
        backgroundColor:'#F4CE14'
    },
    text: {
        lineHeight: 30,
        marginLeft: 10,
        color: '#fff',
      },
    headline : {
        fontWeight :'bold',
        fontSize : 20,
        color: '#fff',
        marginTop : 20,
      },
    TextButton :{
        fontWeight :'bold',
      },
    buttonDiscardHeader : {
        justifyContent:'space-between',
        flexDirection : 'row',
        flexWrap: 'wrap',
        paddingBottom: 10,
    },
    btnDiscard : {
        alignSelf:'stretch',
        padding: 20,        
        alignItems: 'center',
        alignContent:'center',
        marginTop :20,
        backgroundColor : '#495E57',
        borderColor : '#F4CE14',
        borderRadius : 5, 
        borderWidth: 1,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
      },

})
export default Profile