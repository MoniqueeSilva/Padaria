import React, { useState } from 'react';
import { ThemedView } from '../../components/themed-view';
import { ThemedText } from '../../components/themed-text';
import { styles } from '../styles/produtos';
import {
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  View,
  useColorScheme,
} from 'react-native';

export default function Produtos() {
  const [produtos, setProdutos] = useState<any[]>([]); //lista de qualquer coisa(tipo)
  const [modal, setModal] = useState(false);

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');

  const tema = useColorScheme();

  function adicionar() {
    if (nome === '' || preco === '') {
      alert('Preencha nome e preço');
      return;
    }

    const novo = {
      id: Date.now().toString(), //id único usando data atual
      nome,
      preco,
      descricao,
    };

    setProdutos([...produtos, novo]);

    setNome('');
    setPreco('');
    setDescricao('');
    setModal(false);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.titulo}>Lista de Produtos</ThemedText>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <ThemedText style={styles.vazio}>Nenhum produto cadastrado</ThemedText>
        }

        renderItem={({ item }) => (
          <ThemedView style={styles.card}>
            <ThemedText style={styles.nome}>{item.nome}</ThemedText>
            <ThemedText style={styles.preco}>R$ {item.preco}</ThemedText>
            <ThemedText style={styles.descricao}>{item.descricao}</ThemedText>
          </ThemedView>
        )}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => setModal(true)}
      >
        <ThemedText style={styles.textoBotao}>Adicionar Produto</ThemedText>
      </TouchableOpacity>

      <Modal visible={modal} animationType="slide">
        <ThemedView style={styles.modal}>
          <ThemedText style={styles.titulo}>Novo Produto</ThemedText>
          
          <TextInput
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
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
            placeholder="Preço"
            value={preco}
            onChangeText={setPreco}
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
            placeholder="Descrição"
            value={descricao}
            onChangeText={setDescricao}
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