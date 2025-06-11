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
  }
};

export default listingService;
