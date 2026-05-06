import React, { useState } from 'react';
import { ThemedView } from '../../components/themed-view';
import { ThemedText } from '../../components/themed-text';
import { styles } from '../styles/pedido';
import {
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';

import { IPedido } from '../../interfaces/iPedido';

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [modal, setModal] = useState(false);

  const [data, setData] = useState('');
  const [valorTotal, setValorTotal] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const tema = useColorScheme();

  function salvar() {
    if (data === '' || valorTotal === '') {
      alert('Preencha data e valor total');
      return;
    }

    // UPDATE
    if (editandoId) {
      setPedidos(pedidos.map(p =>
        p.id === editandoId
          ? { ...p, data, valorTotal: Number(valorTotal) }
          : p
      ));
    } else {
      // CREATE
      const novo: IPedido = {
        id: Date.now().toString(),
        data,
        valorTotal: Number(valorTotal),
      };

      setPedidos([...pedidos, novo]);
    }

    limpar();
  }

  // EDITAR
  function editar(pedido: IPedido) {
    setData(pedido.data);
    setValorTotal(pedido.valorTotal.toString());

    setEditandoId(pedido.id);
    setModal(true);
  }

  // DELETE
  function deletar(id: string) {
    setPedidos(pedidos.filter(p => p.id !== id));
    limpar();
  }

  // RESET
  function limpar() {
    setData('');
    setValorTotal('');
    setEditandoId(null);
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
          <TouchableOpacity onPress={() => editar(item)} activeOpacity={0.7}>
            <ThemedView style={styles.card}>
              <ThemedText style={styles.nome}>
                Data: {item.data}
              </ThemedText>
              <ThemedText style={styles.preco}>
                Total: R$ {item.valorTotal.toFixed(2)}
              </ThemedText>
            </ThemedView>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setModal(true)}
      >
        <ThemedText style={styles.textoBotao}>
          Adicionar Pedido
        </ThemedText>
      </TouchableOpacity>

      <Modal visible={modal} animationType="slide">
        <ThemedView style={styles.modal}>
          <ThemedText style={styles.titulo}>
            {editandoId ? 'Editar Pedido' : 'Novo Pedido'}
          </ThemedText>

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
            <TouchableOpacity
              style={styles.botaoSalvar}
              onPress={salvar}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.textoBotao}>
                {editandoId ? 'Editar' : 'Salvar'}
              </ThemedText>
            </TouchableOpacity>

            {editandoId && (
              <TouchableOpacity
                style={styles.botaoDeletar}
                onPress={() => deletar(editandoId)}
                activeOpacity={0.7}
              >
                <ThemedText style={styles.textoBotao}>Deletar</ThemedText>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={limpar}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.textoBotao}>Cancelar</ThemedText>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}