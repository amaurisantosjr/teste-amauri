import React from 'react';
import RotaCRUD from './RotaCRUD';
import ConsultaRota from './ConsultaRota';

const App: React.FC = () => {
  return (
    <div>
      <h1>Gerenciador de Rotas</h1>
      <ConsultaRota />
      <RotaCRUD />
    </div>
  );
};

export default App;
