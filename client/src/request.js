const endpointUrl = 'http://localhost:9000/graphql';

const options = {
    method : 'POST',
    headers : {
      'content-type':'application/json'
    },
    body : JSON.stringify({
      query : `query{
        jobs {
          id
          title
          description
        company {
         name
          id
        }
        }
      }`
    })
  }

export const getAllJobs = async ()=>{
const response = await fetch(endpointUrl , options);
const responseBody = await response.json();
return responseBody.data.jobs
}