import React, { useState } from 'react';
import './App.css';

import Menu from './components/Menu';

import Inicio from './pages/Inicio';
import Equipamentos from './pages/Equipamentos';
import Cidades from './pages/Cidades';
import Funcionarios from './pages/Funcionarios';
import Servicos from './pages/Servicos';

function App() {

    const [pagina, setPagina] = useState('inicio');

    return (

        <div className="app">

            <aside className="sidebar">

                <h2>🏭 Mineradora</h2>

                <Menu setPagina={setPagina} />

            </aside>

            <main className="content">

                <header className="header">
                    <h1>Sistema de Gestão da Mineradora</h1>
                    <p>Controle de Equipamentos, Funcionários, Cidades e Serviços</p>
                </header>

                <div className="card">

                    {pagina === 'inicio' && <Inicio />}
                    {pagina === 'equipamentos' && <Equipamentos />}
                    {pagina === 'cidades' && <Cidades />}
                    {pagina === 'funcionarios' && <Funcionarios />}
                    {pagina === 'servicos' && <Servicos />}

                </div>

            </main>

        </div>

    );

}

export default App;