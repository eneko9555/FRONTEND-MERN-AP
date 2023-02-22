import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";
import Swal from 'sweetalert2'

const PacientesContext = createContext()


const PacientesProvider = ({ children }) => {

    const { auth } = useAuth()

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    useEffect(() => {
        const obtenerPacientes = async () => {

            try {
                const token = localStorage.getItem('token')
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/pacientes', config)
                setPacientes(data)

            } catch (error) {
                console.log(error);
            }
        }
        obtenerPacientes()

    }, [auth])


    //Edicion paciente
    const setEdicion = paciente => {
        setPaciente(paciente)

    }

    //Eliminar Paciente
    const eliminarPaciente = async id => {

       Swal.fire({
        title: '¿Seguro que quieres eliminar el paciente?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: 'Eliminar Paciente',
        denyButtonText: `Cancelar`,
        }).then( async (result) => {
            
            if (result.isConfirmed) {
                Swal.fire('Paciente Eliminado', '', 'success')

                try {
                    const token = localStorage.getItem('token')
                    const config = {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                    const { data } = await clienteAxios.delete(`/pacientes/${id}`, config)
                    const pacienteActualizado = pacientes.filter(pacienteState => pacienteState._id !== id)
    
                    setPacientes(pacienteActualizado)
    
    
                } catch (error) {
                    console.log(error.response.msg);
                }

            } else if (result.isDenied) {
                Swal.fire('No se ha eliminado el paciente', '', 'info')
            }
        })

    
    }

    const guardarPaciente = async (paciente) => {

        if (paciente.id) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacienteActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

                setPacientes(pacienteActualizado)

            } catch (error) {
                console.log(error);
            }



        } else {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
                const { data } = await clienteAxios.post('/pacientes', paciente, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data


                setPacientes([pacienteAlmacenado, ...pacientes])


            } catch (error) {
                console.log(error.response.data.msg);
            }
        }



    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente

            }}

        >

            {children}
        </PacientesContext.Provider>
    )

}

export { PacientesProvider }


export default PacientesContext

