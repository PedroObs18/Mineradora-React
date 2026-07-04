import React, { useState, useEffect } from 'react';
import { funcionarioService } from '../services/api';

export default function Funcionarios() {
    const [funcionarios, setFuncionarios] = useState([]);

    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [cidade, setCidade] = useState('');
    const [salario, setSalario] = useState('');

    useEffect(() => {
        carregarFuncionarios();
    }, []);

    const carregarFuncionarios = async () => {
        try {
            const funcionarios = await funcionarioService.listar();
            setFuncionarios(Array.isArray(funcionarios) ? funcionarios : []);
        } catch (error) {
            console.error("Erro ao buscar funcionários:", error);
            setFuncionarios([]);
        }
    };

    const cadastrar = async () => {
        if (
            !nome.trim() ||
            !cargo.trim() ||
            !cidade.trim() ||
            salario === ''
        ) {
            return alert("Preencha todos os campos!");
        }

        try {
            await funcionarioService.cadastrar({
                nome,
                cargo,
                cidade,
                salario: Number(salario)
            });

            setNome('');
            setCargo('');
            setCidade('');
            setSalario('');

            carregarFuncionarios();
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao cadastrar funcionário.");
        }
    };
    const excluir = async (id) => {
        const confirmar = window.confirm(
            "Deseja realmente excluir este funcionário?"
        );

        if (!confirmar) return;

        try {
            await funcionarioService.excluir(id);
            carregarFuncionarios();
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div>
            <h2>Gestão de Funcionários</h2>

            <div
                style={{
                    marginBottom: '20px',
                    border: '1px solid #ccc',
                    padding: '10px'
                }}
            >
                <h3>Novo Funcionário</h3>

                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <input
                    type="text"
                    placeholder="Cargo"
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <input
                    type="text"
                    placeholder="Cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <input
                    type="number"
                    placeholder="Salário"
                    value={salario}
                    onChange={(e) => setSalario(e.target.value)}
                    style={{ marginRight: '10px' }}
                />

                <button onClick={cadastrar}>
                    Cadastrar
                </button>
            </div>

            <h3>Funcionários Cadastrados</h3>

            {funcionarios.length > 0 ? (
                <ul>
                {funcionarios.map((funcionario) => (
                    <li key={funcionario.id}>
                        {funcionario.nome} - {funcionario.cargo} - {funcionario.cidade} - R$ {funcionario.salario.toFixed(2)}

                        <button
                            onClick={() => excluir(funcionario.id)}
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
                <p>Nenhum funcionário cadastrado.</p>
            )}
        </div>
    );
}