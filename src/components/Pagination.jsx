import './styles/Pagination.css';

// Componente de paginación que recibe tres props:
// - currentPage: Página actual en la que se encuentra el usuario
// - totalPages: Total de páginas disponibles
// - onPageChange: Función que actualiza el estado de la página en el componente padre
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className='pagination'>
            {/* Botón para retroceder una página.
          Se deshabilita si el usuario está en la primera página. */}
            <button className='pagination__btn' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
                Anterior
            </button>

            {/* Muestra el número de la página actual y el total de páginas */}
            <span className='pagination__index'>Página {currentPage} de {totalPages}</span>

            {/* Botón para avanzar una página.
          Se deshabilita si el usuario está en la última página. */}
            <button className='pagination__btn-sig' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Siguiente
            </button>
        </div>
    );
};

// Exportamos el componente para que pueda ser utilizado en otros lugares de la aplicación
export default Pagination;
