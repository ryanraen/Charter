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
      return Promise.reject(response); // Not ok then reject promise ---
    })
    .then(data => {
      return data; // Return data (userID and username) if all is good
    })
    .catch(error => { // Catch rejected promise and send back error ---
      return error.json();
    });
}

export async function getLoginToken(ID) {
  return fetch(`http://142.93.148.156:80/u/signin/auth/get/token?&ID=${ID}`, {
    method: "GET",
  }).then(response => {
    return response.json();
  });
}

export async function createWorkspace(userID, workspaceName, isPublic) {
  return fetch(`http://142.93.148.156:80/u/assets/w/create?userID=${userID}&workspaceName=${workspaceName}&isPublic=${isPublic}`, {
    method: "POST",
  }).then(response => {
    return response.json();
  });
}

export async function createChart(workspaceID, chartName) {
  return fetch(`http://142.93.148.156:80/u/signin/c/create?workspaceID=${workspaceID}&chartName=${chartName}`, {
    method: "POST",
  }).then(response => {
    return response.json();
  });
}

export async function createItem(chartID, itemName, description) {
  return fetch(`http://142.93.148.156:80/u/signin/i/create?chartID=${chartID}&itemName=${itemName}&description=${description}`, {
    method: "POST",
  }).then(response => {
    return response.json();
  });
}

export async function validateToken(userID, token, expiryDate) {
  return fetch(`http://142.93.148.156:80/u/signin/auth/check/token?userID=${userID}&accessToken=${token}&expiryDateString=${expiryDate}`, {
    method: "GET",
  }).then(response => {
    return response.json();
  });
}

export async function validateCurrentToken() {
  return fetch(`http://142.93.148.156:80/u/signin/auth/check/token?userID=${getCookie("userID")}&accessToken=${getCookie("token")}&expiryDateString=${getCookie("tokenExpiry")}`, {
    method: "GET",
  }).then(response => {
    return response.json();
  });
}

export async function nullifyToken(userID) {
  return fetch(`http://142.93.148.156:80/u/signin/nullify/token?userID=${userID}`, {
    method: "POST",
  }).then(resonse => {
    return resonse.json();
  });
}
