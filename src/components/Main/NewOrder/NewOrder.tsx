"use client";

import { Minus, Pen, Plus, Search, SearchIcon, ShoppingBasket, ShoppingCart, Trash, Trash2, X } from "lucide-react";
import { Form } from "../../Form";
import { useGlobalContext } from "@/src/context.ts/globalContext";
import SecondaryButton from "@/src/utils/UI/SecondaryButton";


export default function NewOrder() {
  const { closeGlobalModal } = useGlobalContext()
  return (
    <section className="bg-white shadow-md max-h-[95%] w-[95%]  overflow-y-auto rounded-xl p-8">
      <div className="flex justify-between ">
        <h2 className="font-bold mb-2 text-2xl text-secondary ">Novo Pedido</h2>
        <X className="cursor-pointer" onClick={closeGlobalModal} />
      </div>
      <Form.Root className="w-full">
        <div className="grid grid-cols-3 w-full gap-6">
          <Form.Section className="w-full" title="Informações do Cliente">

            <Form.InputALL
              id="cliente"
              label="Cliente"
              type="text"
              placeholder="Nome ou CPF"
              icon={Search}
              className="span-full"
            />
            <Form.InputALL
              id="telefone"
              label="Telefone"
              type="text"
              placeholder="(11) 9 9999-9999"

              disabled
            />
            <Form.InputALL
              id="endereco"
              label="Endereço"
              type="text"
              placeholder="Rua, Número"
              disabled
            />
            <Form.InputALL
              id="bairro"
              label="Bairro"
              type="text"
              placeholder="Bairro"
              disabled
            />
            <Form.InputALL
              id="cidade"
              label="Cidade"
              type="text"
              placeholder="Cidade, Estado"
              disabled
            />
            <Form.InputALL
              id="complemento"
              label="Complemento"
              type="text"
              placeholder="Apto, Bloco"
              disabled
            />
            <textarea
              className="w-full mt-4 active:border-primary px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D72626] text-sm sm:text-base disabled:bg-gray-100 disabled:hover:border-gray-300 disabled:transition-none text-text-secondary active:scale-102 ease-out  hover:border-primary/70 transition"
              name="observacao"
              id="observacao"
              placeholder="Observações"
            ></textarea>
          </Form.Section>
          <Form.Section className="col-span-2 h-full" title="Itens do Pedido">
            <div className="flex items-center justify-between">
              <Form.InputALL
                id="produto"
                label="Produto"
                type="text"
                placeholder="Nome, SKU, codigo de barras..."
                icon={Search}
                className="w-100"
                iconPosition="left"
              />
              <SecondaryButton text="Buscar Item" className="bg-secondary self-end text-blue-50 " icon={ShoppingBasket} />
            </div>
            <div className="bg-gray-50 h-70 flex flex-col gap-2 mt-4 rounded-md p-4">
              <h4 className="text-secondary">Itens Adicionados</h4>
              {/*    <div className="flex items-center gap-3 ">
                <ShoppingCart />
                <h4>Nenhum produto Adicionado</h4>
              </div> */}
              <div className="bg-gray-100 w-full flex items-center gap-4 p-4 rounded-md">
                <div className="flex *:size-5 gap-2">
                  <Pen className="text-secondary" />
                  <Trash2 className="text-primary" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4>Frango a Parmesiana - Media</h4>
                  <p className="text-gray-400 font-normal">Arroz, Feijão, Salada, Frango a Parmesiana</p>
                  <p className="font-normal text-gray-400">Obs: Sem Feijão</p>
                </div>
                <div className="ml-auto flex gap-2 items-center">
                  <Minus size={22} className="bg-primary text-red-50 rounded-full p-1" />
                  <span>2</span>
                  <Plus size={22} className="bg-primary text-red-50 rounded-full p-1" />
                </div>

              </div>

            </div>
            <div className="flex flex-col *:flex *:justify-between gap-2 mt-4 self-end">
              <p className="">
                Subtotal
                <span>R$ 28,90</span>
              </p>
              <p>
                Taxa de Entrega
                <span>R$ 28,90</span>
              </p>
              <p className="font-bold text-black">
                Total
                <span>R$ 28,90</span>
              </p>
            </div>
          </Form.Section>
        </div>
      </Form.Root>
    </section>
  );
}
