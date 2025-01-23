import React, { useState } from 'react';
import { Alert, Button, StyleSheet, View } from 'react-native';
import MapView, { Geojson, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import buildings from '@/assets/Buildings/BuildingsMarkers';
import floorPlan from '@/assets/FloorPlan/floorplan.json';

const SGW_CAMPUS = {
  latitude: 45.497092,
  longitude: -73.578800,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

const LOY_CAMPUS = {
  latitude: 45.458705,
  longitude: -73.640523,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default function App() {
  const [region, setRegion] = useState(SGW_CAMPUS); // Default region is SGW

  const switchToSGW = () => {
    setRegion(SGW_CAMPUS);
  };

  const switchToLoyola = () => {
    setRegion(LOY_CAMPUS);
  };

 return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        region={region} // Dynamically set region
      >
        {buildings.map((building, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: building.Latitude, // Ensure these are numbers
              longitude: building.Longitude,
            }}
            title={building.BuildingName}
            description={building.BuildingLongName}
          />
        ))}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Switch to SGW" onPress={switchToSGW} />
        <Button title="Switch to Loyola" onPress={switchToLoyola} />
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
    height: '90%', // Adjusted height for buttons
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff', // Optional styling for button container
  },
});