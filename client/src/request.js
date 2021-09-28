const endpointUrl = 'http://localhost:9000/graphql';

export const getAllJobs = async ()=>{
const response = await fetch(endpointUrl , {
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
        id
      }
      }
    }`
  })
});
const responseBody = await response.json();
return responseBody.data.jobs
}