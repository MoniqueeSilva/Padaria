import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';

import { ThemedView } from '../../components/themed-view';
import { ThemedText } from '../../components/themed-text';
import { styles } from '../styles/pedido';

export default function CreatePedido() {
  const router = useRouter();

  const [data, setData] = useState('');
  const [valorTotal, setValorTotal] = useState('');

  const tema = useColorScheme();

  function salvar() {
    if (data === '' || valorTotal === '') {
      alert('Preencha data e valor total');
      return;
    }

    console.log({
      data,
      valorTotal: Number(valorTotal),
    });

    router.back(); // fecha a tela (modal)
  }

  return (
    <ThemedView style={styles.modal}>
      <ThemedText style={styles.titulo}>
        Novo Pedido
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