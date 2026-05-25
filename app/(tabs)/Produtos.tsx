import React, { useState, useEffect } from 'react';
import { ThemedView } from '../../components/themed-view';
import { ThemedText } from '../../components/themed-text';
import { styles } from '../styles/produtos';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useRouter } from 'expo-router';

import {
  FlatList,
  TouchableOpacity,
} from 'react-native';

import { IProduto } from '../../interfaces/iProduto';

export default function Produtos() {

  const [produtos, setProdutos] = useState<IProduto[]>([]);

  const router = useRouter();

  useEffect(() => {
    carregarProdutos();
  }, []);

  // CARREGAR PRODUTOS
  async function carregarProdutos() {

    try {

      const dados = await AsyncStorage.getItem('@produtos');

      if (dados != null) {
        setProdutos(JSON.parse(dados));
      }

    } catch (error) {
      console.log(error);
    }
  }

  // DELETAR
  async function deletar(id: string) {

    try {

      const novaLista = produtos.filter(
        (p) => p.id !== id
      );

      setProdutos(novaLista);

      await AsyncStorage.setItem(
        '@produtos',
        JSON.stringify(novaLista)
      );

    } catch (error) {
      console.log(error);
    }
  }

  return (

    <ThemedView style={styles.container}>

      <ThemedText style={styles.titulo}>
        Lista de Produtos
      </ThemedText>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}

        ListEmptyComponent={
          <ThemedText style={styles.vazio}>
            Nenhum produto cadastrado
          </ThemedText>
        }

        renderItem={({ item }) => (

          <ThemedView style={styles.card}>

            <TouchableOpacity
              activeOpacity={0.7}
            >

              <ThemedText style={styles.nome}>
                {item.nome}
              </ThemedText>

              <ThemedText style={styles.preco}>
                R$ {item.preco.toFixed(2)}
              </ThemedText>

              <ThemedText style={styles.descricao}>
                {item.descricao}
              </ThemedText>

            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoDeletar}
              onPress={() => deletar(item.id)}
            >

              <ThemedText style={styles.textoBotao}>
                Deletar
              </ThemedText>

            </TouchableOpacity>

          </ThemedView>
        )}
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.push('/ProdutoCreate')}
      >

        <ThemedText style={styles.textoBotao}>
          Adicionar Produto
        </ThemedText>

      </TouchableOpacity>

    </ThemedView>
  );
}