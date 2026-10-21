import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

const Pagine = {
  A: 'A',
  B: 'B'
};

// --- 1. Primo Custom Hook: Gestione Navigazione e Input ---
function useAppLogic() {
  const [pagina, setPagina] = useState(Pagine.A);
  const [valore, setValore] = useState('');

  function vaiA() {
    setPagina(Pagine.A);
  }

  function vaiB() {
    setPagina(Pagine.B);
  }

  return { pagina, valore, setValore, vaiA, vaiB };
}

// --- 2. Secondo Custom Hook: Gestione della Lista di Numeri ---
function useListaNumeri(valoreIniziale) {
  const limiteIniziale = valoreIniziale ? parseInt(valoreIniziale) : 0;

  const [listaNumeri, setListaNumeri] = useState(() => {
    const arr = [];
    for (let i = 0; i <= limiteIniziale; i++) {
      arr.push(i);
    }
    return arr;
  });

  function aggiungiElemento() {
    const ultimoNumero = listaNumeri.length > 0 ? listaNumeri[listaNumeri.length - 1] : -1;
    setListaNumeri([...listaNumeri, ultimoNumero + 1]);
  }

  function rimuoviElemento() {
    if (listaNumeri.length > 0) {
      setListaNumeri(listaNumeri.slice(0, listaNumeri.length - 1));
    }
  }

  return { listaNumeri, aggiungiElemento, rimuoviElemento };
}

// --- Componente App ---
export default function App() {
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

// --- Componenti delle Pagine ---
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
  const { listaNumeri, aggiungiElemento, rimuoviElemento } = useListaNumeri(valore);
  const limite = valore ? parseInt(valore) : 0;

  return (
    <ScrollView contentContainerStyle={styles.containerScroll}>
      <Text style={styles.title}>Pagina B</Text>
      <Text style={styles.text}>
        Numero inserito in A: {valore ? valore : 'Nessun numero inserito'}
      </Text>

      <Menu onAggiungi={aggiungiElemento} onRimuovi={rimuoviElemento} />

      <View style={styles.listContainer}>
        <Text style={styles.subTitle}>Elenco dei numeri:</Text>
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

function Menu({ onAggiungi, onRimuovi }) {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuButtonWrapper}>
        <Button title="Aggiungi in fondo" onPress={onAggiungi} />
      </View>
      <View style={styles.menuButtonWrapper}>
        <Button title="Rimuovi dal fondo" color="#d9534f" onPress={onRimuovi} />
      </View>
    </View>
  );
}

// --- Stili Grafici ---
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
    paddingVertical: 50,
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
    marginBottom: 15,
  },
  listContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
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
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 15,
    width: '100%',
  },
  menuButtonWrapper: {
    marginHorizontal: 5,
  },
});