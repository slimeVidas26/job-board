const endpointUrl = 'http://localhost:9000/graphql';

//GRAPHQLREQUEST
 const graphqlRequest = async (query , variables ={})=>{
  const response = await fetch(endpointUrl , {
    method : 'POST',
    headers : {
      'content-type':'application/json'
    },
    body : JSON.stringify({query,variables})
  });
  const responseBody = await response.json();
  if(responseBody.errors){
    const message = responseBody.errors.map((error)=> error.message).join('\n')
    throw new Error(message)
  }
  return responseBody.data
  }

//GET ALL JOBS
export const getAllJobs = async ()=>{
  const query = `query{
    jobs {
      id
      titlez
      description
    company {
     name
      id
    }
    }
  }`
const {jobs} = await graphqlRequest(query)
return jobs
}

//GET ONE JOB BY ID
export const loadJob = async (id)=>{
  const query = `query jobQuery ($id:ID!){
    job(id: $id) {
      id
      title
      company {
        id
        name
      }
      description
    }
  }`

  const {job} = await graphqlRequest(query , {id})
  return job;
  }
