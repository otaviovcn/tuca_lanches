import { calculaProporcao, calculaCustoOuLucro, calculaPrecoTotal } from "../../../../utils/relatorios";

export const calculaVendasPorHora = ({ listaDeProdutosPorHora, }) => {
  const vendasPorHora = [];
  listaDeProdutosPorHora.forEach((item) => {
    const productsList = [];
    Object.entries(item[1])?.forEach((item, index, array) => {
      const product = `${item[0]}: ${item[1]}(${calculaProporcao(array[index][1], array)}%)`
      productsList.push(product);
    })

    vendasPorHora.push([
      `${item[0]}:00 - ${item[0]}:59`,
      { ul: productsList },
    ])
  });

  return vendasPorHora;
};

export const calculaLucroPorCategoria = ({ listaDoLucroPorCategoria, relatorios, dia }) => {
  const result = {};

  // {
  //   style: 'tableExample',
  //   table: {
  //     body: [
  //       ['Produto', 'Lucro Bruto', 'Lucro Líquido', 'Custo Estimado'],
  //       ['1', '2', '3', '4'],
  //       ['1', '2', '3', '4'],
  //     ]
  //   }
  // },

  listaDoLucroPorCategoria?.forEach((category) => {
    const productsList = {
      style: 'tableExample',
      table: {
        body: [
          [
            {
              border: [true, true, true, true],
              fillColor: '#F9A825',
              text: 'Produto'
            },
            {
              border: [true, true, true, true],
              fillColor: '#F9A825',
              text: 'Lucro Bruto',
            },
            {
              border: [true, true, true, true],
              fillColor: '#F9A825',
              text: 'Lucro Líquido',
            },
            {
              border: [true, true, true, true],
              fillColor: '#F9A825',
              text: 'Custo Estimado',
            },
            {
              border: [true, true, true, true],
              fillColor: '#F9A825',
              text: 'Quantidade Vendida',
            },
          ],
        ]
      }
    };

    Object.entries(category[1])?.forEach((product) => {
      productsList.table.body.push(
        [
          product[0],
          `${calculaCustoOuLucro({ ...product[1], type: 'lucro bruto' })}`,
          `${calculaCustoOuLucro({ ...product[1], type: 'lucro líquido' })}`,
          `${calculaCustoOuLucro({ ...product[1], type: 'custo' })}`,
          `${calculaCustoOuLucro({ ...product[1], type: 'quantidade' })}`,
        ]
      )
    });
    const custoTotal = Number(calculaPrecoTotal({ relatorios, dia }).custoPorCategoria[category[0]]).toFixed(2);
    const lucroTotalBruto = Number(
      calculaPrecoTotal({ relatorios, dia }).lucroPorCategoria[category[0]]['grossProfit']
    ).toFixed(2);
    const lucroTotalLiquido = Number(
      calculaPrecoTotal({ relatorios, dia }).lucroPorCategoria[category[0]]['netProfit']
    ).toFixed(2);
    const quantidadeTotal = Number(calculaPrecoTotal({ relatorios, dia }).quantidadePorCategoria[category[0]]);
    productsList.table.body.push(
      [
        {
          border: [true, true, true, true],
          fillColor: '#FBC02D',
          text: 'Total'
        },
        {
          border: [true, true, true, true],
          fillColor: '#FBC02D',
          text: lucroTotalBruto,
        },
        {
          border: [true, true, true, true],
          fillColor: '#FBC02D',
          text: lucroTotalLiquido,
        },
        {
          border: [true, true, true, true],
          fillColor: '#FBC02D',
          text: custoTotal,
        },
        {
          border: [true, true, true, true],
          fillColor: '#FBC02D',
          text: `${quantidadeTotal} unidades`,
        },
      ]
    )
    result[category[0]] = productsList;
  });
  return result;
};
