import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Category = ({ name, isSelected, onPress  }) => {
  

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          Styles.dishCat,
          isSelected ? Styles.dishCatSelected : null,
        ]}
        onPress={onPress}
      >
        <Text style={Styles.dishCatName}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  dishCatName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#495e57',
  },
  dishCat: {
    borderRadius: 10,
    backgroundColor: '#edefee',
    height: 40,
    padding: 5,
    margin: 10,
  },
  dishCatSelected: {
    backgroundColor: '#a2c4c0',
  },
});

export default Category;
