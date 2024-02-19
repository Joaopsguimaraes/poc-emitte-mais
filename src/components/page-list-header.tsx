import { ReactNode } from 'react'

import { PageHeaderTitle } from './page-header-title'

interface Props {
  children?: ReactNode
  title: string
}

export function PageListHeader({ children, title }: Props) {
  return (
    <div className="flex flex-col w-full items-center gap-4 mb-5">
      <PageHeaderTitle title={title} />
      <div className="bg-accent justify-end space-x-2 w-full flex flex-col">{children}</div>
    </div>
  )
}
