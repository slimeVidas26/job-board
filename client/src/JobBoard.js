import React, { Component } from 'react';
import { JobList } from './JobList';
import { getAllJobs } from './request';



export class JobBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {jobs : []}
  }

  async componentDidMount(){
  const jobs = await getAllJobs();
  this.setState({jobs})
  }
  
  render() {
    const {jobs} = this.state;
    return jobs && (
      <div>
        <h1 className="title">Job Board</h1>
        <JobList jobs={jobs} />
      </div>
    );
  }
}
