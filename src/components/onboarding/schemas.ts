
import { z } from "zod";

export const addPaymentPlanSchema = z.object({
  planName: z.string().min(1, "Plan name is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
});

export const createClinicSchema = z.object({
  clinicName: z.string().min(1, "Clinic name is required"),
  address: z.string().min(1, "Address is required"),
});

export const setUpBankSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
});
