export function formatPrice(value) {
  if (Number.isNaN(Number(value))) return '$0.00'
  return `$${Number(value).toFixed(2)}`
}

