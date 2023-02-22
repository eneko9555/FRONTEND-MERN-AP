import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"

import Alerta from "../components/alerta"
import clienteAxios from '../config/axios'

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
  const [cargando, setCargando] = useState(true)
  const [alerta, setAlerta] = useState({})

  const params = useParams()
  const {token} = params

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${token}`
        const { data } = await clienteAxios(url)
        setCuentaConfirmada(true)
        setAlerta({
          msg: data.msg
        })

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }

      setCargando(false)
    }
    confirmarCuenta()
  }, [])

  return (
    <>
      <div className="text-center">
        <h1 className="text-indigo-700 font-black text-6xl  ">
          Confirma tu Cuenta y Comienza a Administrar
          <span className="text-black"> tus Pacientes</span>
        </h1>
      </div>

      <div className="text-center shadow-lg rounded-xl bg-white mt-20 md:mt-16 p-5 ">
        {!cargando &&
         <Alerta
          alerta={alerta}
        />}
        {cuentaConfirmada && (
           <Link className='block my-3 text-gray-500' to="/"> Iniciar Sesión</Link>
        )}
      

      </div>
    </>
  )
}

export default ConfirmarCuenta