export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

export const BENEFIT_CATEGORIES = {
  pension:      { label: 'Pension',        color: 'blue'   },
  medical:      { label: 'Medical (ECHS)', color: 'green'  },
  education:    { label: 'Education',      color: 'purple' },
  housing:      { label: 'Housing',        color: 'orange' },
  resettlement: { label: 'Resettlement',   color: 'teal'   },
}

export const STATUS_CONFIG = {
  draft:        { label: 'Draft',        color: 'gray'   },
  submitted:    { label: 'Submitted',    color: 'blue'   },
  under_review: { label: 'Under Review', color: 'yellow' },
  approved:     { label: 'Approved',     color: 'green'  },
  rejected:     { label: 'Rejected',     color: 'red'    },
  escalated:    { label: 'Escalated',    color: 'orange' },
}

export const GRIEVANCE_STATUS = {
  open:        { label: 'Open',        color: 'red'    },
  in_progress: { label: 'In Progress', color: 'yellow' },
  resolved:    { label: 'Resolved',    color: 'green'  },
  escalated:   { label: 'Escalated',   color: 'orange' },
  closed:      { label: 'Closed',      color: 'gray'   },
}

export const DOCUMENT_TYPES = {
  discharge_certificate: 'Discharge Certificate',
  service_record:        'Service Record',
  pension_ppo:           'Pension PPO',
  id_proof:              'ID Proof',
  address_proof:         'Address Proof',
  medical_certificate:   'Medical Certificate',
  other:                 'Other',
}

export const ARMY_RANKS = [
  { value: 'sepoy',         label: 'Sepoy'         },
  { value: 'naik',          label: 'Naik'          },
  { value: 'havildar',      label: 'Havildar'      },
  { value: 'subedar',       label: 'Subedar'       },
  { value: 'subedar_major', label: 'Subedar Major' },
  { value: 'lieutenant',    label: 'Lieutenant'    },
  { value: 'captain',       label: 'Captain'       },
  { value: 'major',         label: 'Major'         },
  { value: 'lt_colonel',    label: 'Lt. Colonel'   },
  { value: 'colonel',       label: 'Colonel'       },
  { value: 'brigadier',     label: 'Brigadier'     },
  { value: 'major_general', label: 'Major General' },
  { value: 'lt_general',    label: 'Lt. General'   },
  { value: 'general',       label: 'General'       },
]

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
  'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh',
]

export const SLA_DAYS = {
  pension:      30,
  medical:      15,
  education:    21,
  housing:      45,
  resettlement: 30,
}