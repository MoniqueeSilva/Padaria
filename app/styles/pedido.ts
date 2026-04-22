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
  },

  card: {
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
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
    backgroundColor: '#75ea3f',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 6,
  },
});