import React from 'react';
import MapView, { Marker, Region, PROVIDER_GOOGLE } from 'react-native-maps';

type Building = {
  Latitude: number;
  Longitude: number;
  BuildingName: string;
  BuildingLongName: string;
};

type CampusMapProps = {
  region: Region;
  buildings: Building[];
};

const CampusMap: React.FC<CampusMapProps> = ({ region, buildings }) => {
  return (
    <MapView
      style={{ flex: 1 }}
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
  );
};

export default CampusMap;
