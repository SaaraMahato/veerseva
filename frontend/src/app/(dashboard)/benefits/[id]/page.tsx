'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Card from '../../../../components/ui/Card'
import Badge from '../../../../components/ui/Badge'
import Button from '../../../../components/ui/Button'
import { ArrowLeft, FileText, CheckCircle, Clock } from 'lucide-react'
import { BENEFIT_CATEGORIES } from '../../../../lib/constants'
import api from '../../../../lib/api'

export default function BenefitDetailPage() {
  const { id }   = useParams()
  const [scheme,  setScheme]  = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await api.get(`/benefits/schemes/${id}/`)
        setScheme(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  if (loading) return <div className="text-center py-12 text-gray-400">Loading...</div>

  if (!scheme) return (
    <div className="text-center py-12">
      <p className="text-gray-500">Scheme not found.</p>
      <Link href="/benefits" className="text-green-700 text-sm mt-2 inline-block">
        Back to benefits
      </Link>
    </div>
  )

  const catConfig = BENEFIT_CATEGORIES[scheme.category as keyof typeof BENEFIT_CATEGORIES]

  return (
    <div className="max-w-2xl space-y-6">

      <Link
        href="/benefits"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft size={16} /> Back to Benefits
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{scheme.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Benefit Scheme Details</p>
        </div>
        <Badge
          label={catConfig?.label ?? scheme.category}
          color={catConfig?.color as any ?? 'gray'}
        />
      </div>

      {/* Overview */}
      <Card padding="md">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FileText size={16} className="text-green-700" /> Overview
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">{scheme.description}</p>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Category</p>
            <p className="font-semibold text-green-700 capitalize">{scheme.category}</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
              <Clock size={11} /> SLA Period
            </p>
            <p className="font-semibold text-blue-700">{scheme.sla_days} days</p>
          </div>
        </div>
      </Card>

      {/* Required documents */}
      <Card padding="md">
        <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <CheckCircle size={16} className="text-green-700" /> Required Documents
        </h3>
        <div className="space-y-2">
          {scheme.required_documents.map((doc: string) => (
            <div key={doc} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <CheckCircle size={16} className="text-green-600 shrink-0" />
              <span className="text-sm text-gray-700 capitalize">
                {doc.replace(/_/g, ' ')}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Eligibility */}
      {scheme.eligibility_criteria && (
        <Card padding="md">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Eligibility Criteria
          </h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {scheme.eligibility_criteria}
          </p>
        </Card>
      )}

      {/* Apply button */}
      <Link href={`/benefits/apply?scheme=${scheme.id}`}>
        <Button variant="primary" size="lg" className="w-full">
          Apply for {scheme.name}
        </Button>
      </Link>

    </div>
  )
}