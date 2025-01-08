type Variants = {
    one: string
    other: string
    zero: string
    two: string
    few: string
    many: string
  }
  
  export function plural(value: number, variants: Variants, locale = 'ru-RU') {
    const key = new Intl.PluralRules(locale).select(value)
    return variants[key] || ''
  }
  