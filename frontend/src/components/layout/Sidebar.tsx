'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  User,
  FileText,
  FolderOpen,
  MessageSquare,
  Bot,
  LogOut,
  Shield,
} from 'lucide-react'
import { cn } from '../../lib/utils'
import { logoutUser } from '../../lib/auth'

const navItems = [
  { href: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/profile',    label: 'My Profile', icon: User            },
  { href: '/benefits',   label: 'Benefits',   icon: FileText        },
  { href: '/documents',  label: 'Documents',  icon: FolderOpen      },
  { href: '/grievances', label: 'Grievances', icon: MessageSquare   },
  { href: '/assistant',  label: 'AI Assistant', icon: Bot           },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 flex flex-col z-30">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 bg-green-700 rounded-lg flex items-center justify-center">
          <Shield size={20} className="text-white" />
        </div>
        <div>
          <h1 className="font-bold text-gray-900 text-base leading-tight">VeerSeva</h1>
          <p className="text-xs text-gray-500">Veterans Portal</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-green-50 text-green-700 border border-green-100'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <Icon size={18} className={isActive ? 'text-green-700' : 'text-gray-400'} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-100">
        <button
          onClick={logoutUser}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-all"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  )
}