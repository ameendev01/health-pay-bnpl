
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
    -- Bank Account
    p_bank_routing_number varchar,
    p_bank_account_number varchar,
    p_bank_account_type bank_account_type,
    p_bank_name varchar,
    -- Beneficial Owner
    p_owner_full_legal_name varchar,
    p_owner_dob varchar,
    p_owner_ssn_last4 varchar,
    p_owner_home_address varchar,
    p_owner_ownership_percent numeric,
    -- Agreements
    p_agreed_to_terms boolean,
    p_agreed_to_ach boolean,
    p_certified_accuracy boolean
) 
RETURNS uuid -- It will return the new organization's ID
LANGUAGE plpgsql
SECURITY DEFINER -- This is crucial for using pgsodium securely
AS $$
DECLARE
    v_organization_id uuid;
    v_encryption_key_id uuid;
    v_additional_data bytea;
BEGIN
    -- It's good practice to use a dedicated, non-deterministic key for encryption.
    -- For simplicity in this example, we'll derive a key from a secret, but a separate key management system is ideal.
    -- We will use the organization's EIN as "additional data" for authenticated encryption (AEAD).
    v_additional_data := p_ein::bytea;

    -- Use a transaction block to ensure all inserts succeed or none do.
    -- The function itself is transactional by default.

    -- 1. Insert into organizations
    INSERT INTO organizations (type, legal_business_name, dba, ein, entity_type)
    VALUES (p_organization_type, p_legal_business_name, p_dba, p_ein, p_entity_type)
    RETURNING id INTO v_organization_id;

    -- 2. Insert into clinics
    INSERT INTO clinics (
        organization_id, medical_license_number, npi, license_expiry_date, license_state_of_issuance, 
        street_address, suite, zip_code, phone, time_zone, medical_specialty, 
        price_range, monthly_volume, ehr_vendor
    ) VALUES (
        v_organization_id, p_medical_license_number, p_npi, p_license_expiry_date, p_license_state_of_issuance,
        p_street_address, p_suite, p_zip_code, p_phone, p_time_zone, p_medical_specialty,
        p_price_range, p_monthly_volume, p_ehr_vendor
    );

    -- 3. Insert into contacts
    INSERT INTO contacts (organization_id, full_name, work_email, mobile)
    VALUES (v_organization_id, p_contact_full_name, p_contact_work_email, p_contact_mobile);

    -- 4. Insert into bank_accounts (with encryption)
    INSERT INTO bank_accounts (
        organization_id, routing_number_encrypted, account_number_encrypted, account_type, bank_name
    ) VALUES (
        v_organization_id,
        pgsodium.crypto_aead_det_encrypt(p_bank_routing_number::bytea, v_additional_data, NULL),
        pgsodium.crypto_aead_det_encrypt(p_bank_account_number::bytea, v_additional_data, NULL),
        p_bank_account_type,
        pgsodium.crypto_aead_det_encrypt(p_bank_name::bytea, v_additional_data, NULL)
    );

    -- 5. Insert into beneficial_owners (with encryption)
    INSERT INTO beneficial_owners (
        organization_id, full_legal_name_encrypted, dob_encrypted, ssn_last4_encrypted, 
        home_address_encrypted, ownership_percent
    ) VALUES (
        v_organization_id,
        pgsodium.crypto_aead_det_encrypt(p_owner_full_legal_name::bytea, v_additional_data, NULL),
        pgsodium.crypto_aead_det_encrypt(p_owner_dob::bytea, v_additional_data, NULL),
        pgsodium.crypto_aead_det_encrypt(p_owner_ssn_last4::bytea, v_additional_data, NULL),
        pgsodium.crypto_aead_det_encrypt(p_owner_home_address::bytea, v_additional_data, NULL),
        p_owner_ownership_percent
    );

    -- 6. Insert into agreements
    INSERT INTO agreements (organization_id, agreed_to_terms, agreed_to_ach, certified_accuracy)
    VALUES (v_organization_id, p_agreed_to_terms, p_agreed_to_ach, p_certified_accuracy);

    -- Return the ID of the newly created organization
    RETURN v_organization_id;
END;
$$;
