import axiosInstance from "../axiosInstance";

const listingService = {
  getAll: async (params = {}) => {
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined
      )
    );

    const response = await axiosInstance.get("/api/listings", {
      headers: {
        skip: "true",
      },
      params: filteredParams,
    });

    return response.data;
  },
  get: async (id) => {
    const response = await axiosInstance.get(`/api/listings/${id}`, {
      headers: {
        skip: "true",
      }
    });

    return response.data;
  },
  create: async (listing) => {
    const response = await axiosInstance.post("/api/listings/create", listing);
    return response.data;
  },
  edit: async (listing, id) => {
    const response = await axiosInstance.put(`/api/listings/edit/${id}`, listing);
    return response.data;
  },
  getForEdit: async (id) => {
    const response = await axiosInstance.get(`/api/listings/edit/${id}`);
    return response.data;
  },
  delete: async(id) => {
    await axiosInstance.delete(`/api/listings/delete/${id}`);
  }
};

export default listingService;
