import React, { useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { GOOGLE_MAPS_API_KEY } from '../constants/GoogleKey';

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGTITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_LAT = 28.46254;
const INITIAL_LNG = -81.397272;
const INITIAL_POS = {
  latitude: INITIAL_LAT,
  longitude: INITIAL_LNG,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGTITUDE_DELTA,
};

export default function App() {
  const [searchText, setSearchText] = useState(''); // State to store input text

  const searchPlaces = async () => {
    if(!searchText.trim().length) return; 

    const googleApiURL = "https://maps.googleapi.com/maps/api/place/textsearch/json" ; 
    
    const input = searchText.trim() 
    const location = `${INITIAL_LAT},${INITIAL_LNG}&radius=500`
    const url = `${googleApiURL}?query=${input}&location=${location}$key=${GOOGLE_MAPS_API_KEY}`

    try{
      const resp = await fetch(url) ; 
      const json = await resp.json() ; 
      console.log(json)
      console.log(GOOGLE_MAPS_API_KEY)
    }catch(e){
      console.log(e);
    }
  }; 

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POS}
      />
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search place" // Added placeholder for clarity
          placeholderTextColor="#aaa" // Placeholder color for better UX
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={searchPlaces}>
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
    top: 15, // Positioning it at the top
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 10, // Adds spacing between input and button
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#722F37', // Wine color
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
