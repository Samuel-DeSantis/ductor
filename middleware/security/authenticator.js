const bcrypt = require('bcrypt')

const saltRounds = 10
const userPassword = 'password'

// function hashUserPassword(password){
  
//   password_digest = ''
//   bcrypt.genSalt(saltRounds)
//   .then(salt => {
//     console.log('Salt: ', salt)
//     return bcrypt.hash(password, salt)
//   })
//   .then(hash => {
//     console.log('Hash: ', hash)
    
//   })
//   .catch(err => console.error(err.message))

//   return password_digest
// }

user = {
  username: 'johndoe',
  password: 'password',
  password_digest: ''
}

async function hashPassword(password) {
  try {
    const saltRounds = 10; // Adjust salt rounds as needed
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt)
    const hash = await bcrypt.hash(password, salt);
    console.log(hash)
    authenticateUser(user.password, hash)
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error;
  }
}


function authenticateUser(password, hash) {
  bcrypt.compare(password, hash)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.error(err.message))
}

hashPassword(user.password)