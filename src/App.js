import React from 'react';
import { ChakraProvider, Box, Grid, theme,} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Syllabus from './components/syllabus';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Subject from './components/subject';
import Feedback from './components/feedback';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid>
            <Navbar/>
          <ColorModeSwitcher justifySelf="flex-end" />
            <Syllabus/>
            <Subject/>
            <Feedback/>
            <Footer/>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
