import * as Yup from "yup";

const employeeSchema = Yup.object().shape({
  name: Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string().default(""),
    lastName: Yup.string().required("Last name is required"),
  }),
  phoneNumber: Yup.string()
    .matches(/^\d{11}$/, "Invalid phone number, must be 11 digits")
    .required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  role: Yup.string().required("Role is required"),
});

export default employeeSchema;
