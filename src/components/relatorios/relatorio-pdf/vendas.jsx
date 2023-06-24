import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export const vendasPDF = ({ vendasPorHora, dia }) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const header = [
    { text: `Relatórios do dia ${dia}`, style: 'header', fontSize: 14, bold: true, margin: [20, 20, 0, 8] },
  ];

  const content = [
    { text: 'Tuca Lanches', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    // { text: 'Tables', style: 'header' },
    // 'Official documentation is in progress, this document is just a glimpse of what is possible with pdfmake and its layout engine.',
    // { text: 'A simple table (no headers, no width specified, no spans, no styling)', style: 'subheader' },
    // 'The following table has nothing more than a body array',
    // {
    //   style: 'tableExample',
    //   table: {
    //     body: [
    //       ['Column 1', 'Column 2', 'Column 3'],
    //       ['One value goes here', 'Another one here', 'OK?']
    //     ]
    //   }
    // },
    // { text: 'A simple table with nested elements', style: 'subheader' },
    // 'It is of course possible to nest any other type of nodes available in pdfmake inside table cells',
    // {
    //   style: 'tableExample',
    //   table: {
    //     body: [
    //       ['Column 1', 'Column 2', 'Column 3'],
    //       [
    //         {
    //           stack: [
    //             'Let\'s try an unordered list',
    //             {
    //               ul: [
    //                 'item 1',
    //                 'item 2'
    //               ]
    //             }
    //           ]
    //         },
    //         [
    //           'or a nested table',
    //           {
    //             table: {
    //               body: [
    //                 ['Col1', 'Col2', 'Col3'],
    //                 ['1', '2', '3'],
    //                 ['1', '2', '3']
    //               ]
    //             },
    //           }
    //         ],
    //         {
    //           text: [
    //             'Inlines can be ',
    //             { text: 'styled\n', italics: true },
    //             { text: 'easily as everywhere else', fontSize: 10 }]
    //         }
    //       ]
    //     ]
    //   }
    // },
    { text: 'Venda por período de tempo:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    // 'Venda por período de tempo:\n',
    {
      style: 'tableExample',
      table: {
        body: vendasPorHora,
        

      }
    },
    // { text: 'headerLineOnly:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    // {
    //   style: 'tableExample',
    //   table: {
    //     headerRows: 1,
    //     body: [
    //       [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //     ]
    //   },
    //   layout: 'headerLineOnly'
    // },
    // { text: 'lightHorizontalLines:', fontSize: 14, bold: true, margin: [0, 20, 0, 8] },
    // {
    //   style: 'tableExample',
    //   table: {
    //     headerRows: 1,
    //     body: [
    //       [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //     ]
    //   },
    //   layout: 'lightHorizontalLines'
    // },
    // { text: 'zebra style', margin: [0, 20, 0, 8] },
    // {
    //   style: 'tableExample',
    //   table: {
    //     body: [
    //       [{ text: 'Header 1', style: 'tableHeader' }, { text: 'Header 2', style: 'tableHeader' }, { text: 'Header 3', style: 'tableHeader' }],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //       ['Sample value 1', 'Sample value 2', 'Sample value 3'],
    //     ]
    //   },
    //   layout: {
    //     fillColor: function (rowIndex, node, columnIndex) {
    //       return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
    //     }
    //   }
    // },
  ];

  const Rodape = () => {

  }


  const docDefinition = {
    pageSize: "A4",

    header: [header],
    content: [content],
    footer: Rodape,
    // background: url('https://mundoconectado.com.br/uploads/chamadas/capa_145.jpg'),
  }

  pdfMake.createPdf(docDefinition).open();
}
