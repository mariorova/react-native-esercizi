import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

const Pagine = {
  A: 'A',
  B: 'B'
};

// --- Custom Hook per la logica di App ---
function useAppLogic() {
  const [pagina, setPagina] = useState(Pagine.A);
  const [valore, setValore] = useState('');

  function vaiA() {
    setPagina(Pagine.A);
  }

  function vaiB() {
    setPagina(Pagine.B);
  }

  return {
    pagina,
    valore,
    setValore,
    vaiA,
    vaiB
  };
}

export default function App() {
  // Utilizziamo il Custom Hook
  const { pagina, valore, setValore, vaiA, vaiB } = useAppLogic();

  switch (pagina) {
    case Pagine.A:
      return <PageA valore={valore} AggiornaNumero={setValore} vaiB={vaiB} />;
    case Pagine.B:
      return <PageB valore={valore} vaiA={vaiA} />;
    default:
      return null;
  }
}

function PageA({ valore, AggiornaNumero, vaiB }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pagina A</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={AggiornaNumero}
          value={valore}
          placeholder="Scrivi un numero"
          placeholderTextColor="#888"
        />
      </View>
      <Button title="Vai a pagina B" onPress={vaiB} />
    </View>
  );
}

function PageB({ valore, vaiA }) {
  const limite = valore ? parseInt(valore) : 0;
  const listaNumeri = [];

  for (let i = 0; i < limite; i++) {
    listaNumeri.push(i);
  }

  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <Text style={styles.title}>Pagina B</Text>
      <Text style={styles.text}>
        Numero inserito: {valore ? valore : 'Nessun numero inserito'}
      </Text>

      <View style={styles.listContainer}>
        <Text style={styles.subTitle}>Elenco dei numeri da 0 a {limite}:</Text>
        {listaNumeri.map((n) => (
          <CellaLista key={n} numero={n} />
        ))}
      </View>

      <Button title="Vai a pagina A" onPress={vaiA} />
    </ScrollView>
  );
}

function CellaLista({ numero }) {
  return (
    <View style={styles.cellContainer}>
      <Text style={styles.cellTitle}>{numero}</Text>
      <Text style={styles.cellText}>il suo quadrato è: {numero * numero}</Text>
    </View>
  );
}

// --- Stili grafici ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  containerScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    paddingVertical: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  listContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  cellContainer: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f0f4f8',
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  cellTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cellText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});