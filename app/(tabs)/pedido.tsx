import React, { useState } from 'react';
import { ThemedView } from '../../components/themed-view';
import { ThemedText } from '../../components/themed-text';
import { styles } from '../styles/pedido';
import {
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  View,
  useColorScheme,
} from 'react-native';

import { IPedido } from '../../interfaces/iPedido';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [modal, setModal] = useState(false);

  const [data, setData] = useState('');
  const [valorTotal, setValorTotal] = useState('');

  const tema = useColorScheme();

  function adicionar() {
    if (data === '' || valorTotal === '') {
      alert('Preencha data e valor total');
      return;
    }

    const novo: IPedido = {
      id: Date.now().toString(),
      data,
      valorTotal: Number(valorTotal),
    };

    setPedidos([...pedidos, novo]);

    setData('');
    setValorTotal('');
    setModal(false);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.titulo}>Lista de Pedidos</ThemedText>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <ThemedText style={styles.vazio}>
            Nenhum pedido cadastrado
          </ThemedText>
        }
        renderItem={({ item }) => (
          <ThemedView style={styles.card}>
            <ThemedText style={styles.nome}>
              Data: {item.data}
            </ThemedText>
            <ThemedText style={styles.preco}>
              Total: R$ {item.valorTotal.toFixed(2)}
            </ThemedText>
          </ThemedView>
        )}
      />

      <TouchableOpacity style={styles.botao} onPress={() => setModal(true)}>
        <ThemedText style={styles.textoBotao}>
          Adicionar Pedido
        </ThemedText>
      </TouchableOpacity>

      <Modal visible={modal} animationType="slide">
        <ThemedView style={styles.modal}>
          <ThemedText style={styles.titulo}>Novo Pedido</ThemedText>

          <TextInput
            placeholder="Data (ex: 22/04/2026)"
            value={data}
            onChangeText={setData}
            placeholderTextColor={tema === 'dark' ? '#aaa' : '#555'}
            style={[
              styles.input,
              {
                color: tema === 'dark' ? '#fff' : '#000',
                borderColor: tema === 'dark' ? '#555' : '#ccc',
              },
            ]}
          />

          <TextInput
            placeholder="Valor Total"
            value={valorTotal}
            onChangeText={setValorTotal}
            keyboardType="numeric"
            placeholderTextColor={tema === 'dark' ? '#aaa' : '#555'}
            style={[
              styles.input,
              {
                color: tema === 'dark' ? '#fff' : '#000',
                borderColor: tema === 'dark' ? '#555' : '#ccc',
              },
            ]}
          />

          <View style={{ marginTop: 10 }}>
            <Button title="Salvar" onPress={adicionar} />
            <Button title="Cancelar" onPress={() => setModal(false)} />
          </View>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}