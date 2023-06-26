import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import { calculaPrecoTotal } from "../../../utils/relatorios";

export const vendasPDF = ({
  vendasPorHora,
  dia,
  lucro,
  custo,
  lucroPorCategoria,
}) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const header = [
    { text: `Relatórios do dia ${dia}`, style: 'header', fontSize: 14, bold: true, margin: [20, 20, 0, 8] },
  ];

  const content = [
    { text: 'Tuca Lanches', style: "subheader", fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    { text: 'Lucro estimado do dia:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    { text: lucro, fontSize: 12 },
    { text: 'Custo estimado do dia:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    { text: custo, fontSize: 12 },
    { text: 'Venda por período de tempo:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    // 'Venda por período de tempo:\n',
    {
      style: 'tableExample',
      table: {
        body: vendasPorHora,



      }
    },
    { text: 'Teste:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
  ];

  Object.entries(lucroPorCategoria).forEach((category) => {
    content.push(
      { text: category[0], fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
      )
      content.push(category[1])
  });


  const Rodape = () => {

  }


  const docDefinition = {
    pageSize: "A4",

    header: [header],
    content: [content],
    footer: Rodape,
  }

  pdfMake.createPdf(docDefinition).open();
}
