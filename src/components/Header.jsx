import useAuth from "../hooks/useAuth"
import { Link } from "react-router-dom"
import { useState } from "react"

const Header = () => {

    const { auth, cerrarSesion } = useAuth()
    const { nombre } = auth
    const [toggle, setToggle] = useState(true)


    const mostrarMenu = () => {
        const btn = document.querySelector('.navbar')
        btn.classList.toggle('hidden')
            if(btn.classList.contains('hidden')){
                setToggle(true)
            }else{
                setToggle(false)
            }
    }

    return (
        <header className="p-12   bg-indigo-600">
            <div className="container  mx-auto flex flex-col md:flex-row justify-between gap-6 items-center">

                <h1 className="font-bold text-3xl  text-indigo-200 text-center ">Administrador de
                    <span className="text-white"> Pacientes </span>
                    de <span className="uppercase">{nombre}</span>
                </h1>


                <button
                    type="button"
                    onClick={mostrarMenu}
                    className="text-white block md:hidden text-sm uppercase font-bold hover:text-gray-300 border-2 border-white transition-all p-2  rounded-md "

                >{toggle ? "Mostrar Menu" : "Esconder Menu"}
                </button>

                <div className="navbar hidden md:block">
                    <nav className="flex  flex-col gap-4 md:flex-row  md:gap-20 text-center transition-colors md:items-center ">

                        <Link to='/admin' className="text-white  text-sm uppercase font-bold hover:text-gray-300 hover:border-b-2 border-white p-1 transition-all">Pacientes</Link>

                        <Link to='/admin/perfil' className="text-white  text-sm uppercase font-bold hover:text-gray-300 hover:border-b-2 border-white p-1 transition-all">Perfil</Link>

                        <button
                            type="button"
                            className="text-white  text-sm uppercase font-bold hover:text-gray-300 hover:border-b-2 border-white transition-all p-2"
                            onClick={cerrarSesion}
                        >Cerrar Sesión

                        </button>


                    </nav>
                </div>


            </div>




        </header>
    )
}

export default Header