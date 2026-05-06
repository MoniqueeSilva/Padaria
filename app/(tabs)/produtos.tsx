import React, { useState } from 'react';
import { ThemedView } from '../../components/themed-view';
import { ThemedText } from '../../components/themed-text';
import { styles } from '../styles/produtos';
import {
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';

import { IProduto } from '../../interfaces/iProduto';

export default function Produtos() {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [modal, setModal] = useState(false);

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const tema = useColorScheme();

  // CREATE + UPDATE
  function salvar() {
    if (nome === '' || preco === '') {
      alert('Preencha nome e preço');
      return;
    }

    if (editandoId) {
      setProdutos(produtos.map(p =>
        p.id === editandoId
          ? { ...p, nome, preco: Number(preco), descricao }
          : p
      ));
    } else {
      const novo: IProduto = {
        id: Date.now().toString(),
        nome,
        preco: Number(preco),
        descricao,
      };

      setProdutos([...produtos, novo]);
    }

    limpar();
  }

  // EDITAR (clicando no item)
  function editar(produto: IProduto) {
    setNome(produto.nome);
    setPreco(produto.preco.toString());
    setDescricao(produto.descricao);

    setEditandoId(produto.id);
    setModal(true);
  }

  // DELETE
  function deletar(id: string) {
    setProdutos(produtos.filter(p => p.id !== id));
    limpar();
  }

  // RESET
  function limpar() {
    setNome('');
    setPreco('');
    setDescricao('');
    setEditandoId(null);
    setModal(false);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.titulo}>Lista de Produtos</ThemedText>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <ThemedText style={styles.vazio}>
            Nenhum produto cadastrado
          </ThemedText>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => editar(item)} activeOpacity={0.7}>
            <ThemedView style={styles.card}>
              <ThemedText style={styles.nome}>{item.nome}</ThemedText>
              <ThemedText style={styles.preco}>
                R$ {item.preco.toFixed(2)}
              </ThemedText>
              <ThemedText style={styles.descricao}>
                {item.descricao}
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
          Adicionar Produto
        </ThemedText>
      </TouchableOpacity>

      <Modal visible={modal} animationType="slide">
        <ThemedView style={styles.modal}>
          <ThemedText style={styles.titulo}>
            {editandoId ? 'Editar Produto' : 'Novo Produto'}
          </ThemedText>

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