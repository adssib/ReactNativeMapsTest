import React, { useRef, useState } from 'react';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View, Text, Keyboard } from 'react-native';
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
  const [results, setResults] = useState<any[]>([]);
  const map = useRef<MapView | null>(null) 
  
  const searchPlaces = async () => {
    if (!searchText.trim().length) {
      console.log("Search text is empty.");
      return;
    }
  
    const googleApiURL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const input = searchText.trim();
    const location = `${INITIAL_LAT},${INITIAL_LNG}`;
    const url = `${googleApiURL}?query=${input}&location=${location}&radius=500&key=${GOOGLE_MAPS_API_KEY}`;
  
    console.log("Fetching data from:", url);
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        console.error(`HTTP error: ${response.status} - ${response.statusText}`);
        return;
      }
  
      const json = await response.json();
      console.log("API Response:", json); // Logs the JSON data to the console
  
      if (json && json.results) {
        const coords: LatLng[] = [] 
        for (const item of json.results){
          coords.push({
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          })
        }
        setResults(json.results)

        if(coords.length){
          map.current.fitToCoordinates(coords, {
            edgePadding: {
              top: 50,
              right: 50, 
              bottom: 50,
              left: 50,
            },
            animated: true
          })
          Keyboard.dismiss()
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_POS}
      >
        {results.length ? results.map((item, i) => {
          const coord: LatLng = {
            latitude: item.geometry.location.lat,
            longitude: item.geometry.location.lng,
          }
          return <Marker 
                    key={`search-item-${i}`} 
                    coordinate={coord} 
                    title={item.name} 
                    description=""
                  />
        }) : null}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search place" // Added placeholder for clarity
          placeholderTextColor="#aaa" // Placeholder color for better UX
          value={searchText} // Bind the state to the input value
          onChangeText={(text) => {
            console.log("User input:", text); // Log user input for debugging
            setSearchText(text); // Update the state with the input
          }}
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
