#!/bin/bash

# ============================================
# Apply Supabase Migrations Script
# ============================================

set -e  # Exit on error

echo "============================================"
echo "KolayMoney.com - Database Migration Script"
echo "============================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI is not installed${NC}"
    echo "Install it with: npm install -g supabase"
    exit 1
fi

echo -e "${GREEN}✓ Supabase CLI found${NC}"
echo ""

# Check if we're in the right directory
if [ ! -d "supabase/migrations" ]; then
    echo -e "${RED}❌ supabase/migrations directory not found${NC}"
    echo "Please run this script from the project root"
    exit 1
fi

echo -e "${GREEN}✓ Migrations directory found${NC}"
echo ""

# Ask user to confirm
echo -e "${YELLOW}This will apply all migrations to your Supabase database.${NC}"
echo "Make sure you have:"
echo "  1. Linked your Supabase project (supabase link)"
echo "  2. Backed up your database if needed"
echo ""
read -p "Continue? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Aborted."
    exit 0
fi

echo ""
echo "============================================"
echo "Step 1: Checking Supabase connection"
echo "============================================"

if ! supabase status &> /dev/null; then
    echo -e "${YELLOW}⚠ Not linked to a Supabase project${NC}"
    echo ""
    read -p "Enter your Supabase project ref: " PROJECT_REF
    
    if [ -z "$PROJECT_REF" ]; then
        echo -e "${RED}❌ Project ref is required${NC}"
        exit 1
    fi
    
    echo "Linking to project..."
    supabase link --project-ref "$PROJECT_REF"
fi

echo -e "${GREEN}✓ Connected to Supabase${NC}"
echo ""

echo "============================================"
echo "Step 2: Applying migrations"
echo "============================================"

# List migrations
echo "Migrations to apply:"
ls -1 supabase/migrations/*.sql | while read file; do
    echo "  - $(basename "$file")"
done
echo ""

# Apply migrations
echo "Pushing migrations to database..."
if supabase db push; then
    echo -e "${GREEN}✓ Migrations applied successfully${NC}"
else
    echo -e "${RED}❌ Migration failed${NC}"
    exit 1
fi

echo ""
echo "============================================"
echo "Step 3: Verifying schema"
echo "============================================"

# Run verification query
echo "Checking tables..."
TABLES=$(supabase db query "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;" --csv | tail -n +2)

if [ -z "$TABLES" ]; then
    echo -e "${RED}❌ No tables found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Tables found:${NC}"
echo "$TABLES" | while read table; do
    echo "  - $table"
done

echo ""
echo "Checking record counts..."
supabase db query "
SELECT 
  'applications' as table_name, COUNT(*) as count FROM applications
UNION ALL
SELECT 'compliance_applications', COUNT(*) FROM compliance_applications
UNION ALL
SELECT 'sector_questions', COUNT(*) FROM sector_questions
UNION ALL
SELECT 'admin_users', COUNT(*) FROM admin_users
ORDER BY table_name;
"

echo ""
echo "============================================"
echo "Step 4: Generating TypeScript types"
echo "============================================"

echo "Generating types..."
if supabase gen types typescript --linked > src/lib/supabase/types.ts; then
    echo -e "${GREEN}✓ Types generated: src/lib/supabase/types.ts${NC}"
else
    echo -e "${YELLOW}⚠ Failed to generate types (you may need to do this manually)${NC}"
fi

echo ""
echo "============================================"
echo "✅ Migration Complete!"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Review the generated types in src/lib/supabase/types.ts"
echo "  2. Test your application"
echo "  3. Verify data in Supabase Dashboard"
echo ""
echo "Useful commands:"
echo "  supabase db diff     - Check for schema changes"
echo "  supabase db reset    - Reset database (WARNING: deletes all data)"
echo "  supabase db query    - Run SQL queries"
echo ""
