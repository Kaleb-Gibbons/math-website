import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/QuestionGenerator.module.css'

export default function QuestionGenerator() {
  const [difficulty, setDifficulty] = useState('medium')
  const [topic, setTopic] = useState('algebra')
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const generateQuestion = () => {
    // This is a placeholder for the actual question generation logic
    const questions = {
      algebra: {
        easy: {
          question: "Solve for x: 2x + 5 = 13",
          answer: "x = 4"
        },
        medium: {
          question: "Solve for x: 3x² + 2x - 5 = 0",
          answer: "x = 1 or x = -5/3"
        },
        hard: {
          question: "Solve the system: 2x + 3y = 7, 4x - y = 5",
          answer: "x = 2, y = 1"
        }
      },
      geometry: {
        easy: {
          question: "Find the area of a square with side length 5",
          answer: "25 square units"
        },
        medium: {
          question: "Find the volume of a cylinder with radius 3 and height 4",
          answer: "36π cubic units"
        },
        hard: {
          question: "Prove that the sum of angles in a triangle is 180 degrees",
          answer: "Using parallel lines and alternate angles"
        }
      }
    }

    const selectedQuestion = questions[topic][difficulty]
    setQuestion(selectedQuestion.question)
    setAnswer(selectedQuestion.answer)
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
            <label>Difficulty:</label>
            <select 
              value={difficulty} 
              onChange={(e) => setDifficulty(e.target.value)}
              className={styles.select}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label>Topic:</label>
            <select 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)}
              className={styles.select}
            >
              <option value="algebra">Algebra</option>
              <option value="geometry">Geometry</option>
            </select>
          </div>

          <button 
            onClick={generateQuestion}
            className={styles.generateButton}
          >
            Generate Question
          </button>
        </div>

        {question && (
          <div className={styles.questionContainer}>
            <div className={styles.question}>
              <h2>Question:</h2>
              <p>{question}</p>
            </div>
            <div className={styles.answer}>
              <h2>Answer:</h2>
              <p>{answer}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
} 