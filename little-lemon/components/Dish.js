import { View, Text, Image ,StyleSheet} from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
const Dish = ({name, description, price, image }) => {
  const imageUrl = `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`;

  return (
    <View>
      <View style ={Styles.container}>
        <View style={Styles.textContainer}>
            <Text style={Styles.dishName}>{name}</Text>
            <Text style ={Styles.dishDescription}>{description}</Text>
            <Text style={Styles.dishPrice}>{price}</Text>
        </View>
        <Image style={Styles.dishImage } source={{ uri: imageUrl }} />
      </View>
      
      <View
          style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
              alignSelf:'stretch',
              margin : 2,
          }}
          />    
</View>
  )
}
const Styles = StyleSheet.create({
  container :{
      flexDirection : 'row',
      backgroundColor: '#ffffff',    
      width: Dimensions.get('window').width, 
      padding:5,  
  },
  
  dishName: {
      fontWeight : 'bold',
      fontSize : 25,
      flexWrap: 'wrap',
      flexShrink: 1, 
  },
  dishDescription :{
      color : '#495e57',
      flexWrap: 'wrap', 
      flexShrink: 1, 
  },
  dishPrice : {
      color : '#495e57',
      fontSize : 20,
  },
  dishImage : {
    
      height : 100,
      width : 100,
  },
  
  textContainer: {
    width: Dimensions.get('window').width*0.8,
    justifyContent : 'center',
    padding: 10,
  },

})
export default Dish