import Link from 'next/link'
import { type AnchorHTMLAttributes, type ReactNode } from 'react'

interface CustomLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  locale?: string
  children: ReactNode
}

export function NavigationLink({
  children,
  href,
  locale,
  ...props
}: CustomLinkProps) {
  return (
    <Link href={href} locale={locale} prefetch={false} {...props}>
      {children}
    </Link>
  )
}
