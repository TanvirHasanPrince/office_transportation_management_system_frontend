"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormTextArea from "@/components/forms/FormTextArea";
import { Button, Col, Row, message } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useEmployeeQuery,
  useUpdateEmployeeMutation,
} from "@/redux/api/employeeApi";
import employeeUpdateSchema from "@/schemas/employeeUpdateSchema";
import { useDriverQuery, useUpdateDriverMutation } from "@/redux/api/driverApi";

export type IDProps = {
  params: any;
};

const EditDriverPage = ({ params }: IDProps) => {
  const { id } = params;

  const { data } = useDriverQuery(id);
  const [updateDriver] = useUpdateDriverMutation();

  const onSubmit = async (values: any) => {
    try {
      console.log(values);
      await updateDriver({ id, body: values });
      message.success("Driver updated Successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };

  //@ts-ignore
  const defaultValues = {
    name: {
      firstName: data?.name?.firstName || "",
      middleName: data?.name?.middleName || "",
      lastName: data?.name?.lastName || "",
    },
    role: data?.role || "",
    password: data?.password || "",
    phoneNumber: data?.phoneNumber || "",
    nid: data?.nid || "",
    licenseNumber: data?.licenseNumber || "",
    address: data?.address || "",
    vehicle: {
      brand: data?.vehicle?.brand || "",
      model: data?.vehicle?.model || "",
      year: data?.vehicle?.year || '', // Assuming 0 as the default value for the year
      plateNumber: data?.vehicle?.plateNumber || "",
      color: data?.vehicle?.color || "",
    },
  };

  return (
    <div
      style={{
        padding: "20px 20px",
      }}
    >
      <h1>Update Driver Data </h1>

      <Form
        submitHandler={onSubmit}
        defaultValues={defaultValues}
        resolver={yupResolver(employeeUpdateSchema)}
      >
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              type="text"
              name="name.firstName"
              size="large"
              label="First Name"
            />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              type="text"
              name="name.middleName"
              size="large"
              label="Middle Name"
            />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              type="text"
              name="name.lastName"
              size="large"
              label="Last Name"
            />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              type="tel"
              name="phoneNumber"
              size="large"
              label="Phone Number"
            />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput type="text" name="nid" size="large" label="NID" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              type="text"
              name="licenseNumber"
              size="large"
              label="License Number"
            />
          </Col>

          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              type="text"
              name="vehicle.brand"
              size="large"
              label="Vehicle Brand"
            />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              type="text"
              name="vehicle.model"
              size="large"
              label="Vehicle Model"
            />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              type="text"
              name="vehicle.year"
              size="large"
              label="Vehicle Year"
            />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              type="text"
              name="vehicle.plateNumber"
              size="large"
              label="Vehicle Plate Number"
            />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput
              type="text"
              name="vehicle.color"
              size="large"
              label="Vehicle Color"
            />
          </Col>

          <Col span={8} style={{ margin: "10px 0" }}>
            <FormTextArea name="address" label="Address" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditDriverPage;
