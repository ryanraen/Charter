export async function checkValidLogin(email, password) {
  return fetch(`http://142.93.148.156:80/signin/auth/validate?email=${email}&password=${password}`, {
    method: "GET",
  })
    .then(response => {
      return response.json(); // Returns promise
    })
    .then(data => {
      return data; // returns the result of the above promise: true/false
    });
}

export async function getLoginToken() {
  return fetch(`http://142.93.148.156:80/signin/auth/validate?email=${email}&password=${password}`, {
    method: "GET",
  }).then(reponse => {
    return response.json();
  });
}

export async function createWorkspace(userID, workspaceName, isPublic) {
  return fetch(`http://142.93.148.156:80/signin/w/create?userID=${userID}&workspaceName=${workspaceName}&isPublic=${isPublic}`, {
    method: "POST",
  }).then(response => {
    return response.json();
  })
}
