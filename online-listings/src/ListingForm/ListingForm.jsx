import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Login/AuthContext";
import listingService from "../service/listingService";
import NotFound from "../NotFound/NotFound";

function ListingForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getUserInfo } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    price: "",
    category: "",
    owner: getUserInfo().sub,
    city: "",
  });

  const [errors, setErrors] = useState({
    nameError: null,
    descriptionError: null,
    imageUrlError: null,
    priceError: null,
    categoryError: null,
    cityError: null,
  });

  const urlRegex =
    /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await listingService.getForEdit(id);
        setFormData(data);
        setNotFound(false);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotFound(true);
        } else {
          console.error("Failed to fetch listing:", error);
        }
      }
    };

    if (id) {
      fetchListing();
    }
  }, [id]);

  if (notFound) {
    return <NotFound />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    setFormData((prev) => ({
      ...prev,
      name: prev.name.trim(),
      description: prev.description.trim(),
      imageUrl: prev.imageUrl.trim(),
      city: prev.city.trim(),
    }));

    if (formData.name === "") {
      setErrors((prev) => ({
        ...prev,
        nameError: "Please enter a name.",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        nameError: null,
      }));
    }

    if (formData.description === "") {
      setErrors((prev) => ({
        ...prev,
        descriptionError: "Please enter a description.",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        descriptionError: null,
      }));
    }

    if (formData.imageUrl === "") {
      setErrors((prev) => ({
        ...prev,
        imageUrlError: "Please enter an image URL.",
      }));
      hasError = true;
    } else if (!urlRegex.test(formData.imageUrl)) {
      setErrors((prev) => ({
        ...prev,
        imageUrlError: "Please enter a valid URL.",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        imageUrlError: null,
      }));
    }

    if (formData.price === "") {
      setErrors((prev) => ({
        ...prev,
        priceError: "Please enter a price.",
      }));
      hasError = true;
    } else if (formData.price <= 0) {
      setErrors((prev) => ({
        ...prev,
        priceError: "Please enter a number greater than 0.",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        priceError: null,
      }));
    }

    if (formData.category === "") {
      setErrors((prev) => ({
        ...prev,
        categoryError: "Please select a category.",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        categoryError: null,
      }));
    }

    if (formData.city === "") {
      setErrors((prev) => ({
        ...prev,
        cityError: "Please enter a city.",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({
        ...prev,
        cityError: null,
      }));
    }

    if (!hasError) {
      try {
        if (id) {
          await listingService.edit(formData, id);
        } else {
          await listingService.create(formData);
        }
        setErrors((prev) => ({
          ...prev,
          submitError: null,
        }));
        navigate("/");
      } catch (error) {
        console.error("Failed to fetch listing:", error);
      }
    }
  };

  return (
    <>
      <div
        className="container d-flex flex-column justify-content-center align-items-center min-vh-100 min-vw-100"
        style={{ padding: "100px" }}
      >
        <div className="card shadow p-4 col-md-5">
          <h1 className="text-center mb-4">
            {id ? "Edit Listing" : "Create Listing"}
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className={`form-control ${
                  errors.nameError ? "is-invalid" : ""
                }`}
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              {errors.nameError && (
                <div className="invalid-feedback d-block">
                  {errors.nameError}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                className={`form-control ${
                  errors.descriptionError ? "is-invalid" : ""
                }`}
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
              />
              {errors.descriptionError && (
                <div className="invalid-feedback d-block">
                  {errors.descriptionError}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="imageUrl">Image URL</label>
              <input
                type="text"
                className={`form-control ${
                  errors.imageUrlError ? "is-invalid" : ""
                }`}
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
                }
              />
              {errors.imageUrlError && (
                <div className="invalid-feedback d-block">
                  {errors.imageUrlError}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                step="0.01"
                className={`form-control ${
                  errors.priceError ? "is-invalid" : ""
                }`}
                id="price"
                value={formData.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
              />
              {errors.priceError && (
                <div className="invalid-feedback d-block">
                  {errors.priceError}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="category">Category</label>
              <select
                className={`form-control ${
                  errors.categoryError ? "is-invalid" : ""
                }`}
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value,
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
              {errors.categoryError && (
                <div className="invalid-feedback d-block">
                  {errors.categoryError}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className={`form-control ${
                  errors.cityError ? "is-invalid" : ""
                }`}
                id="city"
                value={formData.city}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, city: e.target.value }))
                }
              />
              {errors.cityError && (
                <div className="invalid-feedback d-block">
                  {errors.cityError}
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ListingForm;
