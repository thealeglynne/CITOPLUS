"use client"; // Asegúrate de usar "use client" para habilitar la ejecución en el cliente
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { getSession } from "next-auth/react"; // Importa getSession para obtener la sesión

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // Estado para usuarios filtrados
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [searchBy, setSearchBy] = useState("id"); // Estado para el campo por el cual se realiza la búsqueda
  const [username, setUsername] = useState(""); // Estado para guardar el nombre de usuario

  // Recuperar los usuarios cuando el componente se monta
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Aquí se hace la llamada al endpoint
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users); // Asumiendo que la respuesta tiene una propiedad "users"
          setFilteredUsers(data.users); // Inicializamos los usuarios filtrados con todos los usuarios
        } else {
          console.error("Error fetching users:", data.error);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();

    // Obtener la sesión del usuario
    const getUserSession = async () => {
      const session = await getSession();
      if (session && session.user) {
        setUsername(session.user.username); // Asume que el nombre de usuario está en session.user.username
      }
    };
    getUserSession();
  }, []);

  // Función para manejar el cambio en el término de búsqueda
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term); // Actualiza el término de búsqueda

    // Filtrar usuarios en el frontend basado en el campo de búsqueda
    if (term === "") {
      setFilteredUsers(users); // Si no hay término de búsqueda, muestra todos los usuarios
    } else {
      const filtered = users.filter((user) => {
        if (searchBy === "id") {
          return user.id.toString().includes(term);
        } else if (searchBy === "email") {
          return user.email.toLowerCase().includes(term.toLowerCase());
        } else if (searchBy === "username") {
          return user.username.toLowerCase().includes(term.toLowerCase());
        }
        return false;
      });
      setFilteredUsers(filtered); // Actualiza los usuarios filtrados
    }
  };

  // Función para manejar el cambio en la selección del campo de búsqueda
  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value); // Actualiza el campo por el cual se va a realizar la búsqueda
  };

  return (
    <section className="h-[calc(100vh-7rem)] bg-gradient-to-r from-gray-800 to-black flex justify-center items-center">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        {/* Mensaje de bienvenida */}
        <h1 className="text-3xl font-semibold text-gray-900 text-center mb-6">
          Bienvenido, {username || "Usuario"}!
        </h1>

        {/* Campo de selección para elegir cómo buscar */}
        <div className="mb-4 flex justify-center gap-4">
          <select
            value={searchBy}
            onChange={handleSearchByChange}
            className="w-auto p-3 text-sm rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200 ease-in-out shadow-sm"
          >
            <option value="id">Buscar por ID</option>
            <option value="email">Buscar por Email</option>
            <option value="username">Buscar por Username</option>
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder={`Buscar por ${searchBy.charAt(0).toUpperCase() + searchBy.slice(1)}`}
            className="w-full md:w-80 p-3 text-sm rounded-lg border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition duration-200 ease-in-out shadow-sm placeholder-gray-500"
          />
        </div>

        {/* Mostrar la tabla de usuarios filtrados */}
        {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
          <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-md">
            <table className="min-w-full text-gray-700 table-auto">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-4 py-2 text-left font-medium text-xs uppercase">ID</th>
                  <th className="px-4 py-2 text-left font-medium text-xs uppercase">Email</th>
                  <th className="px-4 py-2 text-left font-medium text-xs uppercase">Username</th>
                  <th className="px-4 py-2 text-left font-medium text-xs uppercase">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 text-sm">{user.id}</td>
                    <td className="px-4 py-2 text-sm">{user.email}</td>
                    <td className="px-4 py-2 text-sm">{user.username}</td>
                    <td className="px-4 py-2 text-sm">{user.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-700 mt-4 text-sm">No users found.</p>
        )}

        {/* Logout Button */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 transition duration-200 ease-in-out"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;
