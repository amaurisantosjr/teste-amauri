import { useState } from 'react';
import { cadastrarRota } from './services/rotaService';

const CadastrarRota = () => {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [valor, setValor] = useState(0);

  const handleCadastrar = async () => {
    try {
      await cadastrarRota(origem, destino, valor);
      alert('Rota cadastrada com sucesso!');
    } catch (error) {
      alert('Erro ao cadastrar a rota.');
    }
  };

  return (
    <div>
      <h2>Cadastrar Nova Rota</h2>
      <input
        type="text"
        placeholder="Origem"
        onChange={(e) => setOrigem(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destino"
        onChange={(e) => setDestino(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valor"
        onChange={(e) => setValor(Number(e.target.value))}
      />
      <button onClick={handleCadastrar}>Cadastrar</button>
    </div>
  );
};

export default CadastrarRota;
