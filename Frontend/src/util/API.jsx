export async function registerAccount(data) {
  return fetch(`http://142.93.148.156:80/u/signin/register?`, {
    method: "POST",
    body: data,
  }).then(response => {
    return response.json();
  });
}

export async function validateLogin(email, password) {
  return fetch(`http://142.93.148.156:80/u/signin/auth/validate?email=${email}&password=${password}`, {
    method: "GET",
  })
    .then(response => {
      if (response.ok) {
        return response.json(); // Returns promise
      }
      return Promise.reject(response);
    })
    .then(data => {
      return data; // Return data (user id) if all is good
    }).catch(error =>{
      switch(error.status) {
        case 500:
          return "Username or password incorrect";
      }
    })
}

export async function getLoginToken(ID) {
  return fetch(`http://142.93.148.156:80/u/signin/auth/get/token?&ID=${ID}`, {
    method: "GET",
  }).then(response => {
    return response.json();
  });
}

export async function createWorkspace(userID, workspaceName, isPublic) {
  return fetch(`http://142.93.148.156:80/signin/w/create?userID=${userID}&workspaceName=${workspaceName}&isPublic=${isPublic}`, {
    method: "POST",
  }).then(response => {
    return response.json();
  });
}

export async function createChart(workspaceID, chartName) {
  return fetch(`http://142.93.148.156:80/signin/c/create?workspaceID=${workspaceID}&chartName=${chartName}`, {
    method: "POST",
  }).then(response => {
    return response.json();
  });
}

export async function createItem(chartID, itemName, description) {
  return fetch(`http://142.93.148.156:80/signin/i/create?chartID=${chartID}&itemName=${itemName}&description=${description}`, {
    method: "POST",
  }).then(response => {
    return response.json();
  });
}
