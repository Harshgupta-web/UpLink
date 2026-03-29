import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/login",
  async (userAgent, thunkAPI) => {
    try {
      const response = await clientServer.post("/login", {
        email: userAgent.email,
        password: userAgent.password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        return thunkAPI.rejectWithValue({
          message: "Token is not Provided",
        });
      }

      return thunkAPI.fulfillWithValue(response.data.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const request = await clientServer.post("/register", {
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
      });
      return thunkAPI.fulfillWithValue(request.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAboutUser = createAsyncThunk(
  "user/getAboutUser",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get("/get_user_and_profile", {
        params: {
          token: user.token,
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("user/get_all_profiles");

      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const sendConnectionRequest = createAsyncThunk(
  "user/sendConnectionRequest",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post(
        "/user/send_connection_request",
        {
          token: user.token,
          connectionId: user.userId,
        },
      );

      thunkAPI.dispatch(getConnectionRequest({ token: user.token }));
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

// export const acceptConnectionRequest = createAsyncThunk(
//   "user/acceptConnectionRequest",
//   async (user, thunkAPI) => {
//     try {
//       const response = await clientServer.post(
//         "/user/accept_connection_request",
//         {
//           token: user.token,
//           connectionId: user.userId,
//         },
//       );
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.message);
//     }
//   },
// );

export const getConnectionRequest = createAsyncThunk(
  "user/getConnectionRequest",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get("/user/getConnectionRequests", {
        params: {
          token: user.token,
        }
      });
      return thunkAPI.fulfillWithValue(response.data.connection);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getMyConnectionRequests = createAsyncThunk(
  "user/getMyConnectionRequests",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get(
        "/user/user_connection_requests",
        {
            params:{
                token: user.token
            }
           
        });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const AcceptConnection= createAsyncThunk(
    "user/AcceptConnection",
    async (user,thunkAPI)=>{
        try {
            
            const response=await clientServer.post("/user/accept_connection_request",{
                token:user.token,
                requestId:user.connectionId,
                action_type:user.action
            });
            thunkAPI.dispatch(getConnectionRequest({token:user.token}));
            thunkAPI.dispatch(getMyConnectionRequests({token:user.token}));
            return thunkAPI.fulfillWithValue(response.data);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)


