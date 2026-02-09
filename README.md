# KolayMoney.com - VDMK Alternative Financing Platform

Complete Supabase backend implementation with brutalist design principles.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm
- Supabase account

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 📦 Tech Stack

- **Frontend**: React 19 + Vite 7 + Wouter (routing)
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Styling**: Tailwind CSS 4 (Brutalist design)
- **Validation**: Zod + React Hook Form
- **TypeScript**: 5.6 with strict mode

## 🗄️ Database Schema

### Tables
- **applications** - VDMK başvuruları
- **admin_users** - Admin kullanıcıları (role-based access)
- **application_documents** - Başvuru belgeleri
- **activity_log** - Audit trail

### Security
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Idempotency keys prevent duplicate submissions
- ✅ Rate limiting on form submissions
- ✅ Input validation with Zod schemas
- ✅ SQL injection prevention (parameterized queries)

## 🔐 Authentication & Authorization

### Admin Roles
- **super_admin**: Full access (create/update/delete)
- **admin**: Manage applications (view/update)
- **viewer**: Read-only access

### Creating First Admin User

1. Sign up through Supabase Auth dashboard or use the signup function
2. Get the user ID from `auth.users` table
3. Run this SQL in Supabase SQL Editor:

```sql
SELECT public.create_admin_user(
  'USER_ID_HERE'::uuid,
  'Your Name',
  'admin@kolaymoney.com',
  'super_admin'::admin_role
);
```

## 📝 Application Flow

### Public Flow (No Auth Required)
1. User visits `/basvuru`
2. Fills multi-step form with validation
3. Submits application (with rate limiting)
4. Receives confirmation with application ID

### Admin Flow (Auth Required)
1. Admin logs in at `/admin/login`
2. Views dashboard with statistics
3. Manages applications (view/update status/add notes)
4. Real-time updates via Supabase subscriptions

## 🧪 Testing Checklist

### Database & RLS Policies

```bash
# Check if migrations applied
supabase db status

# Verify RLS is enabled
supabase db query --sql "
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true;
"

# Check policies exist
supabase db query --sql "
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';
"
```

### Form Submission Test

1. ✅ Navigate to `/basvuru`
2. ✅ Fill form with valid data
3. ✅ Submit and verify success message
4. ✅ Check Supabase dashboard for new record
5. ✅ Try duplicate submission (should be blocked by idempotency)
6. ✅ Try 4th submission within 15 min (should be rate limited)

### Admin Dashboard Test

1. ✅ Create admin user (see above)
2. ✅ Login at `/admin/login`
3. ✅ Verify dashboard loads with stats
4. ✅ View applications list
5. ✅ Open application detail
6. ✅ Update status and add notes
7. ✅ Verify changes persist
8. ✅ Logout and verify redirect

### RLS Policy Verification

```bash
# Test public can INSERT applications
supabase db query --sql "
SET ROLE anon;
INSERT INTO public.applications (
  company_name, tax_number, contact_person, 
  email, phone, sector, financing_amount, 
  receivables_type, payment_terms_months
) VALUES (
  'Test Company', '1234567890', 'Test Person',
  'test@test.com', '+905551234567', 'b2c_retail',
  1000000, 'invoices', 12
);
"

# Test anon CANNOT SELECT applications (should fail)
supabase db query --sql "
SET ROLE anon;
SELECT * FROM public.applications;
"
```

## 🎨 Design System (Brutalist)

### Colors
- Primary: `#0047FF` (Electric Blue)
- Background: `#FFFFFF` (Pure White)
- Foreground: `#000000` (Pure Black)
- Border: `#000000` (Black, 2px minimum)

### Typography
- Headings: Inter 900 (64px, 32px, 24px)
- Body: Inter 400 (18px)
- Mono: Roboto Mono 500 (16px) - for data/labels

### Principles
- ❌ No rounded corners (border-radius: 0)
- ❌ No gradients or shadows (except hover)
- ✅ Thick borders (2px minimum)
- ✅ Sharp, direct interactions
- ✅ Monospace fonts for data

## 📁 Project Structure

```
src/
├── components/
│   ├── forms/
│   │   └── VDMKApplicationForm.tsx    # Multi-step form
│   ├── admin/
│   │   ├── AdminLayout.tsx            # Admin layout with nav
│   │   ├── ApplicationsList.tsx       # Applications table
│   │   └── ApplicationDetail.tsx      # Single application view
│   └── ui/                            # shadcn/ui components
├── contexts/
│   └── AuthContext.tsx                # Global auth state
├── hooks/
│   ├── useAuth.ts                     # Authentication hook
│   ├── useApplication.ts              # Single application operations
│   └── useApplications.ts             # List + real-time subscriptions
├── lib/
│   ├── supabase/
│   │   ├── client.ts                  # Supabase client
│   │   └── types.ts                   # Generated DB types
│   ├── validations/
│   │   └── application.ts             # Zod schemas
│   └── utils/
│       ├── constants.ts               # App constants
│       ├── format.ts                  # Formatting utilities
│       ├── rateLimit.ts               # Client-side rate limiting
│       └── errorHandling.ts           # Error utilities
├── pages/
│   ├── ApplicationPage.tsx            # Public application form
│   └── admin/
│       ├── Login.tsx                  # Admin login
│       ├── Dashboard.tsx              # Admin dashboard
│       └── Applications.tsx           # Applications management
├── App.tsx                            # Routes
└── main.tsx                           # Entry point
```

## 🔧 Environment Variables

```env
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Server-side only (never expose to client)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🚨 Security Best Practices Implemented

### Backend Engineering Principles

1. **Data Integrity**
   - ✅ Foreign key constraints
   - ✅ Check constraints on all fields
   - ✅ Unique constraints (email + tax_number + date)
   - ✅ NOT NULL on required fields

2. **Idempotency**
   - ✅ Idempotency keys on applications
   - ✅ Duplicate submission prevention (same day)
   - ✅ Cached responses for retries

3. **Rate Limiting**
   - ✅ Client-side rate limiting (3 attempts / 15 min)
   - ✅ Exponential backoff on retries
   - ✅ Per-user limits (email + tax_number)

4. **Input Validation**
   - ✅ Zod runtime validation
   - ✅ Database-level constraints
   - ✅ Regex patterns for phone/tax number
   - ✅ File size/type validation (10MB max)

5. **Error Handling**
   - ✅ Typed error classes
   - ✅ User-friendly error messages
   - ✅ Error logging (dev console)
   - ✅ Supabase error parsing

6. **Audit Trail**
   - ✅ Activity log for all admin actions
   - ✅ Timestamps on all tables
   - ✅ Soft deletes (status changes)
   - ✅ Immutable logs

## 📊 Performance Optimizations

- ✅ Pagination (max 50 per page)
- ✅ Indexes on frequently queried columns
- ✅ Real-time subscriptions (not polling)
- ✅ Eager loading with `include`
- ✅ No N+1 queries

## 🐛 Common Issues & Solutions

### Migration Errors

```bash
# Reset local database
supabase db reset

# Re-apply migrations
supabase db push
```

### Type Generation Issues

```bash
# Regenerate types from remote database
supabase gen types typescript --linked > src/lib/supabase/types.ts
```

### RLS Policy Debugging

```sql
-- Check current role
SELECT current_user, current_role;

-- Test policy as specific role
SET ROLE authenticated;
SELECT * FROM applications;
```

## 📞 Support

- **Email**: hq@talya.vc
- **Phone**: +90 555 868 16 34
- **Website**: www.kolaymoney.com

## 📄 License

Proprietary - KolayMoney.com / Talya Smart
