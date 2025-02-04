import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface RotaResponse {
  melhorRota: string;
  custo: number;
}

const ConsultaRota: React.FC = () => {
  const [origem, setOrigem] = useState<string>('');
  const [destino, setDestino] = useState<string>('');
  const [resultado, setResultado] = useState<string | null>(null);

  const consultarRota = async () => {
    try {
      const response = await axios.get<RotaResponse>(`${API_URL}/consultar-rota/${origem}/${destino}`);
      setResultado(`Melhor Rota: ${response.data.melhorRota} ao custo de $${response.data.custo}`);
    } catch (error) {
      console.error('Erro ao consultar a rota', error);
      setResultado('Erro ao buscar a rota. Verifique os dados inseridos.');
    }
  };

  return (
    <div>
      <h2>Consulta de Rota</h2>
      <input
        type="text"
        placeholder="Origem"
        value={origem}
        onChange={(e) => setOrigem(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destino"
        value={destino}
        onChange={(e) => setDestino(e.target.value)}
      />
      <button onClick={consultarRota}>Consultar Rota</button>
      {resultado && <p>{resultado}</p>}
    </div>
  );
};

export default ConsultaRota;
