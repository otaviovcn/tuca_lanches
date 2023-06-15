import React, { useState } from 'react';
import { Container, Typography, Tab, Tabs, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

import { useProdutosContext } from '../../contexts/ProdutosContext';
import { CardProduct } from './CardProduct';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export function VendaDoProduto() {
  const [value, setValue] = React.useState(0);
  const productsType = ['Comida', 'Bebida', 'Carrinho']

  const { produtos } = useProdutosContext();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', background: 'white' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Box sx={{ display: "flex", flexWrap: "wrap" }} value={value} index={0}>
        {
          Object.values(produtos).map(({ id, productPrice, costPrice, type, name }) => {
            return (
              <>
                {productsType[value] === type && (
                  <>
                    <CardProduct
                      id={id}
                      productPrice={productPrice}
                      costPrice={costPrice}
                      type={type}
                      name={name}
                    />
                  </>
                )}
              </>
            );
          })
        }
        {
          Object.values(produtos).map((produto) => {
            const { id, productPrice, costPrice, type, name } = produto;
            return (
              <>
                {productsType[value] === "Carrinho" && (
                  <CardProduct />
                )}
              </>
            );
          })
        }
      </Box>
    </Box>
  );
}

// import React, { useState } from 'react';
// import { Container, Typography, Tab, Tabs, Box, Button } from '@mui/material';
// import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
// import AddIcon from '@mui/icons-material/Add';


// import { useProdutosContext } from '../../contexts/ProdutosContext';
// import { CardProduct } from './CardProduct';


// export const VendaDoProduto = () => {
//   const [value, setValue] = useState(0);
//   // const theme = useTheme();
//   const productsType = ['Comida', 'Bebida', 'Carrinho']


//   const { produtos } = useProdutosContext();


//   const handleChange = (_event, newValue) => {
//     setValue(newValue);
//   };


//   return (
//     <Container sx={{ paddingTop: 2 }}>
//       <Box
//         sx={{ flexGrow: 1, flexDirection: 'column', bgcolor: 'background.paper', display: 'flex' }}
//       >
//         <Tabs
//           orientation="horizontal"
//           variant="scrollable"
//           value={value}
//           onChange={handleChange}
//           aria-label="Vertical tabs example"
//           sx={{ borderRight: 1, borderColor: 'divider' }}
//         >
//           {productsType.map((type) => {
//             if (type === "Carrinho") {
//               return <Tab icon={<ProductionQuantityLimitsIcon />} />
//             }
//             return <Tab label={type} />
//           })}
//         </Tabs>
//         <>
//           {
//             Object.values(produtos).map(({ id, productPrice, costPrice, type, name }) => {
//               return (
//                 <>
//                   {productsType[value] === type && (
//                     // <Box sx={{ p: 3 }}>
//                     //   <Typography>teste</Typography>
//                     // </Box>
//                     <>
//                       <CardProduct
//                         id={id}
//                         productPrice={productPrice}
//                         costPrice={costPrice}
//                         type={type}
//                         name={name}
//                       />
//                     </>
//                   )}
//                 </>
//               );
//             })
//           }
//           {/* {
//             Object.values(produtos).map((produto) => {
//               const { id, productPrice, costPrice, type, name } = produto;
//               return (
//                 <Container id={id}>
//                   {productsType[value] === "Carrinho" && (
//                     <CardProduct />
//                   )}
//                 </Container>
//               );
//             })
//           } */}
//         </>
//       </Box>
//     </Container>
//   );
// }
