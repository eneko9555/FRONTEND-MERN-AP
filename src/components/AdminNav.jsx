import { Link } from "react-router-dom"

const AdminNav = () => {
    return (
        <nav className="flex gap-5 justify-center md:justify-start lg:ml-10">
            <Link
                to="/admin/perfil"
                className="font-bold uppercase text-gray-500 hover:border-b-2 transition-all"
            >Perfil</Link>

            <Link
                to="/admin/cambiar-password"
                className="font-bold uppercase text-gray-500 hover:border-b-2 transition-all"
            >Cambiar Password</Link>

        </nav>
    )
}

export default AdminNav