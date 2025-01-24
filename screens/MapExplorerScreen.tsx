/**
 * This screen will be our main Map where the user iteacts 
 */

import React, { useRef, useState } from 'react';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View, Text, Keyboard } from 'react-native';
import { GOOGLE_MAPS_API_KEY } from '../constants/GoogleKey';

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_LAT = 28.46254;
const INITIAL_LNG = -81.397272;
const INITIAL_POS = {
  latitude: INITIAL_LAT,
  longitude: INITIAL_LNG,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA,
};

export default function MapExplorerScreen() {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const map = useRef<MapView | null>(null);

  const searchPlaces = async () => {
    if (!searchText.trim()) return;

    const location = `${INITIAL_LAT},${INITIAL_LNG}`;
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&location=${location}&radius=500&key=${GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      const coords: LatLng[] = json.results.map((item: any) => ({
        latitude: item.geometry.location.lat,
        longitude: item.geometry.location.lng,
      }));

      setResults(json.results);

      if (coords.length) {
        map.current?.fitToCoordinates(coords, {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        });
        Keyboard.dismiss();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView ref={map} style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={INITIAL_POS}>
        {results.map((item, i) => (
          <Marker
            key={`marker-${i}`}
            coordinate={{
              latitude: item.geometry.location.lat,
              longitude: item.geometry.location.lng,
            }}
            title={item.name}
          />
        ))}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.input}
          placeholder="Search place"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.button} onPress={searchPlaces}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  searchBox: {
    position: 'absolute',
    top: 10,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#722F37',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
