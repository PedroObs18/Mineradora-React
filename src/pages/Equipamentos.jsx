import React, { useState, useEffect } from 'react';
import { equipamentoService } from '../services/api';

export default function Equipamentos() {
    const [equipamentos, setEquipamentos] = useState([]);
    const [nome, setNome] = useState('');
    const [setor, setSetor] = useState('');

    useEffect(() => {
        carregarEquipamentos();
    }, []);

    const carregarEquipamentos = async () => {
        try {
            const equipamentos = await equipamentoService.listar();
            setEquipamentos(Array.isArray(equipamentos) ? equipamentos : []);
        } catch (error) {
            console.error("Erro ao buscar equipamentos", error);
            setEquipamentos([]);
        }
    };

    const cadastrar = async () => {
        if (!nome || !setor) {
            return alert("Preencha todos os campos!");
        }

        try {
            await equipamentoService.cadastrar({ nome, setor });
            setNome('');
            setSetor('');
            carregarEquipamentos();
        } catch (error) {
            console.error("Erro ao cadastrar", error);
        }
    };
    const excluir = async (id) => {
        const confirmar = window.confirm(
            "Deseja realmente excluir este equipamento?"
        );

        if (!confirmar) return;

        try {
            await equipamentoService.excluir(id);
            carregarEquipamentos();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Gestão de Equipamentos</h2>

            <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>Novo Equipamento</h3>

                <input
                    type="text"
                    placeholder="Nome do Equipamento"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <input
                    type="text"
                    placeholder="Setor (Ex: Extração)"
                    value={setor}
                    onChange={(e) => setSetor(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <button onClick={cadastrar}>Cadastrar</button>
            </div>

            <h3>Equipamentos Cadastrados</h3>

            <ul>
    {equipamentos.map((equipamento) => (
        <li key={equipamento.id}>
            {equipamento.nome} - {equipamento.setor}

            <button
                onClick={() => excluir(equipamento.id)}
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
        </div>
    );
}