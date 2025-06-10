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
};

export default listingService;
