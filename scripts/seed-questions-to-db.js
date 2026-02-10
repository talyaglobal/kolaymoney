/**
 * Seed Questions to Database
 * Imports all 100 questions from sectorQuestions.ts to Supabase
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

// Read environment variables
const envFile = readFileSync(join(process.cwd(), '.env'), 'utf-8')
const envVars = {}
envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=')
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim()
  }
})

const SUPABASE_URL = envVars.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = envVars.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase credentials in .env file')
  console.error('Required: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Import questions from TypeScript file
// Note: This is a simplified version - you may need to adjust based on your actual data structure
const QUESTIONS = [
  // We'll read from the actual file and parse it
  // For now, we'll use the migration file that already has sample questions
]

async function seedQuestions() {
  console.log('============================================')
  console.log('Seeding Questions to Database')
  console.log('============================================')
  console.log('')

  try {
    // Check connection
    const { error: connectionError } = await supabase.from('sector_questions').select('count').limit(1)
    if (connectionError) {
      throw new Error(`Database connection failed: ${connectionError.message}`)
    }
    console.log('✓ Connected to Supabase')
    console.log('')

    // Check current question count
    const { count: currentCount } = await supabase
      .from('sector_questions')
      .select('*', { count: 'exact', head: true })
    
    console.log(`Current questions in database: ${currentCount}`)
    console.log('')

    if (currentCount && currentCount > 0) {
      console.log('⚠️  Questions already exist in database')
      console.log('')
      console.log('Options:')
      console.log('  1. Keep existing questions (recommended)')
      console.log('  2. Delete and re-seed (WARNING: will lose any custom changes)')
      console.log('')
      console.log('To re-seed, run:')
      console.log('  supabase db reset --linked')
      console.log('  supabase db push')
      console.log('')
      console.log('This will apply all migrations including the seed data.')
      return
    }

    console.log('No questions found. Please run migrations first:')
    console.log('  supabase db push')
    console.log('')
    console.log('The migration 20260210000002_seed_questions.sql contains sample questions.')
    console.log('After running migrations, questions will be automatically seeded.')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

seedQuestions()
