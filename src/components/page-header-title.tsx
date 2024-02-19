interface Props {
  title: string
}

export function PageHeaderTitle({ title }: Props) {
  return (
    <div className="flex self-start bg-accent justify-start w-full items-center gap-2 h-10">
      <div className="bg-primary w-1 h-full" />
      <span className="text-xl font-medium">{title}</span>
    </div>
  )
}
