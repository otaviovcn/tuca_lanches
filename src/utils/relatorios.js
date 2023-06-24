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

export const calculaProporcao = (itemCorrente, array) => {
  const result = itemCorrente / array.reduce((acc, cur) => acc + cur[1], 0) * 100;
  return result.toFixed(2);
};

export const vendasPorKey = ({ primaryKey, secondaryKey, relatorios, dia }) => {
  // vendasDoDia[dia][hora][produto]
  const vendasDoDia = relatorios[dia];

  const result = {};

  if (!vendasDoDia) {
    return 'Sem vendas';
  }

  const horasDoDia = Object.keys(vendasDoDia);
  horasDoDia.forEach((hora) => {
    const nomesDosProdutos = Object.keys(vendasDoDia[hora]);
    nomesDosProdutos.forEach((nomeDoProduto) => {
      const endKey = vendasDoDia[hora][nomeDoProduto][primaryKey];
      if (result[endKey]) {
        result[endKey] += vendasDoDia[hora][nomeDoProduto][secondaryKey];
      } else {
        result[endKey] = vendasDoDia[hora][nomeDoProduto][secondaryKey];;
      }
    });
  });

  return result;
};

export const produtosPorHora = ({ relatorios, dia }) => {
  const vendasDoDia = relatorios[dia];

  if (!vendasDoDia) {
    return 'Sem vendas';
  }

  const result = {};

  const horasDoDia = Object.keys(vendasDoDia);
  horasDoDia.forEach((hora) => {
    const nomesDosProdutos = Object.keys(vendasDoDia[hora]);
    nomesDosProdutos.forEach((nomeDoProduto) => {
      const relativeHour = vendasDoDia[hora][nomeDoProduto]['relativeHour'];

      // result = {
      //   11: {
      //     coxinha: 1,
      //     kibe: 3,
      //  },
      // }

      const quantity = vendasDoDia[hora][nomeDoProduto]['quantity'];
      if (result[relativeHour]) {

        if (result[relativeHour][nomeDoProduto]) {
          result[relativeHour] = {
            ...result[relativeHour],
            [nomeDoProduto]: result[relativeHour][nomeDoProduto] + vendasDoDia[hora][nomeDoProduto]['quantity'],
          }
        } else {
          result[relativeHour] = {
            ...result[relativeHour],
            [nomeDoProduto]: vendasDoDia[hora][nomeDoProduto]['quantity'],
          }
        }

      } else {
        result[relativeHour] = {
          ...result[relativeHour],
          [nomeDoProduto]: quantity,
        }
      }
    });
  });
  return result;
};

export const calculaLucro = ({ relatorios, dia }) => {
  const vendasDoDia = relatorios[dia];

  if (!vendasDoDia) {
    return 'Sem vendas';
  }

  const result = {};
  // result = {
  //  salgado:{
  //   coxinha: {
  //     quantity: 10,
  //     productPrice: 3,
  //     costPrice: 2,
  //   },
  // }

  // },

  const horasDoDia = Object.keys(vendasDoDia);
  horasDoDia.forEach((hora) => {
    const nomesDosProdutos = Object.keys(vendasDoDia[hora]);
    nomesDosProdutos.forEach((nomeDoProduto) => {
      const quantity = vendasDoDia[hora][nomeDoProduto]['quantity'];
      const productPrice = vendasDoDia[hora][nomeDoProduto]['productPrice'];
      const costPrice = vendasDoDia[hora][nomeDoProduto]['costPrice'];
      const category = vendasDoDia[hora][nomeDoProduto]['category'];

      if (result[category]) {
        if (result[category][nomeDoProduto]) {
          result[category][nomeDoProduto] = {
            ...result[category][nomeDoProduto],
            [nomeDoProduto]: {
              quantity: result[category][nomeDoProduto].quantity + quantity,
            }
          }
        } else {
          result[category] = {
            ...result[category],
            [nomeDoProduto]: {
              quantity,
              productPrice,
              costPrice,
            }
          }
        }
      } else {
        result[category] = {
          [nomeDoProduto]: {
            quantity,
            productPrice,
            costPrice,
          }
        }
      }
    });
  });
  console.log(result);
  return result;
}
