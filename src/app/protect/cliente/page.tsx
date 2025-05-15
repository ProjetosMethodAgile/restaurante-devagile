'use client'
import React, { useState } from 'react'
import { Form } from '@/src/components/Form'

export default function Cliente() {
  // Lista e busca de clientes (exibição)
  const [clientes, setClientes] = useState([
    { nome: 'Maria Silva', endereco: 'Rua Benedito Batalha, 353 Centro', CEP: '05050-050', telefone: '11 9 8557-1544', frete: '1,50' },
    { nome: 'Roberto Santos', endereco: 'Av. Teste, 456 Centro', CEP: '05123-456', telefone: '11 9 9123-45678', frete: '2,00' },
    // … mais clientes
  ])
  console.log(setClientes);
  
  const [search, setSearch] = useState('')

  // Dados do formulário de cadastro
  const [form, setForm] = useState({
    contato: '',
    nome: '',
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    frete: ''
  })
  const [addressDisabled, setAddressDisabled] = useState(false)

  // Filtra clientes conforme termo (texto ou dígitos)
  const term = search.toLowerCase().trim()
  const digits = search.replace(/\D/g, '')
  const filteredClientes = clientes.filter(item => {
    const name = item.nome.toLowerCase()
    const address = item.endereco.toLowerCase()
    const cepDigits = item.CEP.replace(/\D/g, '')
    const phoneDigits = item.telefone.replace(/\D/g, '')

    const textMatch = term && (name.includes(term) || address.includes(term))
    const cepMatch = digits && cepDigits.includes(digits)
    const phoneMatch = digits && phoneDigits.includes(digits)

    return search === '' || textMatch || cepMatch || phoneMatch
  })

  // Controle de inputs do formulário
  const handleChange =( e: React.ChangeEvent<HTMLInputElement> )=> {
    const { id, value } = e.target
    if (id === 'endereco' && addressDisabled) {
      alert('Para editar o endereço, por favor apague o CEP primeiro.')
      return
    }
    setForm(prev => ({ ...prev, [id]: value }))
    if (id === 'cep') {
      setAddressDisabled(false)
      setForm(prev => ({ ...prev, endereco: '' }))
    }
  }

  // Ao perder foco no CEP, busca endereço na API ViaCEP
  const handleCepBlur = async () => {
    const cepDigits = form.cep.replace(/\D/g, '')
    if (cepDigits.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`)
        const data = await res.json()
        if (!data.erro) {
          const fullAddress = `${data.logradouro}, ${data.bairro}, ${data.localidade}-${data.uf}`
          setForm(prev => ({ ...prev, endereco: fullAddress }))
          setAddressDisabled(true)
        } else {
          setAddressDisabled(false)
        }
      } catch {
        setAddressDisabled(false)
      }
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 h-auto lg:h-screen bg-gray-50">
      {/* Lista de Clientes */}
      <section className="w-full lg:w-2/3 bg-white rounded-lg shadow p-4 lg:p-6 overflow-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#1F2D5C] mb-4">Lista de clientes</h2>
        <Form.InputALL
          type="text"
          placeholder="Buscar cliente por nome, rua, CEP ou telefone"
          id="search"
          className="w-full px-3 py-2 mb-4 sm:mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626]"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <ul className="space-y-4">
          {filteredClientes.map((item, idx) => (
            <li key={idx} className="bg-white rounded border border-gray-200">
              {/* Header do card */}
              <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-t">
                <div className="flex items-baseline space-x-2">
                  <span className="font-medium text-gray-800">{item.nome}</span>
                  <span className="text-sm text-gray-600">{item.telefone}</span>
                </div>
                <div className="space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Editar</button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">Excluir</button>
                </div>
              </div>
              {/* Corpo do card */}
              <div className="px-4 py-2 space-y-1">
                <p className="text-sm text-gray-700">{item.endereco}</p>
                <p className="text-sm text-gray-700">CEP: {item.CEP}</p>
                <p className="text-sm text-gray-700">Frete: R$ {item.frete}</p>
              </div>
            </li>
          ))}
          {filteredClientes.length === 0 && (
            <li className="text-center text-gray-500 py-4">Nenhum cliente encontrado.</li>
          )}
        </ul>
      </section>

      {/* Formulário de Cadastro */}
      <section className="w-full lg:w-1/3 bg-white rounded-lg shadow p-4 lg:p-6 overflow-auto">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#1F2D5C] mb-4">Cadastrar Cliente</h2>
        <Form.Root className="space-y-4">
          <Form.InputALL
            id="contato"
            type="text"
            placeholder="Nº contato"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base"
            value={form.contato}
            onChange={handleChange}
            required
          />
          <Form.InputALL
            id="nome"
            type="text"
            placeholder="Nome do cliente"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <Form.InputALL
            id="cep"
            type="text"
            placeholder="CEP"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base"
            value={form.cep}
            onChange={handleChange}
            onBlur={handleCepBlur}
          
          />
          <Form.InputALL
            id="endereco"
            type="text"
            placeholder="Endereço"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base"
            value={form.endereco}
            onChange={handleChange}
            disabled={addressDisabled}
          />
          <Form.InputALL
            id="numero"
            type="text"
            placeholder="Número da casa"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base"
            value={form.numero}
            onChange={handleChange}
          />
          <Form.InputALL
            id="complemento"
            type="text"
            placeholder="Complemento"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base"
            value={form.complemento}
            onChange={handleChange}
          />
          <Form.InputALL
            id="frete"
            type="text"
            placeholder="Frete"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base"
            value={form.frete}
            onChange={handleChange}
          />
          <Form.ButtonChange className="w-full py-2 sm:py-3 bg-[#D72626] text-white font-semibold rounded-lg hover:bg-red-700 transition text-sm sm:text-base">
            Cadastrar
          </Form.ButtonChange>
        </Form.Root>
      </section>
    </div>
  )
}