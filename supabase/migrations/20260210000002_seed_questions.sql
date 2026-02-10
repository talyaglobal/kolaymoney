-- Seed sector questions from frontend data
-- This migration inserts all 100 questions into the database

-- Note: In production, you would parse the sectorQuestions.ts file
-- For now, we'll insert a few sample questions to verify the system works

-- Sample questions for testing (will be replaced with full 100 questions)
INSERT INTO public.sector_questions (
  sector_slug,
  question_text,
  question_type,
  options,
  weight,
  category,
  is_required,
  order_index,
  is_active,
  help_text
) VALUES
-- Beyaz Eşya - Sample
('beyaz-esya', 'Şirketinizin faaliyet süresi kaç yıldır?', 'single_choice', 
 '[{"id":"1","label":"0-1 yıl","score":20},{"id":"2","label":"1-3 yıl","score":60},{"id":"3","label":"3-5 yıl","score":80},{"id":"4","label":"5+ yıl","score":100}]'::jsonb,
 8, 'experience', true, 1, true, 'Minimum 6 aylık faaliyet gereklidir'),

('beyaz-esya', 'Yıllık cirosunuz hangi aralıkta?', 'single_choice',
 '[{"id":"1","label":"0-5M TL","score":30},{"id":"2","label":"5-10M TL","score":70},{"id":"3","label":"10-25M TL","score":90},{"id":"4","label":"25M+ TL","score":100}]'::jsonb,
 10, 'financial', true, 2, true, 'Minimum 5M TL yıllık ciro şartı'),

-- Elektronik - Sample
('elektronik', 'Elektronik sektöründe kaç yıldır faaliyet gösteriyorsunuz?', 'single_choice',
 '[{"id":"1","label":"0-1 yıl","score":20},{"id":"2","label":"1-3 yıl","score":60},{"id":"3","label":"3-5 yıl","score":80},{"id":"4","label":"5+ yıl","score":100}]'::jsonb,
 8, 'experience', true, 1, true, null),

('elektronik', 'Yıllık cirosunuz?', 'single_choice',
 '[{"id":"1","label":"0-5M TL","score":30},{"id":"2","label":"5-15M TL","score":70},{"id":"3","label":"15-40M TL","score":90},{"id":"4","label":"40M+ TL","score":100}]'::jsonb,
 10, 'financial', true, 2, true, null);

-- Note: Full 100 questions should be seeded here
-- This is a minimal seed for testing purposes
