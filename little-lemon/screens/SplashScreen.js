import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SplashScreen = () => {

  const insets = useSafeAreaInsets();
  return (
    <View style={{    
        flex: 1,
       
        alignItems: 'center',
        justifyContent: 'center',
        
        marginBottom: insets.bottom,
        marginTop: insets.top,
        }}>
            <Image style={Styles.logo} source={require('../assets/LogoWGtypo.png')}/>
            <Image style={Styles.loading} source={require('../assets/loadingGif.gif')}/>

    </View>
  )
}
const Styles = StyleSheet.create({
   container:{
    flex: 1,
    justifyContent :'center',
    alignItems: 'center',
   },
    logo : {
        width : 200,
        height: 268,
        alignSelf: 'center',
    },
    loading : {
        width : 50,
        height: 50,
        alignSelf: 'center',
    }

})
export default SplashScreen