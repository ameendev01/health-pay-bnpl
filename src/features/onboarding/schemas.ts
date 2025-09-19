import { z } from "zod";

// const luhnCheck = (value: string): boolean => {
//   if (!/^\d+$/.test(value)) {
//     return false;
//   }
//   const digits = value.split("").map(Number);
//   const len = digits.length;
//   let sum = 0;
//   let isSecond = false;
//   for (let i = len - 1; i >= 0; i--) {
//     let d = digits[i];
//     if (isSecond) {
//       d = d * 2;
//     }
//     sum += Math.floor(d / 10);
//     sum += d % 10;
//     isSecond = !isSecond;
//   }
//   return sum % 10 === 0;
// };

const npiCheck = (npi: string): boolean => {
  if (!/^\d{10}$/.test(npi)) return false;

  const base9 = npi.slice(0, 9);
  const claimedCheck = Number(npi[9]);

  const payload = "80840" + base9; // 14 digits

  // Compute Luhn sum over payload
  let sum = 0;
  let double = false; // because we start from rightmost of payload; choose parity carefully
  // Easier: implement Luhn exactly as you already did but on payload only, then derive check digit.
  for (let i = payload.length - 1; i >= 0; i--) {
    let d = Number(payload[i]);
    if (double) d *= 2;
    sum += Math.floor(d / 10) + (d % 10);
    double = !double;
  }

  const expectedCheck = (10 - (sum % 10)) % 10;
  return expectedCheck === claimedCheck;
};


/* ── 2. Helper: ABA checksum (3-7-1 weighting) ───────────────────────────── */
const abaChecksumPass = (raw: string): boolean => {
  if (!/^\d{9}$/.test(raw)) return false;
  const d = raw.split("").map(Number);
  const checksum =
    (3 * (d[0] + d[3] + d[6]) +
      7 * (d[1] + d[4] + d[7]) +
      1 * (d[2] + d[5] + d[8])) %
    10;
  return checksum === 0;
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
    .regex(/(^$)|(^[A-Za-z0-9 ,.'&-]{2,100}$)/)
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
    // .refine((npi) => {
    //   /* strip any hidden white-space before validating */
    //   const clean = npi.trim();
    //   return luhnCheck("80840" + clean);
    // }, "Invalid NPI number (Luhn check failed)."),
    .refine((npi) => npiCheck(npi), "Invalid NPI number (Luhn check failed)."),

  stateOfIssuance: z.string().min(1, "State of issuance is required."),
  expiryDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Please pick a valid date.",
    })
    .refine((val) => new Date(val) > new Date(), {
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

/* ── 2. Manual-entry subtree (for non-Plaid fallback) ────────────────────── */
const manualBankSchema = z.object({
  routingNumber: z
    .string({ required_error: "Routing number is required." })
    .trim()
    .regex(/^\d{9}$/, "Routing number must be exactly 9 digits.")
    .refine(abaChecksumPass, { message: "Invalid routing number (checksum)." }),

  accountNumber: z
    .string({ required_error: "Account number is required." })
    .trim()
    .regex(/^\d{4,17}$/, "Account number must be 4–17 digits.")
    .refine((s) => !/^0+$/.test(s), {
      message: "Account number cannot be all zeros.",
    })
    .refine((s) => !/(.)\1{3,}/.test(s), {
      message: "Account number looks suspicious (repeating digits).",
    }),

  accountType: z.enum(["checking", "savings"], {
    required_error: "Select checking or savings.",
  }),

  /* auto-filled after routing lookup; optional while typing */
  bankName: z
    .string()
    .trim()
    .regex(
      /(^$)|(^[A-Za-z0-9 .'&amp;-]{2,100}$)/,
      "Bank name must be 2-100 characters if provided."
    )
    .optional(),
});

/* ── 3. Plaid subtree (if user clicks “Connect with Plaid”) ──────────────── */
// const plaidBankSchema = z.object({
//   plaidPublicToken: z.string({
//     required_error: "Missing Plaid public token.",
//   }),
//   plaidAccountId: z.string({
//     required_error: "Missing Plaid account id.",
//   }),
//   /* You can still store ACH numbers returned by /auth/get, but
//      those are optional here because Plaid already verified them. */
//   routingNumber: z.string().optional(),
//   accountNumber: z.string().optional(),
//   accountType: z.enum(["checking", "savings"]).optional(),
//   bankName: z.string().optional(),
// });

/* ── 4. Final discriminated-union schema ─────────────────────────────────── */
// export const step8Schema = z.union([plaidBankSchema, manualBankSchema]);
export const step8Schema = manualBankSchema;

export const step9Schema = z.object({
  signerName: z.string().min(1, "Full legal name is required."),
  dob: z.string().min(1, "Date of birth is required."),
  ssnLast4: z.string().length(4, "SSN last 4 digits must be 4 digits."),
  homeAddress: z.string().min(1, "Home address is required."),
  ownershipPercent: z.string().optional(),
  idDocument: z.any().optional(),
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