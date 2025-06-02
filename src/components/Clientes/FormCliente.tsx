'use client'
import { Form } from "@/src/components/UI/Form";
import PrimaryButton from "@/src/components/UI/PrimaryButton";
import SecondaryButton from "@/src/components/UI/SecondaryButton";
import { useState, useEffect, useActionState } from "react";
import { handleChangeCep } from "@/src/actions/api-externas/cep/getcep";
import { FormClienteData } from "@/src/types/cliente/clientType";
import { registerCli } from "@/src/app/protect/cliente/action-cliente/registercli";
import { ComponenteClientesState } from "./ContainerClientes";

const estados = [
  { value: "", label: "Estado" },
  { value: "SP", label: "SP" },
  { value: "RJ", label: "RJ" },
  /* … outros estados … */
];

export interface FormClienteProps {
  dataAlteredUser: ComponenteClientesState[];
  setDataAlteredUser: React.Dispatch<
    React.SetStateAction<ComponenteClientesState[]>
  >;
}

export default function FormCliente({
  dataAlteredUser,
  setDataAlteredUser,
}: FormClienteProps) {
  const [addressDisabled, setAddressDisabled] = useState(false);
  const [autoCepEnabled, setAutoCepEnabled] = useState(true);
  const [form, setForm] = useState<FormClienteData>({
    contato: "",
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    CEP: "",
    logradouro: "",
    numeroInt: "",
    complemento: "",
    bairro: "",
    cidade: "",
    Estado: "",
    frete: "",
    observacao: "",
  });

  // índice do cliente que está sendo editado, ou null se for novo
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // intercepta o registro da action (pode ser usado para chamadas API)
  const [registerState, submitForm] = useActionState<FormClienteData>(
    registerCli,
    form
  );

  // Quando dataAlteredUser muda, se encontrar um item com status=true, entramos em modo edição
  useEffect(() => {
    const idx = dataAlteredUser.findIndex((u) => u.status);
    if (idx >= 0) {
      const toEdit = dataAlteredUser[idx];
      setForm({
        nome:      toEdit.nome,
        email:     toEdit.email,
        cpf:       toEdit.cpf,
        telefone:  toEdit.telefone,
        CEP:       toEdit.CEP,
        logradouro:toEdit.logradouro,
        numeroInt: toEdit.numeroInt,
        complemento: toEdit.complemento,
        bairro:    toEdit.bairro,
        cidade:    toEdit.cidade,
        Estado:    toEdit.Estado,
        frete:     toEdit.frete,
        observacao:toEdit.observacao,
      });
      setEditIndex(idx);
      setAddressDisabled(true);
    }
  }, [dataAlteredUser]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    if (id === "logradouro" && addressDisabled) {
      alert("Para editar o logradouro, apague o CEP primeiro.");
      return;
    }
    setForm((prev) => ({ ...prev, [id]: value }));
    if (id === "CEP") {
      setAddressDisabled(false);
      setForm((prev) => ({
        ...prev,
        logradouro: "",
        bairro: "",
        cidade: "",
        Estado: "",
      }));
    }
  };


  const handleCepBlur = async () => {
    if (!autoCepEnabled) return;
    const cepDigits = form.CEP.replace(/\D/g, "");
    if (cepDigits.length === 8) {
      try {
        const res = await handleChangeCep(cepDigits);
        const data = await res.json();
        if (!data.erro) {
          const { logradouro, bairro, localidade, uf } = data;
          setForm((prev) => ({
            ...prev,
            logradouro,
            bairro,
            cidade: localidade,
            Estado: uf,
          }));
          setAddressDisabled(true);
        } else {
          setAddressDisabled(false);
        }
      } catch {
        setAddressDisabled(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // registra via action (API) se desejar
    submitForm();

    if (editIndex !== null) {
      // atualizar item existente
      const updated = [...dataAlteredUser];
      updated[editIndex] = { ...form, status: false };
      setDataAlteredUser(updated);
    } else {
      // adicionar novo cliente
      setDataAlteredUser([
        ...dataAlteredUser,
        { ...form, status: false },
      ]);
    }

     handleCancel()
    setEditIndex(null);
    setAddressDisabled(false);
  };

function handleCancel() {
    // Limpa o formulário e sai do modo edição
    setForm({
      contato: "",
      nome: "",
      email: "",
      cpf: "",
      telefone: "",
      CEP: "",
      logradouro: "",
      numeroInt: "",
      complemento: "",
      bairro: "",
      cidade: "",
      Estado: "",
      frete: "",
      observacao: "",
    });
    setEditIndex(null);
    setAddressDisabled(false);
    // Atualiza o estado para remover o status de edição
    const updated = dataAlteredUser.map((item) => ({ ...item, status: false }));
    setDataAlteredUser(updated);
}
  return (
    <Form.Root onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-xl font-semibold">
        {editIndex !== null ? "Alterar cliente" : "Cadastrar cliente"}
      </h1>

      <div className="flex justify-start">
        <SecondaryButton
          type="button"
          onClick={() => setAutoCepEnabled((p) => !p)}
          className={`${autoCepEnabled?"bg-primary hover:bg-red-600 text-white":"bg-blue-500 text-white hover:bg-blue-600"}`}
          text={
            autoCepEnabled
              ? "Desativar busca automática CEP"
              : "Ativar busca automática CEP"
          }
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <Form.InputText
          id="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <Form.InputText
          id="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
        />
        <Form.InputText
          id="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
        />
        <Form.InputText
          id="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <Form.InputText
          id="CEP"
          placeholder="CEP"
          value={form.CEP}
          onChange={handleChange}
          onBlur={handleCepBlur}
        />
        <Form.InputText
          id="logradouro"
          placeholder="Logradouro"
          value={form.logradouro}
          onChange={handleChange}
          disabled={addressDisabled}
          required
        />
        <Form.InputText
          id="numeroInt"
          placeholder="Número casa."
          value={form.numeroInt}
          onChange={handleChange}
        />
        <Form.InputText
          id="complemento"
          placeholder="Complemento"
          value={form.complemento}
          onChange={handleChange}
          className="col-span-full sm:col-span-2"
        />
        <Form.InputText
          id="bairro"
          placeholder="Bairro"
          value={form.bairro}
          onChange={handleChange}
          className="col-span-full sm:col-span-2"
          required
        />
        <Form.InputText
          id="cidade"
          placeholder="Cidade"
          value={form.cidade}
          onChange={handleChange}
          disabled={addressDisabled}
        />
        <select
          id="Estado"
          value={form.Estado}
          onChange={handleChange}
          disabled={addressDisabled}
          className="w-full border rounded px-3 py-2 bg-white disabled:opacity-50"
        >
          {estados.map((st) => (
            <option key={st.value} value={st.value}>
              {st.label}
            </option>
          ))}
        </select>
        <Form.InputText
          id="frete"
          placeholder="Frete (R$)"
          value={form.frete}
          onChange={handleChange}
        />
        <Form.InputText
          id="observacao"
          placeholder="Observação"
          value={form.observacao}
          onChange={handleChange}
          type="textarea"
          className="col-span-full"
        />
      </div>

      <PrimaryButton
        type="submit"
        text={editIndex !== null ? "Alterar" : "Cadastrar"}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white"
      />
      {dataAlteredUser.map((item,idx)=>item.status?  <PrimaryButton
        key={idx}
        type="submit"
        text={"Cancelar"}
        className="w-full" 
        onClick={(() => {handleCancel()})}
        
        
        />:"" )}
    </Form.Root>
  );
}
