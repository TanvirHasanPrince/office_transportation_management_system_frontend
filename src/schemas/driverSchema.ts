import * as Yup from "yup";

const driverSchema = Yup.object().shape({
  name: Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string().default(""),
    lastName: Yup.string().required("Last name is required"),
  }),
  phoneNumber: Yup.string()
    .matches(/^\d{6,}$/, "Invalid phone number, must be at least 6 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
  vehicle: Yup.object().shape({
    brand: Yup.string().required("Vehicle brand is required"),
    model: Yup.string().required("Vehicle model is required"),
    year: Yup.number().required("Vehicle year is required"),
    plateNumber: Yup.string().required("Vehicle plate number is required"),
    color: Yup.string().required("Vehicle color is required"),
  }),
});

export default driverSchema;
