import { calculaProporcao } from "../../../../utils/relatorios";

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

// export const calculaLucroPorCategoria = ({ listaDoLucroPorCategoria, }) => {
//   const result = [];

//   listaDoLucroPorCategoria?.forEach((category, index) => {
//     result.push([`${category[0]}`]);
//   });
//   return result;
// };
