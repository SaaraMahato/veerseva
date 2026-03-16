'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Card from '../../../components/ui/Card'
import Badge from '../../../components/ui/Badge'
import Button from '../../../components/ui/Button'
import { FileText, Search, ChevronRight } from 'lucide-react'
import api from '../../../lib/api'
import { BENEFIT_CATEGORIES } from '../../../lib/constants'

export default function BenefitsPage() {
  const [schemes,  setSchemes]  = useState<any[]>([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    async function fetchSchemes() {
      try {
        const res = await api.get('/benefits/schemes/')
        setSchemes(res.data.results ?? res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSchemes()
  }, [])

  const filtered = schemes.filter((s) => {
    const matchSearch   = s.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'all' || s.category === category
    return matchSearch && matchCategory
  })

  const categories = [
    { key: 'all',          label: 'All'          },
    { key: 'pension',      label: 'Pension'      },
    { key: 'medical',      label: 'Medical'      },
    { key: 'education',    label: 'Education'    },
    { key: 'housing',      label: 'Housing'      },
    { key: 'resettlement', label: 'Resettlement' },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Benefit Schemes</h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse and apply for veteran benefit schemes
        </p>
      </div>

      {/* Search */}
      {/* Search */}
      <div style={{ position: 'relative' }}>
        <Search
          size={16}
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          className="text-gray-400"
        />
        <input
          type="text"
          placeholder="Search schemes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: '40px' }}
          className="w-full pr-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-sm"
        />
      </div>

      {/* Category filters */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setCategory(c.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
              category === c.key
                ? 'bg-green-700 text-white border-green-700'
                : 'bg-white text-gray-600 border-gray-200 hover:border-green-300'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Schemes */}
      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <FileText size={40} className="mx-auto mb-3 opacity-40" />
          <p>No schemes found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((scheme) => {
            const catConfig = BENEFIT_CATEGORIES[scheme.category as keyof typeof BENEFIT_CATEGORIES]
            return (
              <Card key={scheme.id} padding="md" hover>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                      <FileText size={20} className="text-green-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {scheme.name}
                      </h3>
                      <Badge
                        label={catConfig?.label ?? scheme.category}
                        color={catConfig?.color as any ?? 'gray'}
                        size="sm"
                      />
                    </div>
                  </div>
                  <Badge label="Eligible" color="green" size="sm" />
                </div>

                <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                  {scheme.description}
                </p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                    Required Documents
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {scheme.required_documents.map((doc: string) => (
                      <span
                        key={doc}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                      >
                        {doc.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/benefits/apply?scheme=${scheme.id}`} className="flex-1">
                    <Button variant="primary" size="sm" className="w-full">
                      Apply Now <ChevronRight size={14} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}