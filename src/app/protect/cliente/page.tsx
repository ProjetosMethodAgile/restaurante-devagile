'use client'
import React, { useState } from 'react'
import { Form } from '@/src/components/Form'

export default function Cliente() {
  // Lista e busca de clientes (exibição)
  const [clientes, setClientes] = useState([
    { nome: 'Maria Silva', logradouro: 'Rua Benedito Batalha', numero: '353', bairro: 'Centro', CEP: '05050-050', telefone: '11 9 8557-1544', frete: '1,50' },
    { nome: 'Roberto Santos', logradouro: 'Av. Teste', numero: '456', bairro: 'Centro', CEP: '05123-456', telefone: '11 9 9123-45678', frete: '2,00' },
    // … mais clientes
  ])

  // Estado de busca
  const [search, setSearch] = useState('')

  // Dados do formulário de cadastro
  const [form, setForm] = useState({
    contato: '',
    nome: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    frete: ''
  })

  // Desabilita edição de logradouro quando preenchido via CEP
  const [addressDisabled, setAddressDisabled] = useState(false)
  // Controla se a busca automática de CEP está ativa
  const [autoCepEnabled, setAutoCepEnabled] = useState(true)

  // Filtra clientes conforme termo (texto ou dígitos)
  const term = search.toLowerCase().trim()
  const digits = search.replace(/\D/g, '')
  const filteredClientes = clientes.filter(item => {
    const name = item.nome.toLowerCase()
    const address = `${item.logradouro} ${item.numero}`.toLowerCase()
    const cepDigits = item.CEP.replace(/\D/g, '')
    const phoneDigits = item.telefone.replace(/\D/g, '')

    const textMatch = term && (name.includes(term) || address.includes(term))
    const cepMatch = digits && cepDigits.includes(digits)
    const phoneMatch = digits && phoneDigits.includes(digits)

    return search === '' || textMatch || cepMatch || phoneMatch
  })

  // Controle de inputs do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    if (id === 'logradouro' && addressDisabled) {
      alert('Para editar o logradouro, por favor apague o CEP primeiro.')
      return
    }
    setForm(prev => ({ ...prev, [id]: value }))
    if (id === 'cep') {
      // ao mudar CEP, resetar logradouro e permitir edição
      setAddressDisabled(false)
      setForm(prev => ({ ...prev, logradouro: '', bairro: '' }))
    }
  }

  // Ao perder foco no CEP, busca endereço na API apenas se automático estiver habilitado
  const handleCepBlur = async () => {
    if (!autoCepEnabled) return
    const cepDigits = form.cep.replace(/\D/g, '')
    if (cepDigits.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`)
        const data = await res.json()
        if (!data.erro) {
          setForm(prev => ({
            ...prev,
            logradouro: data.logradouro,
            bairro: data.bairro,
          }))
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
        <p className='text-text-primary'> Clientes cadastrados: {filteredClientes.length}</p>
        <Form.InputALL
          type="text"
          placeholder="Buscar cliente por nome, rua, CEP ou telefone"
          id="search"
          className="p-3 w-full  border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626]"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <ul className="space-y-4 mt-4">
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
                <p className="text-sm text-gray-700">{`${item.logradouro}, ${item.numero} - ${item.bairro}`}</p>
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
      

        <Form.Root className="space-y-4 w-150 place-self-center flex flex-col">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#1F2D5C] mb-4">Cadastrar Cliente</h2>
            {/* Botão para ativar/desativar busca automática de CEP */}
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => setAutoCepEnabled(prev => !prev)}
            className={`px-4 py-2  bg-gray-200 rounded hover:cursor-pointer transition text-sm ${autoCepEnabled? 'bg-primary text-white' : 'bg-green-500'}`}
          >
            {autoCepEnabled ? 'Desativar busca automática CEP' : 'Ativar busca automática CEP'}
          </button>
        </div>
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
            id="logradouro"
            type="text"
            placeholder="Logradouro"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base"
            value={form.logradouro}
            onChange={handleChange}
            disabled={addressDisabled}
          />
          <Form.InputALL
            id="numero"
            type="text"
            placeholder="Número"
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