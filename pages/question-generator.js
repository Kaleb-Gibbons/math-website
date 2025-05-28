import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/QuestionGenerator.module.css'

// This structure makes it easy to add new units and sections
const questionBank = {
  algebra: {
    name: "Algebra",
    sections: {
      linearEquations: { name: "Linear Equations" },
      quadraticEquations: { name: "Quadratic Equations" }
    }
  },
  geometry: {
    name: "Geometry",
    sections: {
      area: { name: "Area and Perimeter" },
      volume: { name: "Volume" }
    }
  }
}

export default function QuestionGenerator() {
  const [selectedUnit, setSelectedUnit] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit)
    setSelectedSection('')
    setCurrentQuestion(null)
    setError('')
  }

  const handleSectionChange = (section) => {
    setSelectedSection(section)
    setCurrentQuestion(null)
    setError('')
  }

  const generateQuestion = async () => {
    if (!selectedUnit || !selectedSection) return
    setLoading(true)
    setError('')
    setCurrentQuestion(null)
    try {
      const res = await fetch('/api/generate-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unit: questionBank[selectedUnit].name,
          section: questionBank[selectedUnit].sections[selectedSection].name
        })
      })
      if (!res.ok) throw new Error('Failed to fetch question')
      const data = await res.json()
      setCurrentQuestion(data)
    } catch (err) {
      setError('Could not generate question. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Math Question Generator</title>
        <meta name="description" content="Generate custom math problems" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Math Question Generator</h1>

        <div className={styles.controls}>
          <div className={styles.controlGroup}>
            <label>Unit:</label>
            <select 
              value={selectedUnit} 
              onChange={(e) => handleUnitChange(e.target.value)}
              className={styles.select}
            >
              <option value="">Select a Unit</option>
              {Object.entries(questionBank).map(([key, unit]) => (
                <option key={key} value={key}>{unit.name}</option>
              ))}
            </select>
          </div>

          {selectedUnit && (
            <div className={styles.controlGroup}>
              <label>Section:</label>
              <select 
                value={selectedSection} 
                onChange={(e) => handleSectionChange(e.target.value)}
                className={styles.select}
              >
                <option value="">Select a Section</option>
                {Object.entries(questionBank[selectedUnit].sections).map(([key, section]) => (
                  <option key={key} value={key}>{section.name}</option>
                ))}
              </select>
            </div>
          )}

          {selectedSection && (
            <button 
              onClick={generateQuestion}
              className={styles.generateButton}
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Question'}
            </button>
          )}
        </div>

        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        {currentQuestion && (
          <div className={styles.questionContainer}>
            <div className={styles.question}>
              <h2>Question:</h2>
              <p>{currentQuestion.question}</p>
            </div>
            <div className={styles.answer}>
              <h2>Answer:</h2>
              <p>{currentQuestion.answer}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 