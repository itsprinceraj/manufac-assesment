import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { Box, Container, MantineProvider, Paper } from '@mantine/core';
import { PageHeader } from './components/PageHeader';
import { AssessmentForm } from './features/assessment/components/AssessmentForm';
import { theme } from './theme';
import './styles/globals.css';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Box bg="gray.0" mih="100vh" py="xl">
        <Container size="md">
          <Paper p={{ base: 'md', sm: 'xl' }} radius="md" withBorder shadow="sm">
            <PageHeader />
            <AssessmentForm />
          </Paper>
        </Container>
      </Box>
    </MantineProvider>
  );
}
