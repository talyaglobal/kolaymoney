# Getting Started with KolayMoney.com

## 🚀 Quick Setup Guide

### Step 1: Install Dependencies

```bash
pnpm install
```

### Step 2: Get Supabase Anon Key

The `.env.local` file needs the correct anon key. Get it from Supabase dashboard:

1. Go to https://supabase.com/dashboard
2. Select your project: `clxetzarfvpzdwxjmmcw`
3. Go to Settings > API
4. Copy the `anon` `public` key
5. Update `.env.local`:

```env
VITE_SUPABASE_URL=https://clxetzarfvpzdwxjmmcw.supabase.co
VITE_SUPABASE_ANON_KEY=<paste-your-anon-key-here>
```

### Step 3: Verify Migrations

Check that all migrations are applied:

```bash
# View migration status
supabase db status

# If migrations not applied, push them
supabase db push
```

You should see:
- ✅ 20260209000001_initial_schema.sql
- ✅ 20260209000002_rls_policies.sql
- ✅ 20260209000003_seed_data.sql

### Step 4: Create First Admin User

1. Go to Supabase Dashboard > Authentication > Users
2. Click "Add User" > "Create new user"
3. Enter email and password
4. Click "Create user"
5. Copy the User ID (UUID)
6. Go to SQL Editor and run:

```sql
SELECT public.create_admin_user(
  'PASTE_USER_ID_HERE'::uuid,
  'Your Full Name',
  'your-email@example.com',
  'super_admin'::admin_role
);
```

### Step 5: Start Development Server

```bash
pnpm dev
```

Server will start at: http://localhost:3000

## 🧪 Test the Application

### Test 1: Submit Application

1. Navigate to http://localhost:3000/basvuru
2. Fill the form:
   - Company Name: Test Şirketi A.Ş.
   - Tax Number: 1234567890
   - Contact Person: Ahmet Yılmaz
   - Email: test@kolaymoney.com
   - Phone: +905551234567
   - Sector: Perakende
   - Financing Amount: 1000000
   - Receivables Type: Faturalar
   - Payment Terms: 12 months
3. Submit and verify success message

### Test 2: Admin Login

1. Navigate to http://localhost:3000/admin/login
2. Login with the admin credentials you created
3. You should see the dashboard with statistics

### Test 3: Manage Applications

1. In admin dashboard, click "Başvurular"
2. You should see the test application you submitted
3. Click "Detay →" to view details
4. Update the status to "under_review"
5. Add some notes
6. Click "Durumu Güncelle"
7. Verify changes are saved

## 🔍 Verify RLS Policies

Go to Supabase Dashboard > SQL Editor and test:

### Test Public Can Insert
```sql
-- Switch to anon role
SET ROLE anon;

-- This should work
INSERT INTO public.applications (
  company_name, tax_number, contact_person,
  email, phone, sector, financing_amount,
  receivables_type, payment_terms_months
) VALUES (
  'RLS Test Company', '9999999999', 'Test Person',
  'rls@test.com', '+905559999999', 'b2c_retail',
  500000, 'invoices', 6
);

-- Reset role
RESET ROLE;
```

### Test Public Cannot Select
```sql
-- Switch to anon role
SET ROLE anon;

-- This should FAIL with permission denied
SELECT * FROM public.applications;

-- Reset role
RESET ROLE;
```

### Test Admin Can Select
```sql
-- As authenticated admin, this should work
SELECT * FROM public.applications;
```

## 📊 Check Database Tables

```sql
-- List all tables
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public';

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- List all policies
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public';

-- Count applications
SELECT COUNT(*) FROM public.applications;

-- Count admin users
SELECT COUNT(*) FROM public.admin_users;
```

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution**: Make sure `.env.local` has correct values:
```env
VITE_SUPABASE_URL=https://clxetzarfvpzdwxjmmcw.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

### Issue: "Permission denied" when submitting form

**Solution**: Check RLS policies are applied:
```bash
supabase db push
```

### Issue: "Cannot login as admin"

**Solution**: Make sure admin user was created:
```sql
SELECT * FROM public.admin_users;
```

If empty, create admin user using the SQL command above.

### Issue: TypeScript errors

**Solution**: Regenerate types:
```bash
supabase gen types typescript --linked > src/lib/supabase/types.ts
```

### Issue: "Rate limit exceeded"

**Solution**: Wait 15 minutes or clear browser localStorage:
```javascript
localStorage.clear()
```

## 📝 Next Steps

1. ✅ Verify all tests pass
2. ✅ Create more admin users if needed
3. ✅ Test rate limiting (submit 4 times)
4. ✅ Test duplicate prevention (same email + tax number)
5. ✅ Test real-time updates (open 2 admin windows)

## 🎯 Production Checklist

Before deploying to production:

- [ ] Update CORS settings in Supabase
- [ ] Configure custom domain
- [ ] Set up SMTP for emails
- [ ] Enable error tracking (Sentry)
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test on mobile devices
- [ ] Run security audit
- [ ] Load testing
- [ ] Documentation review

## 📞 Need Help?

- Check README.md for detailed documentation
- Check IMPLEMENTATION_SUMMARY.md for architecture overview
- Check verify-setup.md for testing guide

Contact:
- Email: info@talya.vc
- Phone: +90 542 794 30 77
