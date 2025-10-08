import DOMPurify from 'dompurify'

export const sanitizeHtml = (dirty: string): string => {
  if (typeof window === 'undefined') {
    return dirty.replace(/<[^>]*>/g, '')
  }

  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  })
}

export const sanitizeText = (text: string): string => {
  if (!text) return ''

  const stripped = text.replace(/<[^>]*>/g, '')

  const noScript = stripped.replace(/javascript:/gi, '')

  return noScript.trim()
}

export const sanitizeUrl = (url: string): string => {
  if (!url) return ''

  const trimmed = url.trim()

  const dangerous = /^(javascript|data|vbscript):/i
  if (dangerous.test(trimmed)) {
    return ''
  }

  return trimmed
}

export const escapeHtml = (text: string): string => {
  if (!text) return ''

  const htmlEscapes: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return text.replace(/[&<>"'/]/g, (char) => htmlEscapes[char])
}

export const sanitizeObject = <T extends Record<string, any>>(obj: T): T => {
  const sanitized = { ...obj } as Record<string, any>

  Object.keys(sanitized).forEach((key) => {
    const value = sanitized[key]

    if (typeof value === 'string') {
      sanitized[key] = sanitizeText(value)
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value)
    }
  })

  return sanitized as T
}
