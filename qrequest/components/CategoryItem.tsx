import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

// assets
import placeholder from '../assets/images/placeholder.png';

const CategoryItem: React.FC = () => {
    return (
        <View style={[styles.categoriesGridItem]}>
                <Image source={placeholder} style={styles.categoriesGridImage} />
                <Text style={styles.categoriesGridItemText}>Section</Text>
        </View>
    );
    }

const styles = StyleSheet.create({

    categoriesGridItem: {
        flexDirection: 'column',
        width: '40%',
        height: 130,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        gap: 10,
      },
    
      categoriesGridImage: {
        width: '90%',
        height: '60%',
        resizeMode: 'contain',
        borderRadius: 30,
      },
    
    
      categoriesGridItemText: {
        fontFamily: 'Cochin',
        fontSize: 18,
        color: 'white',
        textAlign: 'center',
      },

});

export default CategoryItem;