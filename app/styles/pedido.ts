import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  vazio: {
    marginTop: 10,
    opacity: 0.6,
    textAlign: 'center',
  },

  card: {
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#1c1c1c', // melhor no dark
  },

  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  preco: {
    marginTop: 4,
  },

  descricao: {
    marginTop: 4,
    opacity: 0.7,
  },

  botao: {
    backgroundColor: '#bc9425',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  modal: {
    flex: 1,
    padding: 20,
  },

  input: {
    borderWidth: 1,
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
  },

  // 🔥 BOTÕES DO MODAL
  botaoSalvar: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  botaoEditar: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  botaoDeletar: {
    backgroundColor: '#f44336',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  botaoCancelar: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
});