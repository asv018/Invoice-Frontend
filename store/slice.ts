import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface productDetailsProps {
  name: string;
  quantity: number;
  rate: number;
  key: number;
  total: number;
  description: "";
}
export interface ProductState {
  productDetails: productDetailsProps[];
}

const initialState: ProductState = {
  productDetails: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    addProduct: (state: any, action) => {
      if (state.productDetails.length == 0) {
        state.productDetails = [
          {
            ...action.payload,
            key: 0,
            total: action.payload.rate * action.payload.quantity,
          },
        ];
      } else {
        state.productDetails = [
          ...state.productDetails,
          {
            ...action.payload,
            key: state.productDetails.length,
            total: action.payload.rate * action.payload.quantity,
          },
        ];
      }
    },
  },
});

export const { addProduct } = productSlice.actions;

export default productSlice.reducer;
