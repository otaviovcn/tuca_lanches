import React, { useState } from 'react';
import { Container, Typography, Tab, Tabs, Box } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

import { useProdutosContext } from '../../contexts/ProdutosContext';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       id={`vertical-tabpanel-${index}`}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           <Typography>{value}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

export const VendaDoProduto = () => {
  const [value, setValue] = useState(0);
  // const theme = useTheme();
  const productsType = ['Comida', 'Bebida']

  const { produtos } = useProdutosContext();

  const handleChange = (_event, newValue) => {
    setValue(newValue);
  };

  // console.log(produtos);

  return (
    <Container sx={{ paddingTop: 2, width: "100%" }}>
      <Box
        sx={{ flexGrow: 1,flexDirection: 'column' , bgcolor: 'background.paper', display: 'flex', height: 224 }}
      >
        <Tabs
          orientation="horizontal"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider' }}
        >
          { productsType.map((type) => <Tab label={type} />) }
        </Tabs>
        {
          Object.values(produtos).map(({ id, productPrice, costPrice, type, name }) => {
            return (
              <div
                id={id}
              >
                {productsType[value] !== type && (
                  <Box sx={{ p: 3 }}>
                    <Typography>teste</Typography>
                  </Box>
                )}
              </div>
            );
          })
        }
        {/* <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel> */}
      </Box>
    </Container>
  );
}
