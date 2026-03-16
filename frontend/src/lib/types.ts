export type UserRole = 'veteran' | 'officer' | 'ministry'

export interface User {
  id: number
  email: string
  full_name: string
  role: UserRole
  is_verified: boolean
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  full_name: string
  email: string
  password: string
  service_number: string
}

export interface OTPPayload {
  email: string
  otp: string
}

export interface VeteranProfile {
  id: number
  user: User
  service_number: string
  rank: string
  regiment: string
  date_of_birth: string
  date_of_enrollment: string
  date_of_discharge: string
  years_of_service: number
  phone: string
  address: string
  state: string
  pension_number?: string
  echs_card_number?: string
}

export type BenefitCategory =
  | 'pension'
  | 'medical'
  | 'education'
  | 'housing'
  | 'resettlement'

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected'
  | 'escalated'

export interface BenefitScheme {
  id: number
  name: string
  category: BenefitCategory
  description: string
  eligibility_criteria: string
  required_documents: string[]
  is_eligible?: boolean
}

export interface Application {
  id: number
  veteran: number
  scheme: BenefitScheme
  status: ApplicationStatus
  submitted_at: string
  updated_at: string
  officer_remarks?: string
  blockchain_tx_hash?: string
  documents: Document[]
}

export interface StatusHistory {
  id: number
  application: number
  status: ApplicationStatus
  changed_at: string
  changed_by: string
  remarks?: string
}

export type DocumentType =
  | 'discharge_certificate'
  | 'service_record'
  | 'pension_ppo'
  | 'id_proof'
  | 'address_proof'
  | 'medical_certificate'
  | 'other'

export interface Document {
  id: number
  veteran: number
  doc_type: DocumentType
  file_name: string
  ipfs_hash: string
  blockchain_tx_hash: string
  uploaded_at: string
  is_verified: boolean
}

export interface BlockchainVerifyResult {
  is_valid: boolean
  ipfs_hash: string
  uploaded_at: string
  veteran_name: string
}

export type GrievanceStatus =
  | 'open'
  | 'in_progress'
  | 'resolved'
  | 'escalated'
  | 'closed'

export interface Grievance {
  id: number
  veteran: number
  title: string
  description: string
  status: GrievanceStatus
  category: string
  filed_at: string
  updated_at: string
  assigned_to?: string
  resolution?: string
  updates: GrievanceUpdate[]
}

export interface GrievanceUpdate {
  id: number
  grievance: number
  message: string
  updated_by: string
  updated_at: string
}

export interface Notification {
  id: number
  user: number
  title: string
  message: string
  is_read: boolean
  created_at: string
  link?: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface APIResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: Record<string, string[]>
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}