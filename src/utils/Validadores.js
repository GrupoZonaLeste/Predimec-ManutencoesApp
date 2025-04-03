export const validarEmail = (email) => {
  let strEmail = String(email)

  if(strEmail.includes("@") && strEmail.includes(".")){
    return true
  } else {
    return false
  }
}

export const validarInputs = (inputArray) => {
  let result = true

  for (let inputValue in inputArray){
    if(!inputValue){
      result = false
    }
  }

  return result
}