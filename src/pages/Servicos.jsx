import React, { useState, useEffect } from 'react';
import { servicoService } from '../services/api';

export default function Servicos() {
    const [servicos, setServicos] = useState([]);

    const [descricao, setDescricao] = useState('');
    const [equipamento, setEquipamento] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        carregarServicos();
    }, []);

    const carregarServicos = async () => {
        try {
            const servicos = await servicoService.listar();
            setServicos(Array.isArray(servicos) ? servicos : []);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
            setServicos([]);
        }
    };

    const cadastrar = async () => {
        if (
            !descricao.trim() ||
            !equipamento.trim() ||
            !status.trim()
        ) {
            return alert("Preencha todos os campos!");
        }

        try {
            await servicoService.cadastrar({
                descricao,
                equipamento,
                status
            });

            setDescricao('');
            setEquipamento('');
            setStatus('');

            carregarServicos();
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao cadastrar serviço.");
        }
    };
    const excluir = async (id) => {
        const confirmar = window.confirm(
            "Deseja realmente excluir este serviço?"
        );

        if (!confirmar) return;

        try {
            await servicoService.excluir(id);
            carregarServicos();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Gestão de Serviços</h2>

            <div
                style={{
                    marginBottom: '20px',
                    border: '1px solid #ccc',
                    padding: '10px'
                }}
            >
                <h3>Novo Serviço</h3>

                <input
                    type="text"
                    placeholder="Descrição"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <input
                    type="text"
                    placeholder="Equipamento"
                    value={equipamento}
                    onChange={(e) => setEquipamento(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <button onClick={cadastrar}>
                    Cadastrar
                </button>
            </div>

            <h3>Serviços Cadastrados</h3>

            {servicos.length > 0 ? (
                <ul>
                {servicos.map((servico) => (
                    <li key={servico.id}>
                        {servico.descricao} - {servico.equipamento} - {servico.status}

                        <button
                            onClick={() => excluir(servico.id)}
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
                <p>Nenhum serviço cadastrado.</p>
            )}
        </div>
    );
}