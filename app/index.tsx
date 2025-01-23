import React, { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, View, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import buildings from '@/assets/Buildings/BuildingsMarkers';

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
  const [region, setRegion] = useState(SGW_CAMPUS);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission Required',
          message: 'This app needs location access to show your current position on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Location access is required to show your location.');
      }
    }
  };

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
        region={region}
      >
        {buildings.map((building, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: building.Latitude,
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
    height: '90%',

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
  },
});
