// Database schema types based on CLAUDE.md specifications
export interface Database {
  public: {
    Tables: {
      influencers: {
        Row: {
          id: string
          email: string
          tiktok_handle: string | null
          commission_rate: number
          status: 'pending' | 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          tiktok_handle?: string | null
          commission_rate?: number
          status?: 'pending' | 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          tiktok_handle?: string | null
          commission_rate?: number
          status?: 'pending' | 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          influencer_id: string
          coffee_product: string
          target_quantity: number
          current_quantity: number
          deadline: string
          status: 'draft' | 'active' | 'completed' | 'cancelled'
          price_per_kg: number
          discount_threshold_1: number
          discount_threshold_2: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          influencer_id: string
          coffee_product: string
          target_quantity: number
          current_quantity?: number
          deadline: string
          status?: 'draft' | 'active' | 'completed' | 'cancelled'
          price_per_kg: number
          discount_threshold_1?: number
          discount_threshold_2?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          influencer_id?: string
          coffee_product?: string
          target_quantity?: number
          current_quantity?: number
          deadline?: string
          status?: 'draft' | 'active' | 'completed' | 'cancelled'
          price_per_kg?: number
          discount_threshold_1?: number
          discount_threshold_2?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          campaign_id: string
          customer_email: string
          quantity: number
          amount: number
          shared_status: boolean
          payment_status: 'pending' | 'completed' | 'failed'
          stripe_payment_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          customer_email: string
          quantity: number
          amount: number
          shared_status?: boolean
          payment_status?: 'pending' | 'completed' | 'failed'
          stripe_payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          customer_email?: string
          quantity?: number
          amount?: number
          shared_status?: boolean
          payment_status?: 'pending' | 'completed' | 'failed'
          stripe_payment_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}