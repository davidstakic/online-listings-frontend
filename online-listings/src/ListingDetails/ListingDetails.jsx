import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import listingService from "../service/listingService";
import NotFound from "../NotFound/NotFound";

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await listingService.get(id);
        setListing(data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          console.error("Failed to fetch listing:", error);
        }
      }
    };

    fetchListing();
  }, [id]);

  if (notFound) {
    return <NotFound />;
  }

  return (
    <div className="container d-flex justify-content-center min-vw-100 mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          {listing.imageUrl && (
            <img
              src={listing.imageUrl}
              alt={listing.name || "Listing Image"}
              className="img-fluid rounded mb-4 shadow-sm"
              style={{ width: "100%", objectFit: "cover", maxHeight: "500px" }}
            />
          )}
          <h1 className="display-5 fw-bold text-success mb-2">
            {listing.price && `$${listing.price.toFixed(2)}`}
          </h1>
          <h2 className="mb-3">{listing.name}</h2>
          <p className="fs-5 text-muted">{listing.description}</p>
          <div className="mt-4 border-top pt-3">
            <div className="text-muted small">
              <span className="me-3">{listing.category}</span>
              <span className="me-3">{listing.ownerUsername}</span>
              <span className="me-3">{listing.ownerPhone}</span>
              <span>
                {new Date(listing.listedAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingDetails;
