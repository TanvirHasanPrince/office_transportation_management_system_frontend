"use client";
import { Button, Col, Row } from "antd";
import LoginAnimation from "@/components/LoginAnimation";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import {isLoggedIn, storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";


type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {

  const [userLogin] = useUserLoginMutation()
  // console.log(isLoggedIn());
  const router = useRouter()
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({...data}).unwrap();
     
      if (res?.data?.token) {
        router.push('/profile')
      } storeUserInfo({ token: res?.data?.token });

    } catch (err:any) {
      console.error(err.message);
    }
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
                name="phoneNumber"
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
