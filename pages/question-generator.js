import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/QuestionGenerator.module.css'

// This structure makes it easy to add new units and sections
const questionBank = {
  algebra: {
    name: "Algebra",
    sections: {
      linearEquations: {
        name: "Linear Equations",
        questions: [
          {
            question: "Solve for x: 2x + 5 = 13",
            answer: "x = 4"
          },
          {
            question: "Solve for x: 3x - 7 = 8",
            answer: "x = 5"
          }
        ]
      },
      quadraticEquations: {
        name: "Quadratic Equations",
        questions: [
          {
            question: "Solve for x: x² + 5x + 6 = 0",
            answer: "x = -2 or x = -3"
          },
          {
            question: "Solve for x: 2x² - 8x + 6 = 0",
            answer: "x = 1 or x = 3"
          }
        ]
      }
    }
  },
  geometry: {
    name: "Geometry",
    sections: {
      area: {
        name: "Area and Perimeter",
        questions: [
          {
            question: "Find the area of a square with side length 5",
            answer: "25 square units"
          },
          {
            question: "Find the perimeter of a rectangle with length 6 and width 4",
            answer: "20 units"
          }
        ]
      },
      volume: {
        name: "Volume",
        questions: [
          {
            question: "Find the volume of a cylinder with radius 3 and height 4",
            answer: "36π cubic units"
          },
          {
            question: "Find the volume of a cube with side length 3",
            answer: "27 cubic units"
          }
        ]
      }
    }
  }
}

export default function QuestionGenerator() {
  const [selectedUnit, setSelectedUnit] = useState('')
  const [selectedSection, setSelectedSection] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(null)

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit)
    setSelectedSection('')
    setCurrentQuestion(null)
  }

  const handleSectionChange = (section) => {
    setSelectedSection(section)
    setCurrentQuestion(null)
  }

  const generateQuestion = () => {
    if (!selectedUnit || !selectedSection) return

    const questions = questionBank[selectedUnit].sections[selectedSection].questions
    const randomIndex = Math.floor(Math.random() * questions.length)
    setCurrentQuestion(questions[randomIndex])
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
            >
              Generate Question
            </button>
          )}
        </div>

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