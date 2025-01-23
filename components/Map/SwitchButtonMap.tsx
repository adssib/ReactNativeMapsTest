import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';


type SwitchButtonsProps = {
    onSwitchToSGW: () => void; // Function type for the SGW button
    onSwitchToLoyola: () => void; // Function type for the Loyola button
  };
  
const SwitchButtons: React.FC<SwitchButtonsProps> = ({ onSwitchToSGW, onSwitchToLoyola }) => {
  return (
    <View style={styles.buttonContainer}>
      <Button mode="contained" onPress={onSwitchToSGW} style={styles.button}>
        Switch to SGW
      </Button>
      <Button mode="contained" onPress={onSwitchToLoyola} style={styles.button}>
        Switch to Loyola
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  button: {
    borderRadius: 5,
  },
});

export default SwitchButtons;
