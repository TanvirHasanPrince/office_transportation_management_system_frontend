"use client";
import { Button, Col, Row } from "antd";
import LoginAnimation from "@/components/LoginAnimation";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { isLoggedIn, storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FormValues = {
  id: string;
  password: string;
};

const LoginPage = () => {
  const [userLogin, isLoading] = useUserLoginMutation();

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // console.log(isLoggedIn());
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      setButtonDisabled(true);
      const res = await userLogin({ ...data }).unwrap();
      console.log(res);

      if (res?.token) {
        router.push("/profile");
      }
      storeUserInfo({ token: res?.token });
    } catch (err: any) {
      if (err) {
        setLoginError(true);
        setButtonDisabled(false);
      }
      setErrorMessage(err.data.message);
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

        <p>(Use 123456 for admin login)</p>
        <div>
          {loginError && (
            <p style={{ margin: "0 auto", textAlign: "center", color: 'red' }}>
              {errorMessage}
            </p>
          )}

          <Form submitHandler={onSubmit}>
            <div
              style={{
                marginTop: "15px",
              }}
            >
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
            {isButtonDisabled ? (
              <Button
                type="primary"
                htmlType="submit"
                disabled={isButtonDisabled}
              >
                Checking credentials
              </Button>
            ) : (
              <Button
                type="primary"
                htmlType="submit"
                disabled={isButtonDisabled}
              >
                Login
              </Button>
            )}
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
