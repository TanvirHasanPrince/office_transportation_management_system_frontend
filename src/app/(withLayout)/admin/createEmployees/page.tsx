"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import FormTextArea from "@/components/forms/FormTextArea";
import { adminRoleOptions, employeeRoleOptions } from "@/constants/global";
import { useAddAdminMutation } from "@/redux/api/adminApi";
import adminSchema from "@/schemas/adminSchema";
import { Button, Col, Row, message } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAddEmployeeMutation } from "@/redux/api/employeeApi";
import employeeSchema from "@/schemas/employeeSchema";

const CreateEmployeePage = () => {
  const [addEmployee] = useAddEmployeeMutation();

  const onSubmit = async (data: any) => {
    try {
      await addEmployee(data);
      message.success("Employee created Successfully");
    } catch (error: any) {
      message.error(error);
    }
  };
  return (
    <div
      style={{
        padding: "20px 20px",
      }}
    >
      <Form submitHandler={onSubmit} resolver={yupResolver(employeeSchema)}>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={8} style={{ marginBottom: "15px" }}>
            <FormInput
              type="text"
              name="name.firstName"
              size="large"
              label="First Name"
            />
          </Col>
          <Col className="gutter-row" span={8}>
            <FormInput
              type="text"
              name="name.middleName"
              size="large"
              label="Middle Name"
            />
          </Col>
          <Col className="gutter-row" span={8}>
            <FormInput
              type="text"
              name="name.lastName"
              size="large"
              label="Last Name"
            />
          </Col>

          <Col className="gutter-row" span={8}>
            <FormInput
              type="text"
              name="phoneNumber"
              size="large"
              label="Phone Number"
            />
          </Col>
          <Col className="gutter-row" span={8}>
            <FormInput
              type="password"
              name="password"
              size="large"
              label="Password"
            />
          </Col>
          <Col className="gutter-row" span={8} style={{ marginBottom: "15px" }}>
            <FormSelectField
              name="role"
              size="large"
              label="Role"
              options={employeeRoleOptions}
            />
          </Col>
          <Col className="gutter-row" span={8}>
            <FormTextArea
              name="address"
              label="Address"
              rows={5}
              value=""
              placeholder="Your Address"
            />
          </Col>
        </Row>
        <Button style={{ marginTop: "10px" }} htmlType="submit" type="primary">
          Create Employee
        </Button>
      </Form>
    </div>
  );
};

export default CreateEmployeePage;
