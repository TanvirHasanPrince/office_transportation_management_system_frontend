"use client";
import { Button, Col, Row } from "antd";
import LoginAnimation from "@/components/LoginAnimation";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      console.log(data);
    } catch (err) {}
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",

      }}
    >
      <Col sm={12} md={16} lg={10}>
        <LoginAnimation></LoginAnimation>
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1>Login please!</h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="id"
                type="text"
                size="large"
                label="Phone number"
                placeholder="Type your phone number"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
                placeholder="Type your password"
              />
            </div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
