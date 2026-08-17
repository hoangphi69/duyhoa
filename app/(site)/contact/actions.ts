'use server';

import { writeClient } from '@/sanity/lib/client';
import {
  AgencyFormValues,
  agencySchema,
  ProjectFormValues,
  projectSchema,
} from './validation';

export type AgencyActionResult =
  | { success: true }
  | {
      success: false;
      errors: Partial<Record<keyof AgencyFormValues, string>>;
      message?: string;
    };

export async function agencyRegistrationAction(
  data: AgencyFormValues,
): Promise<AgencyActionResult> {
  const parsed = agencySchema.safeParse(data);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[String(issue.path[0])] = issue.message;
    }
    return { success: false, errors };
  }

  try {
    await writeClient.create({
      _type: 'agencyContact',
      storeName: parsed.data.storeName,
      phone: parsed.data.phone,
      region: parsed.data.region,
      categories: parsed.data.categories,
      note: parsed.data.note || undefined,
      status: 'new',
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Sanity write error:', err);
    return {
      success: false,
      errors: {},
      message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
    };
  }

  return { success: true };
}

export type ProjectActionResult =
  | { success: true }
  | {
      success: false;
      errors: Partial<Record<keyof ProjectFormValues, string>>;
      message?: string;
    };

export async function projectQuoteAction(
  data: ProjectFormValues,
): Promise<ProjectActionResult> {
  // Server-side re-validation — never trust client input.
  const parsed = projectSchema.safeParse(data);

  if (!parsed.success) {
    const errors: Partial<Record<keyof ProjectFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === 'string' && !(field in errors)) {
        errors[field as keyof ProjectFormValues] = issue.message;
      }
    }
    return { success: false, errors };
  }

  try {
    await writeClient.create({
      _type: 'projectContact',
      companyName: parsed.data.companyName,
      contactPerson: parsed.data.contactPerson,
      phone: parsed.data.phone,
      projectName: parsed.data.projectName,
      location: parsed.data.location,
      categories: parsed.data.categories,
      scale: parsed.data.scale || undefined,
      note: parsed.data.note || undefined,
      status: 'new',
      submittedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Sanity write error:', err);
    return {
      success: false,
      errors: {},
      message: 'Có lỗi xảy ra, vui lòng thử lại sau.',
    };
  }

  return { success: true };
}
