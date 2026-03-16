import Link from 'next/link'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { FileText, ChevronRight } from 'lucide-react'
import { BENEFIT_CATEGORIES } from '../../lib/constants'
import type { BenefitScheme } from '../../lib/types'

interface BenefitCardProps {
  scheme: BenefitScheme
}

export default function BenefitCard({ scheme }: BenefitCardProps) {
  const catConfig = BENEFIT_CATEGORIES[scheme.category]

  return (
    <Card padding="md" hover>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
            <FileText size={20} className="text-green-700" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{scheme.name}</h3>
            <Badge
              label={catConfig.label}
              color={catConfig.color as any}
              size="sm"
            />
          </div>
        </div>
        <Badge
          label={scheme.is_eligible ? 'Eligible' : 'Not Eligible'}
          color={scheme.is_eligible ? 'green' : 'red'}
          size="sm"
        />
      </div>

      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
        {scheme.description}
      </p>

      <div className="mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
          Required Documents
        </p>
        <div className="flex flex-wrap gap-1.5">
          {scheme.required_documents.map((doc) => (
            <span
              key={doc}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {doc}
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Link href={`/benefits/${scheme.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">
            View Details <ChevronRight size={14} className="ml-1" />
          </Button>
        </Link>
        {scheme.is_eligible && (
          <Link href="/benefits/apply">
            <Button variant="primary" size="sm">Apply</Button>
          </Link>
        )}
      </div>
    </Card>
  )
}