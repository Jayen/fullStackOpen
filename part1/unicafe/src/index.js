import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalNumberOfFeedback = good + neutral + bad

  if (totalNumberOfFeedback === 0) {
    return (
      <div>No feedback given</div>
    )
  } else {
    return (
      <>
        <h2>statistics</h2>
        <table>
          <tbody>
            <Statistic text="good" value ={good} />
            <Statistic text="neutral" value ={neutral} />
            <Statistic text="bad" value ={bad} />
            <Statistic text="average" value ={(good + bad *-1) / (totalNumberOfFeedback)} />
            <Statistic text="positive" value ={good / (totalNumberOfFeedback) * 100 + '%'} />
          </tbody>
        </table>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      
      <Button text={'good'} handleClick={() => setGood(good + 1)}></Button>
      <Button text={'neutral'} handleClick={() => setNeutral(neutral + 1)}></Button>
      <Button text={'bad'} handleClick={() => setBad(bad + 1)}></Button>
      
      <Statistics good={good} neutral={neutral} bad ={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
