import React, { useState, useEffect } from 'react';
import { cidadeService } from '../services/api';

export default function Cidades() {
    const [cidades, setCidades] = useState([]);
    const [nome, setNome] = useState('');

    useEffect(() => {
        carregarCidades();
    }, []);

    const carregarCidades = async () => {
        try {
            const cidades = await cidadeService.listar();
            setCidades(Array.isArray(cidades) ? cidades : []);
        } catch (error) {
            console.error("Erro ao buscar cidades:", error);
            setCidades([]);
        }
    };

    const cadastrar = async () => {
        if (!nome.trim()) {
            return alert("Preencha o nome da cidade!");
        }

        try {
            await cidadeService.cadastrar({ nome });
            setNome('');
            carregarCidades();
        } catch (error) {
    console.error(error);
    alert(error.message);

    if (error.details) console.log("Details:", error.details);
    if (error.hint) console.log("Hint:", error.hint);
        }
    };

    const excluir = async (id) => {
    const confirmar = window.confirm(
        "Deseja realmente excluir esta cidade?"
    );

    if (!confirmar) return;

    try {
        await cidadeService.excluir(id);
        carregarCidades();
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
    };

    return (
        <div>
            <h2>Gestão de Cidades</h2>

            <div
                style={{
                    marginBottom: '20px',
                    border: '1px solid #ccc',
                    padding: '10px'
                }}
            >
                <h3>Nova Cidade</h3>

                <input
                    type="text"
                    placeholder="Nome da Cidade"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <button onClick={cadastrar}>
                    Cadastrar
                </button>
            </div>

            <h3>Cidades cadastradas</h3>

            {cidades.length > 0 ? (
                <ul>
                    {cidades.map((cidade) => (
                    <li key={cidade.id}>
                    {cidade.nome}

                         <button
                    onClick={() => excluir(cidade.id)}
                    style={{
                    marginLeft: "10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "5px 10px",
                    cursor: "pointer"
                }}
            >
                Excluir
                </button>
                </li>
             ))}
             </ul>
            ) : (
                <p>Nenhuma cidade cadastrada.</p>
            )}
        </div>
    );
}
