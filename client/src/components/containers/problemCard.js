import React, {Component} from 'react'

class ProblemCard extends Component{
  constructor(props){
    super(props)
  }
  render(){
    let climb = {grade:"V3", name:"", color:"", attempts:3, sends:2, notes:"Lots of crimpy holds", imageUrl:""}
    return (
      <div>
        <p> Problem Grade: {climb.grade} </p>
        <p> Attempts: {climb.attempts} </p>
        <p> Sends: {climb.sends} </p>
        <p> Notes: {climb.notes} </p>
      </div>
    )
  }
}

export default ProblemCard
