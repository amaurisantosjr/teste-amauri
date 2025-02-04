import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Função para consultar a rota
export const consultarRota = async (origem: string, destino: string) => {
  try {
    // Modificando a URL para passar origem e destino como parâmetros de URL
    const response = await axios.get(`${API_URL}/consultar-rota/${origem}/${destino}`);

    // Verificando a resposta e retornando a melhor rota
    if (response.data && response.data.melhorRota) {
      return response.data.melhorRota;
    } else {
      throw new Error('Resposta inesperada da API');
    }
  } catch (error) {
    console.error('Erro ao consultar a rota', error);
    throw error; // Repassando o erro para que seja tratado em outro lugar
  }
};

// Função para cadastrar a rota
export const cadastrarRota = async (origem: string, destino: string, valor: number) => {
  try {
    // Enviando os dados via POST com cabeçalho Content-Type
    await axios.post(`${API_URL}/cadastrar-rota`, 
      { origem, destino, valor },
      {
        headers: {
          'Content-Type': 'application/json', // Definindo o tipo do conteúdo como JSON
        },
      }
    );
  } catch (error) {
    console.error('Erro ao cadastrar a rota', error);
    throw error; // Repassando o erro para que seja tratado em outro lugar
  }
};
