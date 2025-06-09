import axiosInstance from "../axiosInstance";

const userService = {
  signUp: async (user) => {
    const response = await axiosInstance.post("/api/users", user, {
      headers: {
        skip: "true",
      },
    });
    return response.data;
  },
};

export default userService;
