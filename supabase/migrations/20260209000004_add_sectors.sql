-- Add new sectors to sector_type enum
-- Migration: Add comprehensive sector list

-- Add new B2C sectors
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2c_healthcare';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2c_hospitality';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2c_food_beverage';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2c_fashion';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2c_electronics';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2c_home_garden';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2c_sports';

-- Add new B2B sectors
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2b_manufacturing';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2b_wholesale';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2b_technology';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2b_energy';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2b_agriculture';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2b_chemicals';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'b2b_mining';

-- Add service sectors
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'services_consulting';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'services_marketing';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'services_finance';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'services_legal';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'services_hr';
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'services_it';

-- Add other category
ALTER TYPE sector_type ADD VALUE IF NOT EXISTS 'other';

-- Comment for documentation
COMMENT ON TYPE sector_type IS 'Comprehensive sector classification for VDMK applications: B2C, B2B, Services, and Other categories';
