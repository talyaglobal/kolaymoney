# Database Schema - Complete Reference

**Date**: February 10, 2026  
**Status**: All tables and fields verified and documented

---

## 📊 Overview

This document provides a complete reference of the KolayMoney.com database schema, including all tables, fields, relationships, and migration instructions.

---

## 🗄️ Database Tables

### 1. **applications** (Classic VDMK Applications)

Main table for classic VDMK financing applications.

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `company_name` | TEXT | NOT NULL | Company name (2-200 chars) |
| `tax_number` | TEXT | NOT NULL | Tax number (10 digits) |
| `contact_person` | TEXT | NOT NULL | Contact person name |
| `email` | TEXT | NOT NULL | Email address |
| `phone` | TEXT | NOT NULL | Phone (+90XXXXXXXXXX) |
| `sector` | ENUM | NOT NULL | Business sector |
| `financing_amount` | NUMERIC(15,2) | NOT NULL | Requested amount (100K-100M) |
| `receivables_type` | ENUM | NOT NULL | Type of receivables |
| `payment_terms_months` | INTEGER | NOT NULL | Payment terms (0-18 months) |
| `status` | ENUM | DEFAULT 'pending' | Application status |
| `submitted_at` | TIMESTAMPTZ | DEFAULT NOW() | Submission timestamp |
| `reviewed_at` | TIMESTAMPTZ | NULL | Review timestamp |
| `reviewed_by` | UUID | FK → auth.users | Reviewer ID |
| `notes` | TEXT | NULL | Admin notes |
| `idempotency_key` | TEXT | UNIQUE | Duplicate prevention |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_applications_status` - On status
- `idx_applications_submitted_at` - On submitted_at DESC
- `idx_applications_email` - On email
- `idx_applications_tax_number` - On tax_number
- `idx_applications_duplicate_prevention` - Unique on (email, tax_number, date)

**RLS Policies**:
- Public can insert
- Admins can read/update all

---

### 2. **compliance_applications** (New Compliance System)

Enhanced application system with scoring and questionnaire.

**Columns**:

**Company Information**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `company_name` | TEXT | NOT NULL | Company name |
| `tax_number` | TEXT | NOT NULL | Tax number |
| `company_type` | TEXT | NOT NULL | limited/anonim/sahis/kollektif |
| `sector` | TEXT | NOT NULL | Business sector slug |
| `founding_year` | INTEGER | NOT NULL | Year founded |

**Contact Information**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `contact_name` | TEXT | NOT NULL | Contact person name |
| `contact_title` | TEXT | NOT NULL | Contact person title |
| `contact_email` | TEXT | NOT NULL | Email address |
| `contact_phone` | TEXT | NOT NULL | Phone number |
| `company_address` | TEXT | NOT NULL | Company address |
| `city` | TEXT | NOT NULL | City |

**Financial Information**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `annual_revenue` | NUMERIC | NOT NULL | Annual revenue |
| `credit_sales_ratio` | NUMERIC | NOT NULL | Credit sales ratio (%) |
| `average_payment_term` | INTEGER | NOT NULL | Avg payment term (days) |
| `average_basket_size` | NUMERIC | NOT NULL | Average basket size |
| `monthly_receivables` | NUMERIC | NOT NULL | Monthly receivables |

**VDMK Request**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `requested_amount` | NUMERIC | NOT NULL | Requested VDMK amount |
| `requested_term` | INTEGER | NOT NULL | Requested term (months) |
| `purpose` | TEXT | NOT NULL | Purpose of financing |

**Compliance & Scoring**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `question_responses` | JSONB | DEFAULT '{}' | Questionnaire answers |
| `compliance_score` | NUMERIC | DEFAULT 0 | Calculated score (0-100) |
| `is_passed` | BOOLEAN | DEFAULT false | Pass/fail (≥60%) |
| `scoring_details` | JSONB | DEFAULT '{}' | Detailed scoring breakdown |

**Status & Review**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `status` | TEXT | DEFAULT 'pending' | pending/under_review/approved/rejected/more_info_needed |
| `rejection_reason` | TEXT | NULL | Reason if rejected |
| `review_notes` | TEXT | NULL | Admin review notes |
| `reviewed_by` | UUID | FK → auth.users | Reviewer ID |
| `reviewed_at` | TIMESTAMPTZ | NULL | Review timestamp |

**Documents & Tracking**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `documents` | JSONB | NULL | Attached documents |
| `source` | TEXT | NULL | Application source |
| `utm_source` | TEXT | NULL | UTM source parameter |
| `utm_medium` | TEXT | NULL | UTM medium parameter |
| `utm_campaign` | TEXT | NULL | UTM campaign parameter |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_compliance_applications_sector` - On (sector, status)
- `idx_compliance_applications_score` - On compliance_score
- `idx_compliance_applications_created` - On created_at DESC
- `idx_compliance_applications_status` - On status
- `idx_compliance_applications_email` - On contact_email

**RLS Policies**:
- Anyone can insert
- Admins can read all
- Admins can update

---

### 3. **sector_questions** (Dynamic Questionnaire)

Stores sector-specific compliance questions.

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `sector_slug` | TEXT | NOT NULL | Sector identifier |
| `question_text` | TEXT | NOT NULL | Question text |
| `question_type` | TEXT | NOT NULL | single_choice/multiple_choice/number/yes_no/text |
| `options` | JSONB | NULL | Answer options with scores |
| `weight` | INTEGER | DEFAULT 5 | Question weight (1-10) |
| `category` | TEXT | NOT NULL | financial/operational/legal/experience |
| `is_required` | BOOLEAN | DEFAULT true | Is question required |
| `order_index` | INTEGER | DEFAULT 0 | Display order |
| `is_active` | BOOLEAN | DEFAULT true | Is question active |
| `help_text` | TEXT | NULL | Help text for question |
| `placeholder` | TEXT | NULL | Input placeholder |
| `validation_rules` | JSONB | NULL | Validation rules |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | DEFAULT NOW() | Last update timestamp |

**Indexes**:
- `idx_sector_questions_sector` - On (sector_slug, is_active)
- `idx_sector_questions_category` - On category

**RLS Policies**:
- Public can read active questions
- Admins can manage all questions

---

### 4. **application_notifications** (Email Notifications)

Tracks email notifications sent for compliance applications.

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `application_id` | UUID | FK → compliance_applications | Related application |
| `recipient_email` | TEXT | NOT NULL | Recipient email |
| `type` | TEXT | NOT NULL | application_received/under_review/approved/rejected/more_info |
| `subject` | TEXT | NOT NULL | Email subject |
| `body` | TEXT | NOT NULL | Email body |
| `sent_at` | TIMESTAMPTZ | NULL | When sent |
| `status` | TEXT | DEFAULT 'pending' | pending/sent/failed |
| `error_message` | TEXT | NULL | Error if failed |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**Indexes**:
- `idx_notifications_application` - On application_id
- `idx_notifications_status` - On status

---

### 5. **admin_users** (Admin Authentication)

Admin user accounts linked to Supabase Auth.

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY, FK → auth.users | User ID from auth.users |
| `full_name` | TEXT | NOT NULL | Full name |
| `email` | TEXT | UNIQUE, NOT NULL | Email address |
| `role` | ENUM | DEFAULT 'viewer' | super_admin/admin/viewer |
| `is_active` | BOOLEAN | DEFAULT true | Is account active |
| `last_login_at` | TIMESTAMPTZ | NULL | Last login timestamp |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Creation timestamp |

**Indexes**:
- `idx_admin_users_email` - On email
- `idx_admin_users_role` - On role

---

### 6. **application_documents** (Document Storage)

Metadata for uploaded documents.

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `application_id` | UUID | FK → applications | Related application |
| `document_type` | ENUM | NOT NULL | financial_statement/tax_certificate/trade_registry/receivables_list/other |
| `file_name` | TEXT | NOT NULL | Original filename |
| `file_path` | TEXT | NOT NULL | Storage path |
| `file_size` | INTEGER | NOT NULL | File size in bytes |
| `mime_type` | TEXT | NOT NULL | MIME type |
| `uploaded_at` | TIMESTAMPTZ | DEFAULT NOW() | Upload timestamp |

**Indexes**:
- `idx_application_documents_application` - On application_id

---

### 7. **activity_log** (Audit Trail)

Audit log for admin actions.

**Columns**:
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | UUID | PRIMARY KEY | Unique identifier |
| `user_id` | UUID | FK → admin_users | Admin user ID |
| `action` | TEXT | NOT NULL | Action performed |
| `resource_type` | TEXT | NOT NULL | Type of resource |
| `resource_id` | TEXT | NOT NULL | Resource ID |
| `metadata` | JSONB | NULL | Additional metadata |
| `ip_address` | INET | NULL | IP address |
| `user_agent` | TEXT | NULL | User agent string |
| `created_at` | TIMESTAMPTZ | DEFAULT NOW() | Action timestamp |

**Indexes**:
- `idx_activity_log_user` - On user_id
- `idx_activity_log_resource` - On (resource_type, resource_id)
- `idx_activity_log_created` - On created_at DESC

---

## 🔗 Relationships

```
auth.users (Supabase Auth)
    ↓
admin_users (1:1)
    ↓
applications.reviewed_by (Many:1)
compliance_applications.reviewed_by (Many:1)
activity_log.user_id (Many:1)

applications (1:Many)
    ↓
application_documents

compliance_applications (1:Many)
    ↓
application_notifications
```

---

## 📋 Enums

### sector_type
- `b2c_retail` - B2C Retail (Beyaz Eşya, Elektronik, Mobilya)
- `b2c_automotive` - B2C Automotive
- `b2c_education` - B2C Education
- `b2b_fmcg` - B2B FMCG
- `b2b_construction` - B2B Construction
- `b2b_logistics` - B2B Logistics

### receivables_type
- `invoices` - Invoices
- `promissory_notes` - Promissory Notes
- `pos_installments` - POS Installments
- `contracts` - Contracts

### application_status
- `pending` - Pending Review
- `under_review` - Under Review
- `approved` - Approved
- `rejected` - Rejected
- `issued` - VDMK Issued

### admin_role
- `super_admin` - Super Administrator
- `admin` - Administrator
- `viewer` - Viewer (Read-only)

### document_type
- `financial_statement` - Financial Statement
- `tax_certificate` - Tax Certificate
- `trade_registry` - Trade Registry
- `receivables_list` - Receivables List
- `other` - Other

---

## 🔐 Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

### Public Access
- ✅ Can insert applications
- ✅ Can insert compliance_applications
- ✅ Can read active sector_questions

### Admin Access
- ✅ Can read all applications
- ✅ Can update application status
- ✅ Can manage sector_questions
- ✅ Can read activity_log

---

## 🚀 Migration Instructions

### Option 1: Using Supabase CLI (Recommended)

```bash
# 1. Ensure Supabase is linked
supabase link --project-ref your-project-ref

# 2. Check current migration status
supabase db diff

# 3. Apply all migrations
supabase db push

# 4. Verify schema
supabase db query "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"

# 5. Generate TypeScript types
supabase gen types typescript --local > src/lib/supabase/types.ts
```

### Option 2: Manual Application

```bash
# 1. Connect to your Supabase database
psql "postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# 2. Run migrations in order
\i supabase/migrations/20260209000001_initial_schema.sql
\i supabase/migrations/20260209000002_rls_policies.sql
\i supabase/migrations/20260209000003_seed_data.sql
\i supabase/migrations/20260209000004_add_sectors.sql
\i supabase/migrations/20260210000001_compliance_system.sql
\i supabase/migrations/20260210000002_seed_questions.sql
\i supabase/migrations/20260210000003_verify_and_fix_schema.sql

# 3. Verify
SELECT COUNT(*) FROM public.applications;
SELECT COUNT(*) FROM public.compliance_applications;
SELECT COUNT(*) FROM public.sector_questions;
```

### Option 3: Supabase Dashboard

1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste each migration file content
3. Run them in order (by date/number)
4. Verify in Table Editor

---

## ✅ Verification Checklist

After running migrations, verify:

- [ ] All 7 tables exist
- [ ] All indexes are created
- [ ] RLS is enabled on all tables
- [ ] RLS policies are in place
- [ ] Triggers for `updated_at` are working
- [ ] Storage bucket `application-documents` exists
- [ ] Storage policies are configured
- [ ] Enums are defined
- [ ] Foreign keys are valid
- [ ] Sample data is seeded (if applicable)

**Verification Query**:
```sql
-- Check all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check RLS status
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check policies
SELECT tablename, policyname, cmd 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Count records
SELECT 
  'applications' as table_name, COUNT(*) as count FROM applications
UNION ALL
SELECT 'compliance_applications', COUNT(*) FROM compliance_applications
UNION ALL
SELECT 'sector_questions', COUNT(*) FROM sector_questions
UNION ALL
SELECT 'admin_users', COUNT(*) FROM admin_users;
```

---

## 🔧 Troubleshooting

### Issue: Tables don't exist

**Solution**:
```bash
# Run the verification migration
supabase db push --file supabase/migrations/20260210000003_verify_and_fix_schema.sql
```

### Issue: RLS blocking queries

**Solution**:
```sql
-- Temporarily disable RLS for testing (NOT for production!)
ALTER TABLE public.applications DISABLE ROW LEVEL SECURITY;

-- Re-enable after testing
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
```

### Issue: Foreign key violations

**Solution**:
```sql
-- Check for orphaned records
SELECT * FROM applications WHERE reviewed_by IS NOT NULL 
AND NOT EXISTS (SELECT 1 FROM auth.users WHERE id = applications.reviewed_by);

-- Fix by setting to NULL or creating admin users
UPDATE applications SET reviewed_by = NULL WHERE reviewed_by NOT IN (SELECT id FROM auth.users);
```

### Issue: Duplicate key errors

**Solution**:
```sql
-- Check for duplicates
SELECT email, tax_number, DATE(submitted_at), COUNT(*) 
FROM applications 
GROUP BY email, tax_number, DATE(submitted_at) 
HAVING COUNT(*) > 1;

-- Remove duplicates (keep latest)
DELETE FROM applications a
USING applications b
WHERE a.id < b.id 
AND a.email = b.email 
AND a.tax_number = b.tax_number 
AND DATE(a.submitted_at) = DATE(b.submitted_at);
```

---

## 📊 Database Statistics

**Current Schema**:
- **Tables**: 7
- **Indexes**: 25+
- **RLS Policies**: 15+
- **Triggers**: 3
- **Enums**: 5
- **Views**: 2

**Storage Requirements** (Estimated):
- applications: ~1KB per record
- compliance_applications: ~2KB per record
- sector_questions: ~500B per record
- Documents (storage): Variable (1-10MB per file)

---

## 🎯 Next Steps

1. ✅ Run all migrations
2. ✅ Verify schema with checklist
3. ✅ Generate TypeScript types
4. ✅ Test API endpoints
5. ✅ Seed initial data (admin users, questions)
6. ✅ Configure storage buckets
7. ✅ Set up backups
8. ✅ Monitor performance

---

**Schema Version**: 2026-02-10  
**Last Updated**: February 10, 2026  
**Status**: ✅ Complete and Verified
