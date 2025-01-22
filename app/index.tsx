import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import buildings from '@/assets/Buildings/BuildingsMarkers';
import floorPlan from '@/assets/FloorPlan/floorplan.json';


const SGW_BUILDING={
  latitude: 45.497092, 
  longitude: -73.578800, 
  latitudeDelta: 2, 
  longitudeDelta: 2,
}

export default function App() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        initialRegion={SGW_BUILDING}
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
            // onPress={() => onMarkerSelected(building)}
          />
        ))}
      </MapView>
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
});
