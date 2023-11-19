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

export type IDProps = {
  params: any;
};

const EditEmployeePage = ({ params }: IDProps) => {
  const { id } = params;

  const { data } = useEmployeeQuery(id);
  const [updateEmployee] = useUpdateEmployeeMutation();

  const onSubmit = async (values: any) => {
    try {
      await updateEmployee({ id, body: values });
      message.success("Employee updated Successfully");
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
    phoneNumber: data?.phoneNumber || "",
    address: data?.address || "",
  };

  return (
    <div
      style={{
        padding: "20px 20px",
      }}
    >
      <h1>Update Admin Data </h1>

      <Form
        submitHandler={onSubmit}
        defaultValues={defaultValues}
        resolver={yupResolver(employeeUpdateSchema)}
      >
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="name.firstName" label="First Name" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="name.middleName" label="Middle Name" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="name.lastName" label="Last Name" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="phoneNumber" label="Phone Number" />
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

export default EditEmployeePage;
