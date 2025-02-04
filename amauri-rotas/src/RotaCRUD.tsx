import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

interface Rota {
  id?: number;
  origem: string;
  destino: string;
  valor: number;
}

const RotaCRUD: React.FC = () => {
  const [rotas, setRotas] = useState<Rota[]>([]);
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [valor, setValor] = useState<number | ''>('');
  const [editando, setEditando] = useState<number | null>(null);


  useEffect(() => {
    listarRotas();
  }, []);

  const listarRotas = async () => {
    try {
      const response = await axios.get<Rota[]>(`${API_URL}/rotas`);
      setRotas(response.data);
    } catch (error) {
      console.error('Erro ao buscar as rotas', error);
    }
  };


  const salvarRota = async () => {
    if (!origem || !destino || valor === '') {
      alert('Preencha todos os campos!');
      return;
    }

    const novaRota: Rota = { origem, destino, valor: Number(valor) };

    try {
      if (editando !== null) {
        
        await axios.put(`${API_URL}/rotas/${editando}`, novaRota);
        setEditando(null);
      } else {
       
        await axios.post(`${API_URL}/cadastrar-rota`, novaRota);
      }

   
      listarRotas();
      limparCampos();
    } catch (error) {
      console.error('Erro ao salvar rota', error);
    }
  };


  const excluirRota = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta rota?')) {
      try {
        await axios.delete(`${API_URL}/rotas/${id}`); // Passa o ID da rota
        listarRotas();
      } catch (error) {
        console.error('Erro ao excluir rota', error);
      }
    }
  };


  const editarRota = (rota: Rota) => {
    setOrigem(rota.origem);
    setDestino(rota.destino);
    setValor(rota.valor);
    setEditando(rota.id || null);
  };


  const limparCampos = () => {
    setOrigem('');
    setDestino('');
    setValor('');
    setEditando(null);
  };

  return (
    <div>
      <h2>Gerenciamento de Rotas</h2>
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
      <input
        type="number"
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(Number(e.target.value))}
      />
      <button onClick={salvarRota}>{editando !== null ? 'Atualizar' : 'Adicionar'}</button>
      {editando !== null && <button onClick={limparCampos}>Cancelar</button>}

      <h3>Rotas Cadastradas</h3>
      <table border={1}>
        <thead>
          <tr>
            <th>Origem</th>
            <th>Destino</th>
            <th>Valor ($)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {rotas.map((rota) => (
            <tr key={rota.id}>
              <td>{rota.origem}</td>
              <td>{rota.destino}</td>
              <td>{rota.valor}</td>
              <td>
                <button onClick={() => editarRota(rota)}>Editar</button>
                <button onClick={() => excluirRota(rota.id!)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RotaCRUD;
