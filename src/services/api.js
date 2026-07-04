import supabase from "./supabase";


export const equipamentoService = {

    async listar() {

        const { data, error } = await supabase
            .from("equipamentos")
            .select("*")
            .order("id");

        if (error) throw error;

        return data;
    },

    async cadastrar(equipamento) {

        const { error } = await supabase
            .from("equipamentos")
            .insert([equipamento]);

        if (error) throw error;
    },

    async atualizar(id, equipamento) {

        const { error } = await supabase
            .from("equipamentos")
            .update(equipamento)
            .eq("id", id);

        if (error) throw error;
    },

    async excluir(id) {

        const { error } = await supabase
            .from("equipamentos")
            .delete()
            .eq("id", id);

        if (error) throw error;
    }

};


export const cidadeService = {

    async listar() {

        const { data, error } = await supabase
            .from("cidades")
            .select("*")
            .order("id");

        if (error) throw error;

        return data;
    },

    async cadastrar(cidade) {

        const { error } = await supabase
            .from("cidades")
            .insert([cidade]);

        if (error) throw error;
    },

    async atualizar(id, cidade) {

        const { error } = await supabase
            .from("cidades")
            .update(cidade)
            .eq("id", id);

        if (error) throw error;
    },

    async excluir(id) {

        const { error } = await supabase
            .from("cidades")
            .delete()
            .eq("id", id);

        if (error) throw error;
    }

};


export const funcionarioService = {

    async listar() {

        const { data, error } = await supabase
            .from("funcionarios")
            .select("*")
            .order("id");

        if (error) throw error;

        return data;
    },

    async cadastrar(funcionario) {

        const { error } = await supabase
            .from("funcionarios")
            .insert([funcionario]);

        if (error) throw error;
    },

    async atualizar(id, funcionario) {

        const { error } = await supabase
            .from("funcionarios")
            .update(funcionario)
            .eq("id", id);

        if (error) throw error;
    },

    async excluir(id) {

        const { error } = await supabase
            .from("funcionarios")
            .delete()
            .eq("id", id);

        if (error) throw error;
    }

};

export const servicoService = {

    async listar() {

        const { data, error } = await supabase
            .from("servicos")
            .select("*")
            .order("id");

        if (error) throw error;

        return data;
    },

    async cadastrar(servico) {

        const { error } = await supabase
            .from("servicos")
            .insert([servico]);

        if (error) throw error;
    },

    async atualizar(id, servico) {

        const { error } = await supabase
            .from("servicos")
            .update(servico)
            .eq("id", id);

        if (error) throw error;
    },

    async excluir(id) {

        const { error } = await supabase
            .from("servicos")
            .delete()
            .eq("id", id);

        if (error) throw error;
    }

};