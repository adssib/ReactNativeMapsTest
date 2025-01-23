import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get("window") ; 

const ASPECT_RATIO = width / height ; 
const LATITUDE_DELTA = 0.02 ; 
const LONGTITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; 
const INITIAL_LAT = 28.46254; 
const INTIAL_LNG = -81.397272; 
const INTIAl_POS = {
  latitude: INITIAL_LAT, 
  longitude: INTIAL_LNG,
  latitudeDelta: LATITUDE_DELTA, 
  longitudeDelta: LONGTITUDE_DELTA, 
}; 

export default function App() {
  return (
    <View style={styles.container}>
      <MapView 
          style={styles.map} 
          provider={PROVIDER_GOOGLE}  
          initialRegion={INTIAl_POS}
      />
      <View style={styles.searchBox}>
        <Text style={styles.searchBoxField}>Search place</Text> 
        <TextInput/>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchBox: {
    position: 'absolute', 
    width: '90%', 
    borderRadius: 8, 
    borderWidth: 1, 
    borderColor: '#aaa',
    backgroundColor: 'white',
    padding: 8,
    alignSelf: 'center',
    marginTop: 15, 
  },
  searchBoxField: {
    borderColor: '#777', 
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4, 
    fontSize: 18,
    marginBottom: 4,
  },
  buttonContainer: {
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 8, 
    backgroundColor: '#26f',
    borderRadius: 8, 
  },
  buttonText: {
    fontSize: 18, 
    color: 'white',
  },
});
