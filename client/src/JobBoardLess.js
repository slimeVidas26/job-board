import React, { useState , useEffect } from 'react';
import { JobList } from './JobList';
import { getAllJobs } from './request';



export function JobBoard() {
  

  const [jobs , setJobs] = useState([])


  useEffect(() => {
      getAllJobs()
     .then((jobs)=>{setJobs(jobs)
     } )
  }, [])
  
  
    
    return (
      <div>
        <h1 className="title">Job Board</h1>
        {jobs &&
        <JobList jobs={jobs} />
        }
      </div>
    );
  
}
