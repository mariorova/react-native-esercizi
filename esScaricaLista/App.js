import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';

export default function App() {
  const [lista, setLista] = useState([])
  const [loading, setLoading] = useState(true)
 useEffect(() => {
   const fetchData = async () => {
     try {
       // 1. Fai la chiamata fetch usando l'URL fornito dal professore
       const response = await fetch('https://develop.ewlab.di.unimi.it/mc/exercises/user');
       // 2. Converti la risposta in formato JSON
       const data = await response.json();

       // 3. Aggiorna lo stato della lista con i dati ricevuti
       setLista(data);

     } catch (error) {
       console.error('Errore durante il recupero dei dati:', error);
     } finally {
       // 4. In ogni caso (successo o errore), disattiva il caricamento
       setLoading(false);
     }
   };

   fetchData();
 }, []); // Array di dipendenze vuoto: viene eseguito solo al montaggio

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={lista}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.userItem}>
              <Text style={styles.userName}>{item.nome} {item.cognome}</Text>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
});
