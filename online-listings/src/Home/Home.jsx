import { useEffect, useState } from "react";
import listingService from "../service/listingService";
import { useAuth } from "../Login/AuthContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { isLoggedIn, getUserInfo } = useAuth();

  const [listings, setListings] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [params, setParams] = useState({
    category: "",
    keyword: "",
    minPrice: "",
    maxPrice: "",
    owner: "",
    page: 1,
  });

  const navigate = useNavigate();

  const[refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await listingService.getAll(params);
        setListings(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch listings:", error);
      }
    };

    fetchListings();
  }, [params, refresh]);

  const prevPage = () => {
    if (params.page > 1) {
      setParams((prev) => ({
        ...prev,
        page: prev.page - 1,
      }));
    }
  };

  const pageClick = (pageNumber) => () => {
    setParams((prev) => ({
      ...prev,
      page: pageNumber,
    }));
  };

  const nextPage = () => {
    if (params.page < totalPages) {
      setParams((prev) => ({
        ...prev,
        page: prev.page + 1,
      }));
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);

  const deleteListing = async () => {
      try {
        await listingService.delete(selectedListingId);
        setRefresh((prev) => !prev);
      } catch (error) {
        console.error("Failed to delete listing:", error);
      }
    };

  return (
    <>
      <form
        className="container d-flex flex-row justify-content-center align-items-end gap-3 mb-3"
        style={{ paddingTop: "100px" }}
      >
        <div className="form-group col-md-2">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            value={params.category}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                category: e.target.value,
                page: 1,
              }))
            }
          >
            <option value=""></option>
            <option value="CLOTHING">CLOTHING</option>
            <option value="TOOLS">TOOLS</option>
            <option value="SPORTS">SPORTS</option>
            <option value="ACCESSORIES">ACCESSORIES</option>
            <option value="FURNITURE">FURNITURE</option>
            <option value="PETS">PETS</option>
            <option value="GAMES">GAMES</option>
            <option value="BOOKS">BOOKS</option>
            <option value="TECHNOLOGY">TECHNOLOGY</option>
          </select>
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            className="form-control"
            id="search"
            value={params.keyword}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                keyword: e.target.value,
                page: 1,
              }))
            }
          />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            className="form-control"
            id="minPrice"
            value={params.minPrice}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                minPrice: e.target.value,
                page: 1,
              }))
            }
          />
        </div>
        <div className="form-group col-md-2">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            className="form-control"
            id="maxPrice"
            value={params.maxPrice}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                maxPrice: e.target.value,
                page: 1,
              }))
            }
          />
        </div>
        {isLoggedIn && (
          <div className="form-check col-md-2">
            <label className="form-check-label" htmlFor="mine">
              Show mine only
            </label>
            <input
              type="checkbox"
              className="form-check-input"
              id="mine"
              onChange={(e) =>
                setParams((prev) => ({
                  ...prev,
                  owner: e.target.checked ? getUserInfo().sub : "",
                  page: 1,
                }))
              }
            />
          </div>
        )}
      </form>
      <div className="container d-flex flex-column align-items-center min-vw-100 min-vh-100">
        <div className="col-md-10">
          <table className="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">City</th>
                <th scope="col">Category</th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr
                  key={listing.id}
                  onClick={() => navigate(`/listing/${listing.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>
                    <img
                      src={listing.imageUrl}
                      style={{ width: 50, height: 50 }}
                    />
                  </td>
                  <td>{listing.name}</td>
                  <td>{listing.price}</td>
                  <td>{listing.city}</td>
                  <td>{listing.category}</td>
                  {isLoggedIn && getUserInfo().sub === listing.owner && (
                    <>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/listing/edit/${listing.id}`);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedListingId(listing.id);
                            setShowModal(true);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <button className="page-link" onClick={prevPage}>
                &lt;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`page-item ${params.page === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={pageClick(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link" onClick={nextPage}>
                &gt;
              </button>
            </li>
          </ul>
        </nav>
        {showModal && (
          <div
            className="modal fade show d-block"
            onClick={() => setShowModal(false)}
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header position-relative">
                  <h5 className="modal-title">Are you sure?</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setShowModal(false)}
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1rem",
                    }}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>This action will delete the listing permanently.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      setShowModal(false);
                      deleteListing();
                    }}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
