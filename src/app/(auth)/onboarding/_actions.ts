"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { supabaseAdmin } from "../../../../supabase/admin";
import { OnboardingData } from "@/components/onboarding/ModernOnboardingFlow";

export const completeOnboarding = async (data: OnboardingData) => {
  const { userId } = await auth();

  if (!userId) {
    return {
      success: false,
      error: "Authentication failed: No user ID found.",
    };
  }

  try {
    // 1. Call the master database function to perform the transactional insert
    const { data: organizationId, error: rpcError } = await supabaseAdmin.rpc(
      "onboard_clinical_manager",
      {
        p_organization_type:
          data.businessType === "single" ? "SINGLE_CLINIC" : "BRAND",
        p_legal_business_name: data.legalBusinessName,
        p_dba: data.dba,
        p_ein: data.ein,
        p_entity_type: data.entityType,
        p_medical_license_number: data.medicalLicenseNumber,
        p_npi: data.npi,
        p_expiry_date: data.expiryDate,
        p_state_of_issuance: data.stateOfIssuance,
        p_street_address: data.streetAddress,
        p_suite: data.suite,
        p_zip_code: data.zipCode,
        p_phone: data.phone,
        p_time_zone: data.timeZone,
        p_medical_specialty: data.medicalSpecialty,
        p_price_range: data.priceRange,
        p_monthly_volume: data.monthlyVolume,
        p_ehr_vendor: data.ehrVendor,
        p_other_ehr: data.otherEhr,
        p_contact_full_name: data.ownerName,
        p_contact_work_email: data.workEmail,
        p_contact_mobile: data.mobile,
        p_bank_routing_number: data.routingNumber,
        p_bank_account_number: data.accountNumber,
        p_bank_account_type: data.accountType,
        p_bank_name: data.bankName,
        p_owner_full_legal_name: data.signerName,
        p_owner_dob: data.dob,
        p_owner_ssn_last4: data.ssnLast4,
        p_owner_home_address: data.homeAddress,
        p_owner_ownership_percent: Number(data.ownershipPercent) || null,
        p_agreed_to_terms: data.terms,
        p_agreed_to_ach: data.ach,
        p_certified_accuracy: data.accuracy,
      }
    );

    if (rpcError) {
      // This will catch database-level errors (e.g., unique constraint violation)
      throw new Error(`Database error: ${rpcError.message}`);
    }

    // 2. If the transaction was successful, update the Clerk user metadata
    const client = await clerkClient();
    await client.users.updateUser(userId, {
      publicMetadata: {
        onboardingComplete: true,
        organizationId: organizationId,
      },
    });

    return { success: true, organizationId: organizationId };
  } catch (err: any) {
    console.error("Onboarding failed:", err);
    return {
      success: false,
      error: `An unexpected error occurred: ${err.message}`,
    };
  }
};
