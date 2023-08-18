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

  const [IsScrolling, setIsScrolling] = useState('relative'); // Initial position
  const handleScroll = (event: any) => {
    console.log(event.nativeEvent.contentOffset.y);
    const { contentOffset } = event.nativeEvent;
    if (contentOffset.y < -50) {
      setIsScrolling('relative'); 
    }
    if (contentOffset.y > 10) {
      setIsScrolling('absolute'); 
    }
  };

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    if (scrollViewRef.current) {
      const index = section === 'section1' ? 0 : section === 'section2' ? 1 : 2;
      scrollViewRef.current.scrollTo({ x: index * screen_width, animated: true });
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          horizontal={true}
          pagingEnabled={true}
          contentContainerStyle={{ width: screen_width * 3 }} // Total width of all sections
        >
          {/* First Section */}
          <LinearGradient colors={['#464646', '#000']} style={styles.backgroundImage} locations={[0.3, 1]} start={{ x: 1, y: 0 }} end={{ x: 0.7, y: 0.7 }}>
           <View style={[styles.categoriesSection]}>
                <View style={styles.introText}>
                  <Text style={styles.categoriesTitle}>Restaurant Name</Text>
                  <Text style={styles.categoriesText}>Slogan</Text>
                </View>
                <View style={{height: 200, width: '100%', position: IsScrolling}}>
                  <Image source={steak} style={{height: '80%', width: '50%', resizeMode: 'contain', position: 'absolute', bottom: 0, right: 0}} />
                </View>
              <ScrollView 
                horizontal={false}
                contentContainerStyle={{ width: screen_width}}
                style={{ height: screen_height}}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                
                <View style={[styles.categoriesGrid]}>
                  <CategoryItem />
                  <CategoryItem />
                  <CategoryItem />
                  <CategoryItem />
                  <CategoryItem />
                  <CategoryItem />
                  <CategoryItem />
                  <CategoryItem />
                  <CategoryItem />
                  <CategoryItem />
                  <CategoryItem />
                  <CategoryItem />

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
  },


  categoriesTitle: {
    fontFamily: 'Cochin',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
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
