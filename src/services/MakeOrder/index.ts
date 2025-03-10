/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";

export const makeNeedTutionOrder = async (fieldData: FieldValues) => {
    // console.log("use server",fieldData);
  try {
    const res = await fetch(
      `https://tutorlink-backend.vercel.app/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fieldData),
      }
    );

    const result = await res.json();
    // console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};
export const makeTutoringPostOrder = async (fieldData: FieldValues) => {
    // console.log("use server",fieldData);
  try {
    const res = await fetch(
      `https://tutorlink-backend.vercel.app/tutoring-order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fieldData),
      }
    );

    const result = await res.json();
    // console.log(result);
    return result;
  } catch (error: any) {
    return Error(error);
  }
};