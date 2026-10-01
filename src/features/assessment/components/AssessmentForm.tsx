import { useState } from 'react';
import {
  Alert,
  Button,
  Checkbox,
  Code,
  Divider,
  Group,
  NumberInput,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { schemaResolver, useForm } from '@mantine/form';
import { sampleAssessment } from '../fixtures';
import { assessmentSchema, MOBILITY, type Assessment } from '../schema';
import { initialFormValues, type AssessmentFormValues } from '../types';

export interface AssessmentFormProps {
  onSave?: (assessment: Assessment) => Promise<void> | void;
  saveDelayMs?: number;
}

const mobilityOptions = MOBILITY.map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export function AssessmentForm({ onSave, saveDelayMs = 800 }: AssessmentFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [savedAssessment, setSavedAssessment] = useState<Assessment | null>(null);

  const form = useForm<AssessmentFormValues>({
    mode: 'controlled',
    initialValues: initialFormValues,
    validate: schemaResolver(assessmentSchema),
    validateInputOnBlur: true,
  });

  const handleLoadSample = () => {
    form.setValues(sampleAssessment);
    form.clearErrors();
    setSavedAssessment(null);
  };

  const handleSubmit = async (values: AssessmentFormValues) => {
    setIsSaving(true);
    setSavedAssessment(null);

    try {
      const parsed = assessmentSchema.parse(values);

      if (saveDelayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, saveDelayMs));
      }

      if (onSave) {
        await onSave(parsed);
      }

      setSavedAssessment(parsed);
    } catch {
      // Validation errors are handled by schemaResolver
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Stack gap="lg">
      <Group justify="flex-end">
        <Button variant="outline" color="dark" onClick={handleLoadSample} disabled={isSaving}>
          Load sample patient
        </Button>
      </Group>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack gap="xl">
          <Paper p="md" radius="sm" withBorder bg="white">
            <Stack gap="md">
              <div>
                <Title order={4} c="black">
                  Patient Information
                </Title>
                <Text size="xs" c="dimmed">
                  Basic demographics and assessment visit details
                </Text>
              </div>
              <Divider />

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <TextInput
                  label="Medical record number"
                  placeholder="MRN-004821"
                  required
                  key={form.key('mrn')}
                  {...form.getInputProps('mrn')}
                />
                <TextInput
                  label="Patient name"
                  placeholder="Enter full name"
                  required
                  key={form.key('patientName')}
                  {...form.getInputProps('patientName')}
                />
              </SimpleGrid>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <DateInput
                  label="Date of birth"
                  placeholder="YYYY-MM-DD"
                  valueFormat="YYYY-MM-DD"
                  required
                  key={form.key('dateOfBirth')}
                  {...form.getInputProps('dateOfBirth')}
                />
                <DateInput
                  label="Assessment date"
                  placeholder="YYYY-MM-DD"
                  valueFormat="YYYY-MM-DD"
                  maxDate={new Date()}
                  required
                  key={form.key('assessmentDate')}
                  {...form.getInputProps('assessmentDate')}
                />
              </SimpleGrid>
            </Stack>
          </Paper>

          <Paper p="md" radius="sm" withBorder bg="white">
            <Stack gap="md">
              <div>
                <Title order={4} c="black">
                  Clinical Assessment
                </Title>
                <Text size="xs" c="dimmed">
                  Mobility, functional score, and medication management
                </Text>
              </div>
              <Divider />

              <Select
                label="Mobility"
                placeholder="Select mobility status"
                data={mobilityOptions}
                required
                key={form.key('mobility')}
                {...form.getInputProps('mobility')}
              />

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <NumberInput
                  label="Barthel Index"
                  placeholder="0 - 100 in steps of 5"
                  step={5}
                  min={0}
                  max={100}
                  required
                  key={form.key('barthelIndex')}
                  {...form.getInputProps('barthelIndex')}
                />
                <NumberInput
                  label="Regular medications"
                  placeholder="0 - 30"
                  min={0}
                  max={30}
                  required
                  key={form.key('medicationCount')}
                  {...form.getInputProps('medicationCount')}
                />
              </SimpleGrid>

              <Checkbox
                label="Pharmacist review requested"
                key={form.key('pharmacistReviewRequested')}
                {...form.getInputProps('pharmacistReviewRequested', {
                  type: 'checkbox',
                })}
              />
            </Stack>
          </Paper>

          <Paper p="md" radius="sm" withBorder bg="white">
            <Stack gap="md">
              <div>
                <Title order={4} c="black">
                  Follow-up & Consent
                </Title>
                <Text size="xs" c="dimmed">
                  Next scheduled review date and patient consent confirmation
                </Text>
              </div>
              <Divider />

              <DateInput
                label="Next review date"
                placeholder="YYYY-MM-DD"
                valueFormat="YYYY-MM-DD"
                required
                key={form.key('followUpDate')}
                {...form.getInputProps('followUpDate')}
              />

              <Checkbox
                label="Patient or representative has given consent"
                required
                key={form.key('consentObtained')}
                {...form.getInputProps('consentObtained', {
                  type: 'checkbox',
                })}
              />
            </Stack>
          </Paper>

          <Group justify="flex-end">
            <Button type="submit" size="md" color="dark" loading={isSaving} disabled={isSaving}>
              Save Assessment
            </Button>
          </Group>
        </Stack>
      </form>

      {savedAssessment && (
        <Alert variant="light" color="green" title="Assessment saved successfully" mt="md">
          <Text size="sm" mb="xs">
            Parsed Zod Assessment Output:
          </Text>
          <Code block data-testid="saved-assessment-output">
            {JSON.stringify(savedAssessment, null, 2)}
          </Code>
        </Alert>
      )}
    </Stack>
  );
}
