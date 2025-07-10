import { z } from "zod";

const luhnCheck = (value: string): boolean => {
  if (!/^\d+$/.test(value)) {
    return false;
  }
  const digits = value.split("").map(Number);
  const len = digits.length;
  let sum = 0;
  let isSecond = false;
  for (let i = len - 1; i >= 0; i--) {
    let d = digits[i];
    if (isSecond) {
      d = d * 2;
    }
    sum += Math.floor(d / 10);
    sum += d % 10;
    isSecond = !isSecond;
  }
  return sum % 10 === 0;
};

export const step1Schema = z.object({
  businessType: z.enum(["single", "brand"], {
    required_error: "Please select a business type.",
  }),
});

export const step2Schema = z.object({
  legalBusinessName: z
    .string()
    .min(2, "Legal business name must be at least 2 characters long.")
    .max(120, "Legal business name must be no more than 120 characters long.")
    .regex(
      /^[A-Za-z0-9\s,.'&-]*$/,
      "Legal business name contains invalid characters."
    ),
  dba: z
    .string()
    .regex(/^[A-Za-z0-9 ,.'&-]{2,100}$/)
    .optional(),
  ein: z
    .string()
    .regex(/^\d{2}-\d{7}$/, "EIN must be in the format XX-XXXXXXX."),
  entityType: z.string().min(1, "Entity type is required."),
});

export const step3Schema = z.object({
  medicalLicenseNumber: z
    .string()
    .min(1, "Medical license number is required."),
  npi: z
    .string()
    .regex(/^\d{10}$/, "NPI must be a 10-digit number with no punctuation.")
    .refine((npi) => {
      /* strip any hidden white-space before validating */
      const clean = npi.trim();
      return luhnCheck("80840" + clean);
    }, "Invalid NPI number (Luhn check failed)."),
  stateOfIssuance: z.string().min(1, "State of issuance is required."),
  // 📄 schema.ts
  expiryDate: z// 1️⃣  Turn the ISO string into a Date object.
  //     z.coerce.date() understands "YYYY-MM-DD".
  .coerce
    .date({
      errorMap: () => ({ message: "Please pick a date." }),
    })
    // 2️⃣  Make sure it’s in the future.
    .refine((d) => d > new Date(), {
      message: "Expiry date must be in the future.",
    }),
});

export const step4Schema = z.object({
  streetAddress: z.string().min(1, "Street address is required."),
  suite: z.string().optional(),
  zipCode: z.string().min(1, "ZIP code is required."),
  phone: z.string().min(1, "Phone number is required."),
  timeZone: z.string().min(1, "Time zone is required."),
});

export const step5Schema = z.object({
  medicalSpecialty: z.string().min(1, "Medical specialty is required."),
  priceRange: z.string().min(1, "Price range is required."),
  monthlyVolume: z.string().min(1, "Monthly patient volume is required."),
});

export const step6Schema = z
  .object({
    ehrVendor: z.string().min(1, "EHR vendor is required."),
    otherEhr: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.ehrVendor === "other") {
        return data.otherEhr && data.otherEhr.length > 0;
      }
      return true;
    },
    {
      message: "Please specify your EHR system",
      path: ["otherEhr"],
    }
  );

export const step7Schema = z.object({
  ownerName: z.string().min(1, "Owner/Manager name is required."),
  workEmail: z.string().email("Invalid email address."),
  mobile: z.string().min(1, "Mobile number is required."),
});

export const step8Schema = z.object({
  routingNumber: z.string().min(1, "Routing number is required."),
  accountNumber: z.string().min(1, "Account number is required."),
  accountType: z.string().min(1, "Account type is required."),
  bankName: z.string().optional(),
});

export const step9Schema = z.object({
  signerName: z.string().min(1, "Full legal name is required."),
  dob: z.string().min(1, "Date of birth is required."),
  ssnLast4: z.string().length(4, "SSN last 4 digits must be 4 digits."),
  homeAddress: z.string().min(1, "Home address is required."),
  ownershipPercent: z.string().optional(),
});

export const step10Schema = z.object({
  terms: z
    .boolean()
    .refine((val) => val === true, { message: "You must agree to the terms." }),
  ach: z.boolean().refine((val) => val === true, {
    message: "You must authorize ACH debits.",
  }),
  accuracy: z.boolean().refine((val) => val === true, {
    message: "You must certify the accuracy of the information.",
  }),
});

export const onboardingSchema = step1Schema
  .and(step2Schema)
  .and(step3Schema)
  .and(step4Schema)
  .and(step5Schema)
  .and(step6Schema)
  .and(step7Schema)
  .and(step8Schema)
  .and(step9Schema)
  .and(step10Schema);
