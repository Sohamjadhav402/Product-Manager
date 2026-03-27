import { useProducts } from '../hooks/useProducts.js'
import { ProductGrid } from '../components/ProductGrid.jsx'
import { SearchBar } from '../components/SearchBar.jsx'
import { Pagination } from '../components/Pagination.jsx'

export default function Products() {
  const {
    paginatedProducts,
    loading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useProducts()

  return (
    <main className="page">
      <section className="section">
        <div className="section-header">
          <h1>Products</h1>
        </div>
        <div className="filters-bar">
          <div className="filters-left">
            <label htmlFor="category-select" className="label">
              Category
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All categories' : cat}
                </option>
              ))}
            </select>
          </div>
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>
        {loading && <p>Loading products...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && !error && (
          <>
            <ProductGrid products={paginatedProducts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </section>
    </main>
  )
}

