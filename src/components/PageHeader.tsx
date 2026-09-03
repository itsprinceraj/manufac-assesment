import { Group, Stack, Text, Title } from '@mantine/core';

export function PageHeader() {
  return (
    <Stack gap="xs" mb="lg">
      <Group justify="space-between" align="flex-start">
        <div>
          <Title order={2} c="blue.9" fw={700}>
            Geriatric Care Assessment
          </Title>
          <Text c="dimmed" size="sm" mt={4}>
            Complete the home visit assessment for elderly patient pathway (Ages 60+).
          </Text>
        </div>
      </Group>
    </Stack>
  );
}
