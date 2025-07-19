CREATE OR REPLACE FUNCTION onboard_clinical_manager(
    -- Organization
    p_organization_type organization_type,
    p_legal_business_name varchar,
    p_dba varchar,
    p_ein varchar,
    p_entity_type varchar,
    -- Clinic
    p_medical_license_number varchar,
    p_npi varchar,
    p_license_expiry_date varchar,
    p_license_state_of_issuance varchar,
    p_street_address varchar,
    p_suite varchar,
    p_zip_code varchar,
    p_phone varchar,
    p_time_zone varchar,
    p_medical_specialty medical_specialty_type,
    p_price_range varchar,
    p_monthly_volume varchar,
    p_ehr_vendor varchar,
    -- Contact
    p_contact_full_name varchar,
    p_contact_work_email varchar,
    p_contact_mobile varchar,
    -- Bank (plain)
    p_bank_routing_number varchar,
    p_bank_account_number varchar,
    p_bank_account_type bank_account_type,
    p_bank_name varchar,
    -- Beneficial Owner (plain)
    p_owner_full_legal_name varchar,
    p_owner_dob date,              -- switch to date if you changed schema
    p_owner_ssn_last4 char(4),
    p_owner_home_address varchar,
    p_owner_ownership_percent numeric,
    -- Agreements
    p_agreed_to_terms boolean,
    p_agreed_to_ach boolean,
    p_certified_accuracy boolean
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER  -- you likely no longer need DEFINER if RLS allows inserts
AS $$
DECLARE
    v_organization_id uuid;
BEGIN
    INSERT INTO organizations (type, legal_business_name, dba, ein, entity_type)
    VALUES (p_organization_type, p_legal_business_name, p_dba, p_ein, p_entity_type)
    RETURNING id INTO v_organization_id;

    INSERT INTO clinics (
        organization_id, medical_license_number, npi, license_expiry_date,
        license_state_of_issuance, street_address, suite, zip_code, phone,
        time_zone, medical_specialty, price_range, monthly_volume, ehr_vendor
    ) VALUES (
        v_organization_id, p_medical_license_number, p_npi, p_license_expiry_date,
        p_license_state_of_issuance, p_street_address, p_suite, p_zip_code, p_phone,
        p_time_zone, p_medical_specialty, p_price_range, p_monthly_volume, p_ehr_vendor
    );

    INSERT INTO contacts (organization_id, full_name, work_email, mobile)
    VALUES (v_organization_id, p_contact_full_name, p_contact_work_email, p_contact_mobile);

    INSERT INTO bank_accounts (
        organization_id, routing_number, account_number, account_type, bank_name
    ) VALUES (
        v_organization_id, p_bank_routing_number, p_bank_account_number, p_bank_account_type, p_bank_name
    );

    INSERT INTO beneficial_owners (
        organization_id, full_legal_name, dob, ssn_last4, home_address, ownership_percent
    ) VALUES (
        v_organization_id, p_owner_full_legal_name, p_owner_dob, p_owner_ssn_last4,
        p_owner_home_address, p_owner_ownership_percent
    );

    INSERT INTO agreements (organization_id, agreed_to_terms, agreed_to_ach, certified_accuracy)
    VALUES (v_organization_id, p_agreed_to_terms, p_agreed_to_ach, p_certified_accuracy);

    RETURN v_organization_id;
END;
$$;
