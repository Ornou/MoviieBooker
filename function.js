function generateToken(user){
    let token= btoa(JSON.stringify(user));
    return token;

}

function verifyToken(token){
    let user= atob(token);
    return JSON.parse(user);
}


function filterUsers(userArray){
    let filteredUsers=userArray.filter((user)=>user.includes("O"));
    return filteredUsers;
}

const testUser = {
    id: "12345",
    email: "testuser@example.com",
    username: "testUser",
    role: "user"
  };

  const token = generateToken(testUser);
  console.log(token);

  const verifiedUser = verifyToken(token);
  console.log(verifiedUser);

  const users= ["Ornelle", "Mael", "Oceane"];
  const filteredTab= filterUsers(users);
  console.log(filteredTab);

