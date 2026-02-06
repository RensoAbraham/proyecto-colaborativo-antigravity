export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    role: 'user' | 'admin'
                    company_id: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    role?: 'user' | 'admin'
                    company_id?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    full_name?: string | null
                    role?: 'user' | 'admin'
                    company_id?: string | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            work_sessions: {
                Row: {
                    id: string
                    user_id: string
                    company_id: string
                    date: string
                    check_in: string
                    check_out: string | null
                    total_minutes: number
                    accumulated_seconds: number
                    status: 'active' | 'paused' | 'completed'
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    company_id: string
                    date: string
                    check_in: string
                    check_out?: string | null
                    total_minutes?: number
                    accumulated_seconds?: number
                    status: 'active' | 'paused' | 'completed'
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    company_id?: string
                    date?: string
                    check_in?: string
                    check_out?: string | null
                    total_minutes?: number
                    accumulated_seconds?: number
                    status?: 'active' | 'paused' | 'completed'
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "work_sessions_user_id_fkey"
                        columns: ["user_id"]
                        isOneToOne: false
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            breaks: {
                Row: {
                    id: string
                    work_session_id: string
                    break_start: string
                    break_end: string | null
                    duration_minutes: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    work_session_id: string
                    break_start: string
                    break_end?: string | null
                    duration_minutes?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    work_session_id?: string
                    break_start?: string
                    break_end?: string | null
                    duration_minutes?: number
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "breaks_work_session_id_fkey"
                        columns: ["work_session_id"]
                        isOneToOne: false
                        referencedRelation: "work_sessions"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
