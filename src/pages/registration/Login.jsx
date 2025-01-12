// import loginImg from "../assets/images/login.webp"
import Template from "../../components/core/Auth/Template"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
    <Template
        title="Welcome to the SRC Mart"
        description1="Shop Smart, Live Better. Essentials for today, savings for tomorrow, and quality for life."
        formType="login"
      />
    </>
  )
}

export default Login