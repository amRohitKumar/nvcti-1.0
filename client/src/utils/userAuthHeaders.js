const authHeader = (thunkAPI) => ({
  headers: {
    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
  },
});

export default authHeader;
