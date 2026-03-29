// Steps for state management 

// Submit Action
// Handel action in it's reducer
// Register here => reducer


//Universal Redux steps for state Management

// Submit (dispatch) action from component
// Handle action in reducer
// Register reducer in store


import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./reducer/authReducer"
import postReducer from "./reducer/postReducer"

export const store =configureStore({
    reducer:{
        auth:authReducer,
        postReducer:postReducer

    }
})

