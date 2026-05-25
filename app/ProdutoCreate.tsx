import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import { useRouter } from 'expo-router';

import { ThemedView } from '../components/themed-view';
import { ThemedText } from '../components/themed-text';
import { styles } from './styles/produtos';

export default function ProdutoCreate() {
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');

  const tema = useColorScheme();

  function salvar() {
    if (nome === '' || preco === '') {
      alert('Preencha nome e preço');
      return;
    }

    console.log({
      nome,
      preco: Number(preco),
    });

    alert('Produto salvo!');

    router.back();
  }

  return (
    <ThemedView style={styles.modal}>
      <ThemedText style={styles.titulo}>
        Novo Produto
      </ThemedText>

      <TextInput
        placeholder="Nome do Produto"
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

      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
          style={styles.botaoSalvar}
          onPress={salvar}
        >
          <ThemedText style={styles.textoBotao}>
            Salvar
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCancelar}
          onPress={() => router.back()}
        >
          <ThemedText style={styles.textoBotao}>
            Cancelar
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}