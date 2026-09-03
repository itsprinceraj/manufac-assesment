import { describe, expect, it, vi } from 'vitest';
import { render, screen, userEvent } from '../../../test-utils';
import { AssessmentForm } from './components/AssessmentForm';
import { sampleAssessment } from './fixtures';
import { assessmentSchema } from './schema';

describe('Assessment Schema & Form Tests', () => {
  describe('Test 1 — Schema Boundary Test', () => {
    it('accepts a patient turning exactly 60 on assessment date and rejects a patient 1 day short', () => {
      // Exactly 60 years old on 2026-08-07 (DOB: 1966-08-07)
      const exactly60YearsOld = {
        ...sampleAssessment,
        dateOfBirth: '1966-08-07',
        assessmentDate: '2026-08-07',
      };

      const validResult = assessmentSchema.safeParse(exactly60YearsOld);
      expect(validResult.success).toBe(true);

      // One day short of 60 years old (DOB: 1966-08-08)
      const oneDayShortOf60 = {
        ...sampleAssessment,
        dateOfBirth: '1966-08-08',
        assessmentDate: '2026-08-07',
      };

      const invalidResult = assessmentSchema.safeParse(oneDayShortOf60);
      expect(invalidResult.success).toBe(false);

      const issues = invalidResult.error?.issues ?? [];
      const dobIssue = issues.find((i) => i.path.includes('dateOfBirth'));
      expect(dobIssue?.message).toBe('This pathway is for patients aged 60 and over');
    });
  });

  describe('Test 2 — Form Test', () => {
    it('renders form, loads sample patient, submits, and calls save handler with parsed values', async () => {
      const handleSave = vi.fn();
      render(<AssessmentForm onSave={handleSave} saveDelayMs={0} />);

      const loadSampleButton = screen.getByRole('button', {
        name: /load sample patient/i,
      });
      await userEvent.click(loadSampleButton);

      const submitButton = screen.getByRole('button', {
        name: /save assessment/i,
      });
      await userEvent.click(submitButton);

      expect(handleSave).toHaveBeenCalledTimes(1);
      expect(handleSave).toHaveBeenCalledWith(sampleAssessment);
    });
  });
});
