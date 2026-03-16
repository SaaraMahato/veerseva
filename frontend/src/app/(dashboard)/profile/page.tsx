'use client'
import { useEffect, useState } from 'react'
import Card from '../../../components/ui/Card'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { User, Save, CheckCircle } from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'
import api from '../../../lib/api'
import { ARMY_RANKS, INDIAN_STATES } from '../../../lib/constants'

export default function ProfilePage() {
  const { user }  = useAuthStore()
  const [loading,    setLoading]    = useState(false)
  const [fetching,   setFetching]   = useState(true)
  const [saved,      setSaved]      = useState(false)
  const [error,      setError]      = useState('')
  const [hasProfile, setHasProfile] = useState(false)

  const [form, setForm] = useState({
    service_number:        '',
    rank:                  '',
    regiment:              '',
    home_state:            '',
    phone:                 '',
    address:               '',
    date_of_joining:       '',
    date_of_retirement:    '',
    disability_percentage: 0,
  })

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get('/veterans/profile/')
        setForm({
          service_number:        res.data.service_number        ?? '',
          rank:                  res.data.rank                  ?? '',
          regiment:              res.data.regiment              ?? '',
          home_state:            res.data.home_state            ?? '',
          phone:                 res.data.phone                 ?? '',
          address:               res.data.address               ?? '',
          date_of_joining:       res.data.date_of_joining       ?? '',
          date_of_retirement:    res.data.date_of_retirement    ?? '',
          disability_percentage: res.data.disability_percentage ?? 0,
        })
        setHasProfile(true)
      } catch {
        setHasProfile(false)
      } finally {
        setFetching(false)
      }
    }
    fetchProfile()
  }, [])

  async function handleSave() {
    setLoading(true)
    setError('')
    try {
      if (hasProfile) {
        await api.patch('/veterans/profile/update/', form)
      } else {
        await api.post('/veterans/profile/create/', form)
        setHasProfile(true)
      }
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err: any) {
      const data = err?.response?.data
      if (data && typeof data === 'object') {
        const messages = Object.entries(data)
          .map(([k, v]) => `${k}: ${v}`)
          .join(', ')
        setError(messages)
      } else {
        setError('Failed to save profile.')
      }
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return <div className="text-center py-12 text-gray-400">Loading...</div>
  }

  return (
    <div className="max-w-3xl space-y-6">

      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-1">
          Manage your personal and service details
        </p>
      </div>

      {/* Account info */}
      <Card padding="md">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <User size={16} className="text-green-700" /> Account Information
        </h3>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-400 mb-2">Full Name</p>
            <p className="font-semibold text-gray-800">{user?.full_name}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Email Address</p>
            <p className="font-semibold text-gray-800">{user?.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">Email cannot be changed</p>
          </div>
        </div>
      </Card>

      {/* Service details */}
     <Card padding="md">
        <h3 className="text-sm font-semibold text-gray-700 mb-6">
          Service Details
        </h3>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          <Input
            label="Service Number"
            placeholder="e.g. 15701234P"
            value={form.service_number}
            onChange={(e) => setForm({ ...form, service_number: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Rank
            </label>
            <select
              value={form.rank}
              onChange={(e) => setForm({ ...form, rank: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="">Select rank</option>
              {ARMY_RANKS.map((r: any) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>

          <Input
            label="Regiment"
            placeholder="e.g. 3rd Battalion, Rajput Regiment"
            value={form.regiment}
            onChange={(e) => setForm({ ...form, regiment: e.target.value })}
          />

          <Input
            label="Phone"
            placeholder="+91 98765 43210"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />

          <Input
            label="Date of Joining"
            type="date"
            value={form.date_of_joining}
            onChange={(e) => setForm({ ...form, date_of_joining: e.target.value })}
          />

          <Input
            label="Date of Retirement"
            type="date"
            value={form.date_of_retirement}
            onChange={(e) => setForm({ ...form, date_of_retirement: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Home State
            </label>
            <select
              value={form.home_state}
              onChange={(e) => setForm({ ...form, home_state: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            >
              <option value="">Select state</option>
              {INDIAN_STATES.map((s: any) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <Input
            label="Disability %"
            type="number"
            placeholder="0"
            value={form.disability_percentage}
            onChange={(e) =>
              setForm({ ...form, disability_percentage: parseInt(e.target.value) || 0 })
            }
          />
        </div>

        <div className="mt-6">
          <Input
            label="Address"
            placeholder="Full address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>

        <div className="mt-8 flex items-center gap-3">
          <Button
            variant="primary"
            loading={loading}
            onClick={handleSave}
          >
            <Save size={16} className="mr-2" />
            {hasProfile ? 'Save Changes' : 'Create Profile'}
          </Button>
          {saved && (
            <div className="flex items-center gap-2 text-green-700 text-sm">
              <CheckCircle size={16} />
              Profile saved successfully!
            </div>
          )}
        </div>
      </Card>

    </div>
  )
}