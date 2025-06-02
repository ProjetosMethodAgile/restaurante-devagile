export async function  handleChangeCep (cepDigits:string){
      const res = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
        return res
    }


