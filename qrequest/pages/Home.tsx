import React, { useState, useRef } from 'react';
import { ImageBackground, Image, SafeAreaView, StyleSheet, View, ScrollView, Dimensions, Text, Animated } from 'react-native';


// assets
import background from '../assets/images/background.png';
import LinearGradient from 'react-native-linear-gradient';
import placeholder from '../assets/images/placeholder.png';
import steak from '../assets/images/steak.png';

// components
import Navbar from '../components/Navbar';
import CategoryItem from '../components/CategoryItem';


const screen_width = Dimensions.get('window').width;
const screen_height = Dimensions.get('window').height;

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState('section1'); // Initialize with the first section
  const scrollViewRef = useRef<ScrollView | null>(null);

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    if (scrollViewRef.current) {
      const index = section === 'section1' ? 0 : section === 'section2' ? 1 : 2;
      scrollViewRef.current.scrollTo({ x: index * screen_width, animated: true });
    }
  };

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    const index = Math.floor(contentOffset.x / screen_width); // Calculate the index of the active section
    const section = index === 0 ? 'section1' : index === 1 ? 'section2' : 'section3';
    setActiveSection(section);
  };
  

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled={true}
          onScroll={handleScroll}
          contentContainerStyle={{ width: screen_width * 3 }} // Total width of all sections
        >
          {/* First Section */}
          <LinearGradient colors={['#464646', '#000']} style={styles.backgroundImage} locations={[0, 0.5]} >
           <View style={[styles.categoriesSection]}>
                <View style={styles.introText}>
                  <Text style={styles.categoriesTitle}>Restaurant Name</Text>
                  <Text style={styles.categoriesText}>Slogan</Text>
                </View>
                <View style={{height: 300, width: '100%', position: 'absolute'}}>
                  <Image source={steak} style={{height: '100%', width: '80%', resizeMode: 'contain', position: 'absolute', bottom: 0, right: 0}} />
                </View>
              <ScrollView 
                horizontal={false}
                contentContainerStyle={{ width: screen_width}}
                style={{ height: screen_height}}
                //onScroll={handleScroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
                

              >
                <View style={{height: 200, width: '100%'}}>
                </View>
                
                <View style={[styles.categoriesGrid]}>
                  <CategoryItem categoryName="starter" />
                  <CategoryItem categoryName="main" />
                  <CategoryItem categoryName="dessert" />
                  <CategoryItem categoryName="drink" />
                  <CategoryItem categoryName="popular" />
                  <CategoryItem categoryName="unpopular" />
                  <CategoryItem categoryName="vegan" />
                  <CategoryItem categoryName="vegetarian" />
                  <CategoryItem categoryName="gluten-free" />
                  <CategoryItem categoryName="dairy-free" />
                  <CategoryItem categoryName="nut-free" />
                  <CategoryItem categoryName='seafood-free' />

                </View>
              </ScrollView>
          </View>
          </LinearGradient>
          

          {/* Second Section */}
          <View style={[styles.section, { backgroundColor: 'blue', width: screen_width }]}>
            <Text style={styles.sectionText}>Section 2</Text>
          </View>

          {/* Third Section */}
          <View style={[styles.section, { backgroundColor: 'green', width: screen_width }]}>
            <Text style={styles.sectionText}>Section 3</Text>
          </View>
        </ScrollView>

        <View style={styles.bottom}>
          <Navbar setActiveSection={scrollToSection} activeSection={activeSection} />
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({


  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },

  categoriesSection: {
    flex: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  introText: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
    top : 10,
    left: 0,
    position: 'absolute',
    zIndex: 0,
    paddingVertical: 10,
    
  },


  categoriesTitle: {
    fontFamily: 'Cochin',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    shadowColor: 'black',
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 5 },
  },

  categoriesText: {
    fontFamily: 'Cochin',
    fontSize: 18,
    color: 'white',
  },

  categoriesGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 20,
    gap: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 20,
    paddingVertical: 20,
  },

  section: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionText: {
    fontSize: 30,
    color: 'white',
  },


  bottom: {
    justifyContent: 'flex-end',
  },
});

export default Home;
