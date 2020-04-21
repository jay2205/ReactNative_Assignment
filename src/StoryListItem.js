/* @flow weak */

import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const StoryListitem = ({item, onPressHandler}) => {
  return (
    <TouchableOpacity onPress={() => onPressHandler(item)}>
      <View style={styles.listItem}>
        <Text style={styles.listItemheading}>{item.title}</Text>
        <Text style={styles.listItemInfo}>URL : {item.url}</Text>
        <Text style={styles.listItemInfo}>Author : {item.author}</Text>
        <Text style={styles.listItemInfo}>Created at : {item.created_at}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default StoryListitem;

const styles = StyleSheet.create({
  listItem: {
    margin: 5,
    padding: 8,
    borderWidth: 0.5,
  },
  listItemheading: {
    fontSize: 20,
    paddingBottom: 3,
  },
  listItemInfo: {
    fontSize: 14,
    paddingBottom: 2,
  },
});
