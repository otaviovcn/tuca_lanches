import { setLocalStorage } from "./localStorage";

// Retorna a data atual no ato da venda, no formato dd/mm/aaaa
export const actualData = () => {
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

// Retorna a hora atual no ato da venda, no formato hh:mm
export const actualHour = () => {
  const date = new Date();
  const relativeHour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  const timeFormat = `${relativeHour}:${minute}`;
  return {
    relativeHour,
    timeFormat,
  }
}

export const adicionaAoRelatorio = (relatorios, carrinho) => {
  // const relatorios = Object.values(getLocalStorage('tuca_lanches_relatorios'));
  const date = actualData();
  const { timeFormat, relativeHour } = actualHour();

  const vendaAtual = {};
  const novoRelatorio = { ...relatorios };

  //  Organiza os dados da venda atual
  Object.values(carrinho).forEach(({
    name,
    productPrice,
    quantity,
    costPrice,
    category,
  }) => {
    vendaAtual[name] = {
      quantity,
      productPrice,
      costPrice,
      category,
      relativeHour,
    }
  });

  // Verifica se já existe um relatório para a data atual
  if (!novoRelatorio[date]) {
    novoRelatorio[date] = {
      ...novoRelatorio[date],
      [timeFormat]: vendaAtual,
    }
  } else {
    if (!novoRelatorio[date][timeFormat]) {
      novoRelatorio[date][timeFormat] = vendaAtual;
    } else {
      novoRelatorio[date][timeFormat] = {
        ...novoRelatorio[date][timeFormat],
        ...vendaAtual,
      }
    }
  }

  setLocalStorage('tuca_lanches_relatorios', novoRelatorio);
  return novoRelatorio;
}