import { View, Text , Image, TouchableOpacity, StyleSheet,TextInput } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dish from '../components/Dish';
import { FlatList } from 'react-native-gesture-handler';

  import {    
    createMenuItemTable,
    getMenuItems,
    saveMenuItems,
    filterByQueryAndCategories,
    isTableExists,
    isTableEmpty, } from '../database';


const Home = ({navigation}) => {
    const insets = useSafeAreaInsets();
    const [image, setImage] = useState('');
    const [UserInitial, setUserInitial] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLastName, setLastNameValid] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [data, setData] = useState([]);

    
      const isDataStored = async () => {
        try {
          const tableExists = await isTableExists();
          if (tableExists) {
            const tableHasData = await isTableEmpty();
            if (tableHasData) {
             return true; 
            } else {
             return false;
            }
          } else {
            return false ;
          }
        } catch (error) {
          console.log('Error checking table:', error);
        }
      };
      
    
          
    const handleTextChange = (text) => {
        setSearchText(text);
        onSearch(text);
      };

    const getMenu = async ()=>{
        try{
            const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
            const data = await response.json();
            return data.menu;
            
        }
        catch(error)
        {
            console.log(error);
        }
        
    } 
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
    
    const  ShowProfil = ()=>{
        navigation.navigate('Profile',{ updateData: handleUpdateData })
    }
    const handleUpdateData = (updatedData) => {
        if (typeof JSON.stringify(updatedData.UfName) !== "undefined") setFirstName(JSON.stringify(updatedData.UfName).replaceAll('"', ''));
        if (typeof JSON.stringify(updatedData.UuriImage) !== "undefined") setImage( JSON.stringify(updatedData.UuriImage).replaceAll('"', ''));                
        if (typeof JSON.stringify(updatedData.ULastName) !== "undefined") setLastName(JSON.stringify(updatedData.ULastName).replaceAll('"', ''))
    };

    const fetchData = async () => {
        const [menuResponse, userResponse] = await Promise.all([getMenu(), _retrieveData()]);
        setData(menuResponse);
        console.log('somewhere I belong '+ JSON.stringify(menuResponse) )
        const str = userResponse;
        
     
        if (typeof JSON.stringify(str.UfName) !== "undefined") setFirstName(JSON.stringify(str.UfName).replaceAll('"', ''));
        if (typeof JSON.stringify(str.UuriImage) !== "undefined") setImage( JSON.stringify(str.UuriImage).replaceAll('"', ''));                
        if (typeof JSON.stringify(str.ULastName) !== "undefined") setLastName(JSON.stringify(str.ULastName).replaceAll('"', ''));
      
        
      
        return menuResponse;
        };

    useEffect(()=>{
        (async () => {
            try {
              await createMenuItemTable();
              let menuItems = await getMenuItems();
              
              // The application only fetches the menu data once from a remote URL
              // and then stores it into a SQLite database.
              // After that, every application restart lo ads the menu from the database
              if (!menuItems.length) {
                const menuItems = await fetchData();
                console.log(menuItems);
                saveMenuItems(menuItems);
                
              }
             
            } catch (e) {
              // Handle error
              Alert.alert(e.message);
            }
          })()
          
        
        
        
        
      },[])
      
    useEffect(() => {
        if (lastName.length > 0) {
          setLastNameValid(!isLastName);
          setUserInitial(firstName.slice(0, 1).toUpperCase() + lastName.slice(0, 1).toUpperCase());
          console.log('last name exist '+UserInitial);
        } else {
          setUserInitial(firstName.slice(0, 1).toUpperCase());
          console.log('last name not exist '+UserInitial);

        }
    }, [firstName, lastName,data]);   
 
  return (
    <View style={{    
        flex: 1,   
        alignItems: 'center',
        
        marginBottom: insets.bottom,
        marginTop: insets.top,
        backgroundColor: '#fff',
        }}>
        <View style={Styles.Header} >
                  
                    <Image style={Styles.logo} source={require('../assets/LogoLittleL.png')}/>
                    <TouchableOpacity onPress={ShowProfil}  style={Styles.profilPicheaderbtn}  >                    
                        {image ?  <Image source={{ uri: image }} style={Styles.profilPicHeader} /> : <Text style={Styles.textPicProfilHeader}>{UserInitial}</Text>}
                    </TouchableOpacity>               
        </View>
        <View style={Styles.mainBlock}>
            <Text style ={Styles.title}>Little Lemon</Text>
            
            <View style ={Styles.TextImage}>
                <View style={Styles.textContainer}>
                    <Text style={Styles.subtitle}>Chicago</Text>
                    <Text style ={Styles.description}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist</Text>
         
                </View>
                <Image style={Styles.mainImage} source={ require('../assets/HeroImage.png')}/>
            </View>
            <TextInput
                style={Styles.input}
                value={searchText}
                onChangeText={handleTextChange}
                placeholder="Search..."
                placeholderTextColor="rgba(255,255,255,0.5)"
            />
            
        </View>  
        <Text style ={Styles.catTitle}>ORDER FOR DELIVERY!</Text> 
        <View style={Styles.dishCategoryContainer}>
            <TouchableOpacity style = {Styles.dishCat}>
                <Text style={Styles.dishCatName}>Starters</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {Styles.dishCat}>
                <Text style={Styles.dishCatName}>Mains</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {Styles.dishCat}>
                <Text style={Styles.dishCatName}>Desserts</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {Styles.dishCat}>
                <Text style={Styles.dishCatName}>Drinks</Text>
            </TouchableOpacity>    
        </View>
        <View
            style={{
                borderBottomColor: 'black',
                borderBottomWidth: StyleSheet.hairlineWidth,
                alignSelf:'stretch',
                margin : 20,
            }}
            />
        <FlatList
        data={data}
        renderItem={({ item }) => (
          <Dish name={item.name} description={item.description} price={item.price} image={item.image}/>
        )}
      />
        
    </View>
  )
}
const Styles = StyleSheet.create({
    container :{
        
        backgroundColor: '#ffffff',       
     
    },
    logo : {
        height: 40,
        width : 185, 
        marginLeft: 40,
        marginTop: 5,
        
    },
    textContainer: {
        flex: 1,
        justifyContent : 'flex-start',
      },
    Header :{
        flexDirection : 'row',
        backgroundColor : '#fff',
        alignSelf:'stretch',
        justifyContent : 'flex-end',    
    
    },
    textPicProfilHeader : {
        fontWeight : 'bold',
        alignSelf: 'center',  
        fontSize : 20,
     
       
    },
    profilPicHeader :{
        width: 60,
        height: 60,      
        borderRadius: 100,    
       
        justifyContent: 'center',
        alignItems: 'center',

    },
    dishName: {
        fontWeight : 'bold',
        fontSize : 25,
    },
    dishDescription :{
        color : '#495e57'
    },
    dishPrice : {
        color : '#495e57',
        fontSize : 20,
    },
    dishImage : {
        height : 100,
        width : 100,
    },
    dishCatName: {
        fontSize : 20,
        fontWeight : 'bold',
        color :'#495e57'
    },
    catTitle: {
        fontWeight :'bold',
        fontSize : 20,
        alignSelf:'flex-start',
        marginTop: 20,
        marginLeft : 15,
    },
    title: {
        fontSize: 40,
        fontWeight :'bold',
        color : '#F4CE14',
    },
    dishCat: {
        borderRadius : 10,
        backgroundColor : '#edefee',
        height : 40,
        padding: 5,
        margin: 10
    },
    TextImage: {
       flexDirection: 'row',
       alignItems: 'center',
       marginBottom : 5,
    },
    mainBlock:{
        backgroundColor : '#495E57',
        alignSelf:'stretch',
        marginTop :10,
        padding: 10,
    },
    mainImage : {
        height: 200,
        width : 132,
        borderRadius : 10,
        marginLeft: 5,
    },
    dishCategoryContainer :{
        flexDirection :'row',
        marginTop : 5,
        justifyContent: 'space-between',
        
    },
    
    subtitle: {
        fontSize: 38,
        fontWeight: 'bold',
        color : '#fff'
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
    description: {
        fontSize: 20,
        marginTop: 5,
        color :'#fff',
     
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        paddingHorizontal: 10,
      },

})
export default Home