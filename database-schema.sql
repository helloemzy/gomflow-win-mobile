-- GOMFLOW Indonesian Coffee Group Buying Platform
-- Database Schema (3 tables as specified in CLAUDE.md)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Influencers table
CREATE TABLE IF NOT EXISTS influencers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  tiktok_handle VARCHAR(100) UNIQUE,
  commission_rate DECIMAL(5,2) DEFAULT 15.00 NOT NULL CHECK (commission_rate >= 0 AND commission_rate <= 100),
  status VARCHAR(20) DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  influencer_id UUID NOT NULL REFERENCES influencers(id) ON DELETE CASCADE,
  coffee_product VARCHAR(255) NOT NULL,
  target_quantity INTEGER NOT NULL CHECK (target_quantity > 0),
  current_quantity INTEGER DEFAULT 0 NOT NULL CHECK (current_quantity >= 0),
  deadline TIMESTAMP WITH TIME ZONE NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
  price_per_kg DECIMAL(10,2) NOT NULL CHECK (price_per_kg > 0),
  discount_threshold_1 INTEGER DEFAULT 25 NOT NULL,
  discount_threshold_2 INTEGER DEFAULT 50 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  customer_email VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
  shared_status BOOLEAN DEFAULT FALSE NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending' NOT NULL CHECK (payment_status IN ('pending', 'completed', 'failed')),
  stripe_payment_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_influencers_email ON influencers(email);
CREATE INDEX IF NOT EXISTS idx_influencers_status ON influencers(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_influencer_id ON campaigns(influencer_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_deadline ON campaigns(deadline);
CREATE INDEX IF NOT EXISTS idx_orders_campaign_id ON orders(campaign_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update triggers to all tables
CREATE TRIGGER update_influencers_updated_at 
  BEFORE UPDATE ON influencers 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at 
  BEFORE UPDATE ON campaigns 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at 
  BEFORE UPDATE ON orders 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (will be refined during authentication implementation)
-- For now, allow all authenticated users to read and manage their own data

-- Influencers can manage their own profiles
CREATE POLICY "Influencers can manage their own data" ON influencers
  FOR ALL USING (auth.email() = email);

-- Campaigns can be read by anyone, managed by the owner
CREATE POLICY "Anyone can view campaigns" ON campaigns
  FOR SELECT USING (status = 'active');

CREATE POLICY "Influencers can manage their own campaigns" ON campaigns
  FOR ALL USING (EXISTS (
    SELECT 1 FROM influencers 
    WHERE influencers.id = campaigns.influencer_id 
    AND influencers.email = auth.email()
  ));

-- Orders can be read by campaign owners and order creators
CREATE POLICY "Campaign owners can view their orders" ON orders
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM campaigns 
    JOIN influencers ON campaigns.influencer_id = influencers.id
    WHERE campaigns.id = orders.campaign_id 
    AND influencers.email = auth.email()
  ));

CREATE POLICY "Customers can view their own orders" ON orders
  FOR SELECT USING (customer_email = auth.email());

-- Insert sample data for testing (optional)
INSERT INTO influencers (email, tiktok_handle, commission_rate, status) VALUES
  ('test@example.com', 'coffee_lover_jkt', 15.00, 'active')
ON CONFLICT (email) DO NOTHING;