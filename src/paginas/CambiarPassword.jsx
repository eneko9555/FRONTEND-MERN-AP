import AdminNav from "../components/AdminNav"
import { useState } from "react"
import Alerta from "../components/alerta"
import useAuth from "../hooks/useAuth"

const CambiarPassword = () => {

  const { guardarPassword } = useAuth()
  const [alerta, setAlerta] = useState({})
  const [password, setPassword] = useState({
    pwd_actual: "",
    pwd_nuevo: ""
  })


  const handleSubmit = async e => {
    e.preventDefault()

    if (Object.values(password).some(campo => campo === "")) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return
    }

    if (password.pwd_nuevo.length < 6) {
      setAlerta({
        msg: 'El Password debe tener mínimo 6 caracteres',
        error: true
      })
      setTimeout(() => {
        setAlerta({})
      }, 3000);
      return

    }

    const respuesta = await guardarPassword(password)

    setAlerta(respuesta)

  }


  const { msg } = alerta






  return (
    <>
      <AdminNav />
      <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
      <p className="textl-xl mt-5 mb-10 text-center">Modifica tu <span className="text-indigo-600 font-bold">Password aqui</span>
      </p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
          {msg &&
            <Alerta
              alerta={alerta}
            />}


          <form
            onSubmit={handleSubmit}
          >
            <div className="my-5">
              <label className="uppercase font-bold text-gray-600">Password actual</label>
              <input
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                type="password"
                name="pwd_actual"
                placeholder="Escribe tu password actual"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <div className="my-5">
              <label className="uppercase font-bold text-gray-600">Nueva Password</label>
              <input
                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                type="password"
                name="pwd_nuevo"
                placeholder="Escribe tu nuevo password"
                onChange={e => setPassword({
                  ...password,
                  [e.target.name]: e.target.value
                })}
              />
            </div>

            <input
              value="Actualizar Password"
              className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-xl hover:rounded-3xl transition-all uppercase w-full mt-5"
              type="submit" />

          </form>
        </div>

      </div>
    </>
  )
}

export default CambiarPassword