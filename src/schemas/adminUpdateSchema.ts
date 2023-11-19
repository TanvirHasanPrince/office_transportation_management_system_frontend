import * as Yup from "yup";

const adminUpdateSchema = Yup.object().shape({
  name: Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string().default(""),
    lastName: Yup.string().required("Last name is required"),
  }),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, "Invalid phone number, must be 11 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
});

export default adminUpdateSchema;
