import React from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';

const DetailsScreen = ({route}) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.detailText}>
        {route.params ? JSON.stringify(route.params) : 'No data passed'}
      </Text>
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    padding: 8,
  },
  detailText: {
    fontSize: 20,
  },
});
