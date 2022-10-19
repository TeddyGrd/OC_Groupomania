exports.signUpErrors = (err) => {
  let errors = { username: "", email: "", password: "" };

  if (err.message.includes("username"))
    errors.username = "Pseudo incorrect ou déjà pris";

  if (err.message.includes("email")) errors.email = "Email incorrect";

  if (err.message.includes("password"))
    errors.password = "Le mot de passe doit faire 6 caractères minimum";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("username"))
    errors.username = "Ce pseudo est déjà pris";

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
    errors.email = "Cet email est déjà enregistré";

  return errors;
};

exports.loginError = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) 
      errors.email = "Email inconnu";
    
    if (err.message.includes('password'))
      errors.password = "Mots de passe incorrect"
  
    return errors;
  }
  
  module.exports.uploadErrors = (err) => {
    let errors = { format: ''};
  
    if (err.message.includes('Format invalide'))
      errors.format = "Format incompatible";
  
    return errors
  }