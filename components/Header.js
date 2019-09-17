import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = props => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingTop: 20,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Header;
