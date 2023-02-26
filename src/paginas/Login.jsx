import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import Alerta from '../components/alerta'
import clienteAxios from '../config/axios'

const Login = () => {

  const { setAuth } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([email, password].includes('')) {

      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }

    try {
      const { data } = await clienteAxios.post('/veterinarios/login', { email, password })
      localStorage.setItem('token', data.token)
      setAuth(data)
      navigate('/admin')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
    }

  }


  const { msg } = alerta

  return (
    <>
      <div className="text-center">
        <h1 className="text-indigo-700 font-black text-6xl  ">
          Inicia Sesión y Administra tus
          <span className="text-black"> Pacientes</span>
        </h1>
      </div>

      <div className="text-center shadow-lg rounded-xl bg-white mt-20 md:mt-16 p-5 ">

        {msg && <Alerta
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
            <input
              type="text" placeholder="Tu Email..."
              className="border w-3/4  p-3 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="uppercase text-gray-600 block text-xl font-bold mt-3">Password</label>
            <input
              type="password" placeholder="Tu Password..."
              className="border w-3/4 p-3 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-indigo-700 w-3/4 py-3 rounded-xl mt-5 text-white font-bold uppercase hover:cursor-pointer hover:bg-indigo-800"
          />
        </form>

        <nav className='mt-8 xl:flex lg:justify-around '>
          <Link className='block my-3 text-gray-500' to="/registrar">¿No tienes una cuenta? Registrate</Link>
          <Link className='block my-3 text-gray-500' to="/recuperar-password">He olvidado mi contraseña</Link>
        </nav>
      </div>
    </>
  )
}

export default Login