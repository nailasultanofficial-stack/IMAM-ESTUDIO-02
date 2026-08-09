export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string;
          actor_email: string | null;
          actor_id: string | null;
          created_at: string;
          details: Json;
          id: string;
          resource: string;
          resource_id: string | null;
        };
        Insert: {
          action: string;
          actor_email?: string | null;
          actor_id?: string | null;
          created_at?: string;
          details?: Json;
          id?: string;
          resource: string;
          resource_id?: string | null;
        };
        Update: {
          action?: string;
          actor_email?: string | null;
          actor_id?: string | null;
          created_at?: string;
          details?: Json;
          id?: string;
          resource?: string;
          resource_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "audit_logs_actor_id_fkey";
            columns: ["actor_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      customers: {
        Row: {
          company: string | null;
          country: string | null;
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          notes: string | null;
          tags: string[];
          total_spent: number;
          updated_at: string;
        };
        Insert: {
          company?: string | null;
          country?: string | null;
          created_at?: string;
          email: string;
          full_name: string;
          id?: string;
          notes?: string | null;
          tags?: string[];
          total_spent?: number;
          updated_at?: string;
        };
        Update: {
          company?: string | null;
          country?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          notes?: string | null;
          tags?: string[];
          total_spent?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          assigned_to: string | null;
          budget: string | null;
          created_at: string;
          details: string;
          email: string;
          id: string;
          name: string;
          notes: string | null;
          project_type: string;
          source_cta: string;
          status: string;
          updated_at: string;
        };
        Insert: {
          assigned_to?: string | null;
          budget?: string | null;
          created_at?: string;
          details: string;
          email: string;
          id?: string;
          name: string;
          notes?: string | null;
          project_type?: string;
          source_cta?: string;
          status?: string;
          updated_at?: string;
        };
        Update: {
          assigned_to?: string | null;
          budget?: string | null;
          created_at?: string;
          details?: string;
          email?: string;
          id?: string;
          name?: string;
          notes?: string | null;
          project_type?: string;
          source_cta?: string;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "leads_assigned_to_fkey";
            columns: ["assigned_to"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      media_assets: {
        Row: {
          alt_text: string | null;
          created_at: string;
          filename: string;
          id: string;
          is_protected: boolean;
          mime_type: string | null;
          size_bytes: number | null;
          updated_at: string;
          url: string;
          used_in: string[];
        };
        Insert: {
          alt_text?: string | null;
          created_at?: string;
          filename: string;
          id?: string;
          is_protected?: boolean;
          mime_type?: string | null;
          size_bytes?: number | null;
          updated_at?: string;
          url: string;
          used_in?: string[];
        };
        Update: {
          alt_text?: string | null;
          created_at?: string;
          filename?: string;
          id?: string;
          is_protected?: boolean;
          mime_type?: string | null;
          size_bytes?: number | null;
          updated_at?: string;
          url?: string;
          used_in?: string[];
        };
        Relationships: [];
      };
      orders: {
        Row: {
          amount: number;
          created_at: string;
          currency: string;
          customer_id: string | null;
          fulfillment_status: string;
          id: string;
          lead_id: string | null;
          notes: string | null;
          payment_status: string;
          reference: string;
          service_id: string | null;
          title: string;
          updated_at: string;
        };
        Insert: {
          amount?: number;
          created_at?: string;
          currency?: string;
          customer_id?: string | null;
          fulfillment_status?: string;
          id?: string;
          lead_id?: string | null;
          notes?: string | null;
          payment_status?: string;
          reference?: string;
          service_id?: string | null;
          title?: string;
          updated_at?: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          currency?: string;
          customer_id?: string | null;
          fulfillment_status?: string;
          id?: string;
          lead_id?: string | null;
          notes?: string | null;
          payment_status?: string;
          reference?: string;
          service_id?: string | null;
          title?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey";
            columns: ["customer_id"];
            isOneToOne: false;
            referencedRelation: "customers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_lead_id_fkey";
            columns: ["lead_id"];
            isOneToOne: false;
            referencedRelation: "leads";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "orders_service_id_fkey";
            columns: ["service_id"];
            isOneToOne: false;
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
        ];
      };
      page_sections: {
        Row: {
          content: Json;
          created_at: string;
          display_order: number;
          draft_content: Json | null;
          id: string;
          is_locked: boolean;
          is_visible: boolean;
          page_id: string;
          section_type: string;
          subtitle: string | null;
          title: string | null;
          updated_at: string;
        };
        Insert: {
          content?: Json;
          created_at?: string;
          display_order?: number;
          draft_content?: Json | null;
          id?: string;
          is_locked?: boolean;
          is_visible?: boolean;
          page_id: string;
          section_type: string;
          subtitle?: string | null;
          title?: string | null;
          updated_at?: string;
        };
        Update: {
          content?: Json;
          created_at?: string;
          display_order?: number;
          draft_content?: Json | null;
          id?: string;
          is_locked?: boolean;
          is_visible?: boolean;
          page_id?: string;
          section_type?: string;
          subtitle?: string | null;
          title?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "page_sections_page_id_fkey";
            columns: ["page_id"];
            isOneToOne: false;
            referencedRelation: "pages";
            referencedColumns: ["id"];
          },
        ];
      };
      pages: {
        Row: {
          created_at: string;
          id: string;
          is_published: boolean;
          is_system: boolean;
          og_image: string | null;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          template: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_published?: boolean;
          is_system?: boolean;
          og_image?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          template?: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_published?: boolean;
          is_system?: boolean;
          og_image?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          template?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          email: string;
          full_name: string;
          id: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          email: string;
          full_name?: string;
          id: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          email?: string;
          full_name?: string;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          category: string;
          client_name: string | null;
          created_at: string;
          description: string;
          display_order: number;
          gallery_urls: string[];
          gig_id: string | null;
          id: string;
          is_featured: boolean;
          is_published: boolean;
          outcomes: string[];
          slug: string;
          tags: string[];
          thumbnail_url: string;
          title: string;
          updated_at: string;
        };
        Insert: {
          category?: string;
          client_name?: string | null;
          created_at?: string;
          description?: string;
          display_order?: number;
          gallery_urls?: string[];
          gig_id?: string | null;
          id?: string;
          is_featured?: boolean;
          is_published?: boolean;
          outcomes?: string[];
          slug: string;
          tags?: string[];
          thumbnail_url: string;
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          client_name?: string | null;
          created_at?: string;
          description?: string;
          display_order?: number;
          gallery_urls?: string[];
          gig_id?: string | null;
          id?: string;
          is_featured?: boolean;
          is_published?: boolean;
          outcomes?: string[];
          slug?: string;
          tags?: string[];
          thumbnail_url?: string;
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      seo_settings: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          json_ld: Json | null;
          keywords: string[];
          noindex: boolean;
          og_image: string | null;
          route: string;
          title: string | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          json_ld?: Json | null;
          keywords?: string[];
          noindex?: boolean;
          og_image?: string | null;
          route: string;
          title?: string | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          json_ld?: Json | null;
          keywords?: string[];
          noindex?: boolean;
          og_image?: string | null;
          route?: string;
          title?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      services: {
        Row: {
          category: string;
          created_at: string;
          cta_label: string;
          display_order: number;
          features: string[];
          full_description: string;
          gig_id: string | null;
          hourly_rate: number | null;
          id: string;
          image_url: string | null;
          is_featured: boolean;
          is_published: boolean;
          short_description: string;
          slug: string;
          starting_price: number | null;
          tech_stack: string[];
          title: string;
          updated_at: string;
        };
        Insert: {
          category?: string;
          created_at?: string;
          cta_label?: string;
          display_order?: number;
          features?: string[];
          full_description?: string;
          gig_id?: string | null;
          hourly_rate?: number | null;
          id?: string;
          image_url?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          short_description?: string;
          slug: string;
          starting_price?: number | null;
          tech_stack?: string[];
          title: string;
          updated_at?: string;
        };
        Update: {
          category?: string;
          created_at?: string;
          cta_label?: string;
          display_order?: number;
          features?: string[];
          full_description?: string;
          gig_id?: string | null;
          hourly_rate?: number | null;
          id?: string;
          image_url?: string | null;
          is_featured?: boolean;
          is_published?: boolean;
          short_description?: string;
          slug?: string;
          starting_price?: number | null;
          tech_stack?: string[];
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          granted_by: string | null;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          granted_by?: string | null;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          granted_by?: string | null;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_manage_content: { Args: never; Returns: boolean };
      can_manage_ops: { Args: never; Returns: boolean };
      can_read_content: { Args: never; Returns: boolean };
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][];
          _user_id: string;
        };
        Returns: boolean;
      };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
      is_admin: { Args: never; Returns: boolean };
      is_owner: { Args: never; Returns: boolean };
      is_staff: { Args: never; Returns: boolean };
      log_audit: {
        Args: {
          _action: string;
          _details?: Json;
          _resource: string;
          _resource_id?: string;
        };
        Returns: undefined;
      };
    };
    Enums: {
      app_role: "owner" | "admin" | "editor" | "operations" | "viewer";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      app_role: ["owner", "admin", "editor", "operations", "viewer"],
    },
  },
} as const;
