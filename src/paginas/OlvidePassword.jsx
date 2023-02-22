import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/alerta'
import clienteAxios from '../config/axios'

const OlvidePassword = () => {

    const [email, setEmail] = useState('')
    const [alerta, setAlerta] = useState({})
    
    const handleSubmit = async (e) => {
        e.preventDefault()
       
        if (email === '') {
            setAlerta({ msg: 'El email es obligatorio', error: true }) 
            return
        }
    
        try {
            const {data} = await clienteAxios.post('/veterinarios/olvide-password',{email}) 
            setAlerta({
                msg: data.msg
            })

        } catch (error) {
             setAlerta({
                 msg: error.response.data.msg,
                 error: true
             })
        }

    }

    const {msg} = alerta

    return (
        <>
            <div className="text-center">
                <h1 className="text-indigo-700 font-black text-6xl  ">
                    Recupera tu Acceso y no pierdas
                    <span className="text-black"> tus Pacientes</span>
                </h1>
            </div>

            <div className="text-center shadow-lg rounded-xl bg-white mt-20 md:mt-16 p-5 pb-8 ">


                {msg && <Alerta
                    alerta={alerta}
                />}
                <form
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="uppercase text-gray-600 block text-xl font-bold">Email</label>
                        <input
                            type="email" placeholder="Tu Email..."
                            className="border w-3/4  p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Enviar Instrucciones"
                        className="bg-indigo-700 w-3/4 py-3 rounded-xl mt-5 text-white font-bold uppercase hover:cursor-pointer hover:bg-indigo-800"
                    />
                </form>

            

                <nav className='mt-8 lg:flex lg:justify-around '>
                    <Link className='block my-3 text-gray-500' to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link className='block my-3 text-gray-500' to="/registrar">¿No tienes una cuenta? Registrate</Link>
                </nav>
            </div>
        </>
    )
}

export default OlvidePassword