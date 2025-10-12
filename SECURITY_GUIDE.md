# Security Quick Reference Guide for Developers

## Critical Security Rules

### ❌ NEVER
1. **NEVER** commit secrets, API keys, or passwords to git
2. **NEVER** log sensitive data (SSN, passwords, bank accounts, PHI)
3. **NEVER** trust user input - always validate
4. **NEVER** expose internal error details to users
5. **NEVER** use `dangerouslySetInnerHTML` with user data
6. **NEVER** disable security features in production
7. **NEVER** hardcode credentials
8. **NEVER** bypass authentication/authorization checks

### ✅ ALWAYS
1. **ALWAYS** validate input on the server (never trust client)
2. **ALWAYS** use parameterized queries (Supabase client does this)
3. **ALWAYS** check authorization before data access
4. **ALWAYS** encrypt sensitive data at rest
5. **ALWAYS** use HTTPS in production
6. **ALWAYS** implement proper error handling
7. **ALWAYS** add audit logging for sensitive operations
8. **ALWAYS** follow principle of least privilege

---

## Common Security Patterns

### 1. Input Validation

**❌ Wrong:**
```typescript
export async function createPatient(data: any) {
  // No validation!
  return await supabase.from('patients').insert(data);
}
```

**✅ Correct:**
```typescript
import { z } from 'zod';

const patientSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
  dateOfBirth: z.string().datetime(),
});

export async function createPatient(data: unknown) {
  // Validate first
  const validData = patientSchema.parse(data);
  
  // Then use validated data
  return await supabase.from('patients').insert(validData);
}
```

### 2. Authentication Check

**❌ Wrong:**
```typescript
export async function getPatient(id: string) {
  // No auth check!
  return await supabase.from('patients').select('*').eq('id', id);
}
```

**✅ Correct:**
```typescript
import { auth } from '@clerk/nextjs/server';

export async function getPatient(id: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }
  
  // RLS policies will enforce org-level access
  return await supabase.from('patients').select('*').eq('id', id);
}
```

### 3. Authorization Check

**❌ Wrong:**
```typescript
export async function deletePatient(id: string) {
  // No permission check!
  return await supabase.from('patients').delete().eq('id', id);
}
```

**✅ Correct:**
```typescript
export async function deletePatient(id: string) {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error('Unauthorized');
  }
  
  // Check permission
  const hasPermission = await checkPermission(userId, 'patients.delete');
  if (!hasPermission) {
    throw new Error('Forbidden: Insufficient permissions');
  }
  
  // Log the action
  await logAudit({
    action: 'delete',
    resource: 'patient',
    resourceId: id,
    userId,
  });
  
  return await supabase.from('patients').delete().eq('id', id);
}
```

### 4. Error Handling

**❌ Wrong:**
```typescript
try {
  await processPayment(data);
} catch (error) {
  // Exposes internals!
  return { error: error.message };
}
```

**✅ Correct:**
```typescript
try {
  await processPayment(data);
  return { success: true };
} catch (error) {
  // Log detailed error
  logger.error('Payment processing failed', error, { userId, paymentId });
  
  // Return generic error to user
  return { 
    success: false,
    error: 'Payment processing failed. Please try again or contact support.',
    errorCode: 'PAYMENT_FAILED'
  };
}
```

### 5. Sensitive Data Handling

**❌ Wrong:**
```typescript
console.log('Processing payment:', {
  amount: payment.amount,
  accountNumber: payment.accountNumber, // NEVER log this!
});
```

**✅ Correct:**
```typescript
import { redactSensitiveData } from '@/lib/security';

logger.info('Processing payment:', {
  amount: payment.amount,
  accountNumber: '****' + payment.accountNumber.slice(-4),
  paymentId: payment.id,
});
```

### 6. SQL Injection Prevention

**❌ Wrong (if using raw SQL):**
```typescript
// DON'T DO THIS - vulnerable to SQL injection
const query = `SELECT * FROM patients WHERE email = '${userInput}'`;
```

**✅ Correct:**
```typescript
// Use Supabase client (parameterized automatically)
const { data } = await supabase
  .from('patients')
  .select('*')
  .eq('email', userInput);
```

### 7. XSS Prevention

**❌ Wrong:**
```tsx
// Vulnerable to XSS
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**✅ Correct:**
```tsx
// React escapes by default
<div>{userInput}</div>

// Or sanitize if HTML needed
import DOMPurify from 'isomorphic-dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />
```

### 8. File Upload Security

**❌ Wrong:**
```typescript
async function uploadFile(file: File) {
  // No validation!
  return await storage.upload(file);
}
```

**✅ Correct:**
```typescript
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

async function uploadFile(file: File) {
  // Validate type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type');
  }
  
  // Validate size
  if (file.size > MAX_SIZE) {
    throw new Error('File too large');
  }
  
  // Sanitize filename
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  
  // Generate unique name to prevent overwrite
  const uniqueName = `${crypto.randomUUID()}-${safeName}`;
  
  return await storage.upload(uniqueName, file);
}
```

### 9. Redirect Validation

**❌ Wrong:**
```typescript
// Open redirect vulnerability
const redirectUrl = req.query.redirect;
return redirect(redirectUrl);
```

**✅ Correct:**
```typescript
const ALLOWED_REDIRECTS = ['/dashboard', '/patients', '/claims'];

function isValidRedirect(url: string): boolean {
  try {
    const parsed = new URL(url, 'http://localhost');
    return ALLOWED_REDIRECTS.some(allowed => 
      parsed.pathname.startsWith(allowed)
    );
  } catch {
    return false;
  }
}

const redirectUrl = req.query.redirect;
const safeUrl = isValidRedirect(redirectUrl) ? redirectUrl : '/dashboard';
return redirect(safeUrl);
```

### 10. Environment Variables

**❌ Wrong:**
```typescript
// Using ! without validation
const apiKey = process.env.API_KEY!;
```

**✅ Correct:**
```typescript
import { z } from 'zod';

const envSchema = z.object({
  API_KEY: z.string().min(1),
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

// Validate at startup
export const env = envSchema.parse(process.env);

// Use validated env
const apiKey = env.API_KEY;
```

---

## Security Checklist for Pull Requests

Before submitting a PR, verify:

- [ ] No secrets in code (API keys, passwords, tokens)
- [ ] Input validation on all user-provided data
- [ ] Authentication check on protected operations
- [ ] Authorization check for privileged operations
- [ ] Error handling doesn't expose internals
- [ ] Sensitive data not logged
- [ ] SQL injection prevention (use Supabase client)
- [ ] XSS prevention (sanitize HTML if needed)
- [ ] CSRF protection for state-changing operations
- [ ] File uploads validated (type, size, content)
- [ ] Redirects validated (no open redirects)
- [ ] Rate limiting on new API endpoints
- [ ] Audit logging for sensitive operations
- [ ] Database RLS policies for new tables
- [ ] Environment variables validated
- [ ] Dependencies up to date (`npm audit`)

---

## Security Review Triggers

Request security review when:

1. **Authentication/Authorization Changes**
   - New login flow
   - Permission system changes
   - Role modifications

2. **Data Access Changes**
   - New database tables
   - RLS policy modifications
   - Data export features

3. **External Integrations**
   - New API integrations
   - Webhook endpoints
   - Third-party services

4. **Payment Processing**
   - Payment flow changes
   - Financial data handling
   - Refund processing

5. **Sensitive Data**
   - PHI/PII handling
   - Encryption changes
   - Data retention policies

---

## Quick Security Tools

### Run Before Commit
```bash
# Check for secrets
npm run check-secrets

# Audit dependencies
npm audit

# Type check
npm run type-check

# Lint with security rules
npm run lint
```

### Local Security Testing
```bash
# Test with OWASP ZAP
docker run -t owasp/zap2docker-stable zap-baseline.py \
  -t http://localhost:3000

# Check security headers
curl -I http://localhost:3000
```

---

## Common Vulnerabilities to Avoid

### 1. SQL Injection
- ✅ Use Supabase client (parameterized queries)
- ❌ Don't construct raw SQL with user input

### 2. XSS (Cross-Site Scripting)
- ✅ React escapes by default
- ❌ Don't use `dangerouslySetInnerHTML` with user data

### 3. CSRF (Cross-Site Request Forgery)
- ✅ Use Clerk's CSRF protection
- ❌ Don't accept state changes without CSRF token

### 4. IDOR (Insecure Direct Object Reference)
- ✅ Always check user owns the resource
- ❌ Don't trust ID parameters from client

### 5. Authentication Bypass
- ✅ Check auth on every protected route
- ❌ Don't assume frontend enforces auth

### 6. Broken Access Control
- ✅ Implement RLS policies
- ❌ Don't rely on client-side authorization

### 7. Information Disclosure
- ✅ Generic error messages to users
- ❌ Don't expose stack traces or internals

### 8. Sensitive Data Exposure
- ✅ Encrypt at rest, TLS in transit
- ❌ Don't log sensitive data

---

## Resources

### Documentation
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [OWASP Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [Clerk Security](https://clerk.com/docs/security)
- [Supabase Security](https://supabase.com/docs/guides/platform/security)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)

### Internal
- [Security Audit Report](./SECURITY_AUDIT.md)
- [Security Checklist](./SECURITY_CHECKLIST.md)
- [Incident Response Plan](./docs/incident-response.md) *(to be created)*

### Training
- OWASP Top 10 training
- Secure coding practices
- HIPAA compliance training
- Incident response procedures

---

## Getting Help

### Questions?
- **Security Team:** security@healthpay.com
- **Slack:** #security channel
- **Office Hours:** Wednesdays 2-3 PM

### Report a Vulnerability
1. **DO NOT** create a public GitHub issue
2. Email: security@healthpay.com
3. Include: description, steps to reproduce, impact
4. We'll respond within 24 hours

---

**Last Updated:** October 12, 2025  
**Maintainer:** Security Team  
**Version:** 1.0
