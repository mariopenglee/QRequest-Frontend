import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

// assets
import placeholder from '../assets/images/placeholder.png';

interface CategoryItemProps {
    categoryName: string; // Prop for category name
  }

  

  const CategoryItem: React.FC<CategoryItemProps> = ({ categoryName }) => {
    return (
        <View style={[styles.categoriesGridItem]}>
                <Image source={placeholder} style={styles.categoriesGridImage} />
                <Text style={styles.categoriesGridItemText}>{categoryName}</Text>
        </View>
    );
    }

const styles = StyleSheet.create({

    categoriesGridItem: {
        flexDirection: 'column',
        width: '40%',
        height: 130,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      },
    
      categoriesGridImage: {
        width: '90%',
        height: '60%',
        resizeMode: 'contain',
        borderRadius: 30,
      },
    
    
      categoriesGridItemText: {
        fontFamily: 'Cochin',
        fontSize: 30,
        color: 'white',
      },

});

export default CategoryItem;