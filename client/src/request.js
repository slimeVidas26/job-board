const endpointUrl = 'http://localhost:9000/graphql';

//GET ALL JOBS
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
       name
        id
      }
      }
    }`
  })
});
const responseBody = await response.json();
return responseBody.data.jobs
}
//GET ONE JOB BY ID
export const loadJob = async (id)=>{
  const response = await fetch(endpointUrl , {
    method : 'POST',
    headers : {
      'content-type':'application/json'
    },
    body : JSON.stringify({
      query : `query jobQuery ($id:ID!){
        job(id: $id) {
          id
          title
          company {
            id
            name
          }
          description
        }
      }`,
      variables:{id}
    })
  });
  const responseBody = await response.json();
  return responseBody.data.job
  }