import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

// Componente dedicato per la schermata dei dettagli (Esercizio 2)
function UserDetails({ userId, onBack }) {
  const [user, setUser] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(true);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        // Chiamata per scaricare i dettagli specifici dell'utente selezionato
        const response = await fetch(`https://develop.ewlab.di.unimi.it/mc/exercises/user/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Errore nel recupero dei dettagli:', error);
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchUserDetail();
  }, [userId]); // Si attiva ogni volta che cambia l'ID dell'utente

  if (loadingDetail) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailTitle}>Dettagli Utente</Text>
      <Text style={styles.detailText}>ID: {user?.id}</Text>
      <Text style={styles.detailText}>Nome: {user?.nome}</Text>
      <Text style={styles.detailText}>Cognome: {user?.cognome}</Text>
      {/* Eventuali altri campi presenti nell'oggetto utente */}

      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>Torna alla lista</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Esercizio 1: Caricamento della lista all'avvio
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://develop.ewlab.di.unimi.it/mc/exercises/user');
        const data = await response.json();
        setLista(data);
      } catch (error) {
        console.error('Errore durante il recupero dei dati:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {selectedUserId === null ? (
        // Schermata 1: Lista degli utenti
        loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={lista}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.userItem}
                onPress={() => setSelectedUserId(item.id)}
              >
                <Text style={styles.userName}>{item.nome} {item.cognome}</Text>
              </TouchableOpacity>
            )}
          />
        )
      ) : (
        // Schermata 2: Dettagli utente selezionato
        <UserDetails
          userId={selectedUserId}
          onBack={() => setSelectedUserId(null)}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  detailContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  detailTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});