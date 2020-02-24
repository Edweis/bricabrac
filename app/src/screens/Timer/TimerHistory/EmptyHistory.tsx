import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    margin: 16,
    height: '100%',
    alignItems: 'center',
  },
  centerText: { textAlign: 'center', marginBottom: 16 },
  justifyText: { textAlign: 'justify', marginBottom: 16 },
});

const EmptyHistory = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.centerText}>Bienvenu(e) sur le Timer !</Text>
    <Text style={styles.justifyText}>
      Le but de cette page est de pouvoir se motiver à lire en mesurant sa
      performance. Cela permet d&apos;éviter de se laisser distraire, et
      d&apos;améliorer sa vitesse de lecture !
    </Text>
    <Text style={styles.justifyText}>
      Pour commencer, {'\n\t'}- choisis une source,{'\n\t'}- entre la page à
      laquelle tu commences,{'\n\t'}- appuie sur start, le chrono va
      s&apos;écouler,
      {'\n\t'}- une fois ta lecture finie, appuie sur stop{'\n\t'}- rentre la
      page à laquelle tu es arrivé(e)
    </Text>
  </View>
);

export default EmptyHistory;
