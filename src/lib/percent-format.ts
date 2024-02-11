export function formatPercent(value: number | string) {
  const valueNumber = Number(value)

  if (isNaN(valueNumber)) {
    throw new Error('Erro ao converter valor, tente novamente.')
  }

  return Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
  }).format(valueNumber)
}