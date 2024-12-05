function HomePage() {
  return (
    <section className="h-[calc(100vh-7rem)] flex justify-center items-center bg-gradient-to-r from-gray-800 to-black">
      <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg border border-gray-300 transition-all duration-500 hover:scale-105">
        <h1 className="text-center text-xl font-semibold text-gray-900 mb-6 transition-all duration-300 hover:text-indigo-700">
          Evaluación para Desarrollador Full Stack
        </h1>

        {/* Logo de la empresa debajo del título */}
        <div className="flex justify-center mb-6">
          <img
            src="https://1.citoplus.com/wp-content/uploads/2019/09/LOGO-FINAL-CITOP_Mesa-de-trabajo-1.png"  // Reemplaza con la ruta correcta del logo
            alt="Logo de la empresa"
            className="w-32 h-auto"
          />
        </div>

        <p className="text-center text-gray-700 text-xs mb-6">
          Evalúa tus habilidades técnicas en frontend, backend y despliegue CITOPLUS.
        </p>

        <div className="space-y-6">
          {/* Proyecto Frontend */}
          <div className="p-4 border-t border-gray-200 transition-transform duration-300 transform hover:scale-105 hover:border-indigo-500">
            <h2 className="text-base font-semibold text-gray-900">1. Frontend</h2>
            <p className="text-gray-600 mt-2 text-xs">
              Desarrolla interfaces en React con login, registro, y dashboard. Implementa filtros interactivos para mostrar datos de la base de datos.
            </p>
            <button className="mt-4 px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-all duration-300">
              Más Información
            </button>
          </div>

          {/* Proyecto Backend */}
          <div className="p-4 border-t border-gray-200 transition-transform duration-300 transform hover:scale-105 hover:border-indigo-500">
            <h2 className="text-base font-semibold text-gray-900">2. Backend</h2>
            <p className="text-gray-600 mt-2 text-xs">
              Crea una API RESTful con Node.js, Prisma y PostgreSQL. Implementa autenticación JWT, middleware de seguridad y manejo de servidores.
            </p>
            <button className="mt-4 px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-all duration-300">
              Más Información
            </button>
          </div>

          {/* Despliegue */}
          <div className="p-4 border-t border-gray-200 transition-transform duration-300 transform hover:scale-105 hover:border-indigo-500">
            <h2 className="text-base font-semibold text-gray-900">3. Despliegue</h2>
            <p className="text-gray-600 mt-2 text-xs">
              Implementa despliegue continuo con herramientas como Docker, CI/CD y configuración de servidores.
            </p>
            <button className="mt-4 px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600 transition-all duration-300">
              Más Información
            </button>
          </div>

          {/* Botones de WhatsApp y Página Web */}
          <div className="flex justify-center space-x-4 mt-6">
            <a
              href="https://wa.me/xxxxxxxxxxx"  // Reemplaza con tu número de WhatsApp
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs bg-green-700 text-white rounded-full hover:bg-green-600 transition-all duration-300"
            >
              WhatsApp
            </a>
            <a
              href="https://tu-pagina-web.com"  // Reemplaza con tu enlace web
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-xs bg-blue-700 text-white rounded-full hover:bg-blue-600 transition-all duration-300"
            >
              Mi Página Web
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
