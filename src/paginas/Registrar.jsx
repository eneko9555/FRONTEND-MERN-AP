import {Link} from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/alerta'
import clienteAxios from '../config/axios'

const Registrar = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repetirPassword, setRepetirPassword] = useState('')

    const [alerta, setAlerta] = useState({})

    const handleSubmit = async (e) => {
        e.preventDefault();

        if([nombre, email, password, repetirPassword].includes('')){
            setAlerta({ msg: 'No puede haber campos vacios', error : true })
            return;
        }

        if(password != repetirPassword){
            setAlerta({ msg: 'Los Passwords deben ser iguales', error : true })
            return;
        }

        if(password.length < 6 ){
            setAlerta({ msg: 'El Password debe superar 6 caracteres', error : true })
            return;
        }

        setAlerta({})

        // Crear usuario 

        try {
           
            await clienteAxios.post( '/veterinarios' , {nombre, email, password})
            setAlerta({
                msg: 'Usuario creado correctamente, revisa tu email',
                error: false
            })
           
        } catch (error) {
            setAlerta({
                msg : error.response.data.msg,
                error: true
            })
        }
    }


    const { msg } = alerta

    return (
        <>
            <div className="text-center">
                <h1 className="text-indigo-700 font-black text-6xl  ">
                    Crea tu Cuenta y Administra
                    <span className="text-black"> tus Pacientes</span>
                </h1>
            </div>

            <div className="text-center shadow-lg rounded-xl bg-white mt-20 md:mt-16 p-5 ">

               {msg && <Alerta 
                    alerta={alerta}
                />}

                <form
                    onSubmit={handleSubmit}
                >
                    <div>
                        <label className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
                        <input
                            type="text" placeholder="Tu Nombre..."
                            className="border w-3/4  p-3 mt-3 bg-gray-50 rounded-xl"
                            value={nombre}
                            onChange= {e => setNombre(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="uppercase text-gray-600 block text-xl mt-5 font-bold">Email</label>
                        <input
                            type="email" placeholder="Tu Email..."
                            className="border w-3/4  p-3 mt-3 bg-gray-50 rounded-xl"
                            value={email}
                            onChange= {e => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="uppercase text-gray-600 block text-xl font-bold mt-5">Password</label>
                        <input
                            type="password" placeholder="Tu Password..."
                            className="border w-3/4  p-3 mt-3 bg-gray-50 rounded-xl"
                            value={password}
                            onChange= {e => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="uppercase text-gray-600 block text-xl font-bold mt-5">Repetir Password</label>
                        <input
                            type="password" placeholder="Repite tu Password..."
                            className="border w-3/4  p-3 mt-3 bg-gray-50 rounded-xl"
                            value={repetirPassword}
                            onChange= {e => setRepetirPassword(e.target.value)}
                        />
                    </div>

                    <input
                        type="submit"
                        value="Crear Cuenta"
                        className="bg-indigo-700 w-3/4 py-3 rounded-xl mt-5 text-white font-bold uppercase hover:cursor-pointer hover:bg-indigo-800"
                    />
                </form>

                <nav className='mt-8 xl:flex lg:justify-around '>
                    <Link className='block my-3 text-gray-500' to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
                    <Link className='block my-3 text-gray-500' to="/recuperar-password">He olvidado mi contraseña</Link>
                </nav>

            </div>
        </>
    )
}

export default Registrar