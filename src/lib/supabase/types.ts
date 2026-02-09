export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: unknown
          metadata: Json | null
          resource_id: string
          resource_type: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          resource_id: string
          resource_type: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: unknown
          metadata?: Json | null
          resource_id?: string
          resource_type?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          last_login_at: string | null
          role: Database["public"]["Enums"]["admin_role"]
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id: string
          is_active?: boolean
          last_login_at?: string | null
          role?: Database["public"]["Enums"]["admin_role"]
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          role?: Database["public"]["Enums"]["admin_role"]
        }
        Relationships: []
      }
      application_documents: {
        Row: {
          application_id: string
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size: number
          id: string
          mime_type: string
          uploaded_at: string
        }
        Insert: {
          application_id: string
          document_type: Database["public"]["Enums"]["document_type"]
          file_name: string
          file_path: string
          file_size: number
          id?: string
          mime_type: string
          uploaded_at?: string
        }
        Update: {
          application_id?: string
          document_type?: Database["public"]["Enums"]["document_type"]
          file_name?: string
          file_path?: string
          file_size?: number
          id?: string
          mime_type?: string
          uploaded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          company_name: string
          contact_person: string
          created_at: string
          email: string
          financing_amount: number
          id: string
          idempotency_key: string | null
          notes: string | null
          payment_terms_months: number
          phone: string
          receivables_type: Database["public"]["Enums"]["receivables_type"]
          reviewed_at: string | null
          reviewed_by: string | null
          sector: Database["public"]["Enums"]["sector_type"]
          status: Database["public"]["Enums"]["application_status"]
          submitted_at: string
          tax_number: string
          updated_at: string
        }
        Insert: {
          company_name: string
          contact_person: string
          created_at?: string
          email: string
          financing_amount: number
          id?: string
          idempotency_key?: string | null
          notes?: string | null
          payment_terms_months: number
          phone: string
          receivables_type: Database["public"]["Enums"]["receivables_type"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          sector: Database["public"]["Enums"]["sector_type"]
          status?: Database["public"]["Enums"]["application_status"]
          submitted_at?: string
          tax_number: string
          updated_at?: string
        }
        Update: {
          company_name?: string
          contact_person?: string
          created_at?: string
          email?: string
          financing_amount?: number
          id?: string
          idempotency_key?: string | null
          notes?: string | null
          payment_terms_months?: number
          phone?: string
          receivables_type?: Database["public"]["Enums"]["receivables_type"]
          reviewed_at?: string | null
          reviewed_by?: string | null
          sector?: Database["public"]["Enums"]["sector_type"]
          status?: Database["public"]["Enums"]["application_status"]
          submitted_at?: string
          tax_number?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      application_statistics: {
        Row: {
          approved_count: number | null
          approved_financing_amount: number | null
          issued_count: number | null
          issued_financing_amount: number | null
          month: string | null
          pending_count: number | null
          rejected_count: number | null
          total_applications: number | null
          total_financing_amount: number | null
          under_review_count: number | null
          unique_sectors: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      create_admin_user: {
        Args: {
          p_email: string
          p_full_name: string
          p_role?: Database["public"]["Enums"]["admin_role"]
          p_user_id: string
        }
        Returns: string
      }
      get_current_admin: {
        Args: never
        Returns: {
          email: string
          full_name: string
          id: string
          is_active: boolean
          role: Database["public"]["Enums"]["admin_role"]
        }[]
      }
      has_role: {
        Args: { required_role: Database["public"]["Enums"]["admin_role"] }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
      log_activity: {
        Args: {
          p_action: string
          p_metadata?: Json
          p_resource_id: string
          p_resource_type: string
          p_user_id: string
        }
        Returns: string
      }
    }
    Enums: {
      admin_role: "super_admin" | "admin" | "viewer"
      application_status:
        | "pending"
        | "under_review"
        | "approved"
        | "rejected"
        | "issued"
      document_type:
        | "financial_statement"
        | "tax_certificate"
        | "trade_registry"
        | "receivables_list"
        | "other"
      receivables_type:
        | "invoices"
        | "promissory_notes"
        | "pos_installments"
        | "contracts"
      sector_type:
        | "b2c_retail"
        | "b2c_automotive"
        | "b2c_education"
        | "b2b_fmcg"
        | "b2b_construction"
        | "b2b_logistics"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      admin_role: ["super_admin", "admin", "viewer"],
      application_status: [
        "pending",
        "under_review",
        "approved",
        "rejected",
        "issued",
      ],
      document_type: [
        "financial_statement",
        "tax_certificate",
        "trade_registry",
        "receivables_list",
        "other",
      ],
      receivables_type: [
        "invoices",
        "promissory_notes",
        "pos_installments",
        "contracts",
      ],
      sector_type: [
        "b2c_retail",
        "b2c_automotive",
        "b2c_education",
        "b2b_fmcg",
        "b2b_construction",
        "b2b_logistics",
      ],
    },
  },
} as const
