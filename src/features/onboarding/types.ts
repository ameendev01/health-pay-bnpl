import type { z } from "zod";
import { onboardingSchema } from "@/features/onboarding/schemas";

export type OnboardingData = z.infer<typeof onboardingSchema>;