import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from '../components/alerta'
import clienteAxios from "../config/axios"

const NuevoPassword = () => {

  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [iniciarSesion, setIniciarSesion] = useState(false)


  const params = useParams()
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/recuperar-password/${token}`)
        setAlerta({
          msg: 'Escribe tu nuevo Password'
        })
        setTimeout(() => {
          setAlerta({})
        }, 3000);
        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
        setTimeout(() => {
          setAlerta({})
        }, 3000);
        console.log(error);
      }
    }
    comprobarToken()

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password.length < 6) {
      setAlerta({
        msg: 'El password debe tener mínimo 6 caracteres',
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }

    try {
      const url = `/veterinarios/recuperar-password/${token}`
      const { data } = await clienteAxios.post(url, { password })
      setAlerta({
        msg: data.msg,
        error: false
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);

      setIniciarSesion(true)


    } catch (error) {
      setAlerta({
        msg: error.response.msg,
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
          Restablece tu Password y no pierdas a
          <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className="text-center shadow-lg rounded-xl bg-white mt-20 md:mt-16 p-5 ">

        {msg &&
          <Alerta
            alerta={alerta}
          />
        }

        {tokenValido && (
          <>
            <form onSubmit={handleSubmit}>

              <div>
                <label className="uppercase text-gray-600 block text-xl font-bold mt-5">Nuevo Password</label>
                <input
                  type="password" placeholder="Tu Nuevo Password..."
                  className="border w-3/4  p-3 mt-3 bg-gray-50 rounded-xl"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Restablecer Password"
                className="bg-indigo-700 w-3/4 py-3 rounded-xl mt-5 text-white font-bold uppercase hover:cursor-pointer hover:bg-indigo-800"
              />

            </form>

            {iniciarSesion && (

              <Link className='block my-3 text-gray-500' to="/" >Iniciar Sesión</Link>

            )}

          </>

        )}



      </div>


    </>

  )
}

export default NuevoPassword