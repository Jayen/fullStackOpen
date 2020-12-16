import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length)) 

  const voteForAnecdote = (anecdote) => {
    const newVotes = [...votes]
    newVotes[anecdote] += 1
    setVotes(newVotes)
  }

  const nextAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const getHighestVotedAnecdote = () => {
    var highestVote = votes[0]
    var highestVoteIndex = 0
    for (let i = 0; i < votes.length; i++) {
      if ( votes[i] > highestVote) {
        highestVote = votes[i];
        highestVoteIndex = i;
      }
    }
    return highestVoteIndex;
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {props.anecdotes[selected]}
      </div>
      <div>
        has {votes[selected]} votes
      </div>
      <button onClick={() => voteForAnecdote(selected)}>vote</button>
      <button onClick={() => nextAnecdote()}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[getHighestVotedAnecdote()]}</div>
    </>
  )
}



ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)