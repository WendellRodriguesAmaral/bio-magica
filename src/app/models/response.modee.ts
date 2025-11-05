export interface BioResponse {
  id: string
  message: Message
  finishReason: string
  usage: Usage
}

export interface Message {
  role: string
  content: Content[]
}

export interface Content {
  type: string
  text: string
}


export interface Usage {
  billedUnits: BilledUnits
  tokens: Tokens
  cached_tokens: number
}

export interface BilledUnits {
  inputTokens: number
  outputTokens: number
}

export interface Tokens {
  inputTokens: number
  outputTokens: number
}