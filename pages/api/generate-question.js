import { NextResponse } from 'next/server'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { unit, section } = req.body
  if (!unit || !section) {
    return res.status(400).json({ error: 'Missing unit or section' })
  }

  const prompt = `Generate a random math question and its answer for the following unit and section.\nUnit: ${unit}\nSection: ${section}\nFormat the response as JSON with 'question' and 'answer' fields.`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful math question generator.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.7,
      })
    })
    const data = await response.json()
    const content = data.choices?.[0]?.message?.content
    let parsed
    try {
      parsed = JSON.parse(content)
    } catch {
      // fallback: try to extract JSON from the response
      const match = content.match(/\{[\s\S]*\}/)
      parsed = match ? JSON.parse(match[0]) : { question: content, answer: '' }
    }
    res.status(200).json(parsed)
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate question', details: error.message })
  }
} 