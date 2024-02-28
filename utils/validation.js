const validateUser=username=>{
    const regex=/^[a-zA-Z\d_]{4,16}$/
   const result=regex.test(username)
   return result 
}
const validatePassword=password=>{
    const regex=/^.{6,20}$/
   const result=regex.test(password)
   return result 
}
const validateForm=(username,password)=>{
 const usernameResult=validateUser(username)
 const passwordResult=validatePassword(password)
 if(usernameResult&&passwordResult){
    return true
 }else if(!usernameResult){
    alert("user name is not valid")
 }else if(!passwordResult){
    alert("password must be between 6 and 20 charecters")
 }
}
export default validateForm