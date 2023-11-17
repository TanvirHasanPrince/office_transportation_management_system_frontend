"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { useLocationQuery } from "@/redux/api/locationApi";
import { Button, Col, Row, message } from "antd";
import React from "react";

export type IDProps = {
  params: any;
};

const EditLocationPage = ({ params }: IDProps) => {
  const { id } = params;

  const { data, isLoading } = useLocationQuery(id);
  console.log(data);

  

  const onSubmit = async (data: any) => {
    try {
      await data;
      message.success("Location updated Successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };

//@ts-ignore
  const defaultValues = {
    locationName: data?.locationName || "",
  };

  return (
    <div
      style={{
        padding: "20px 20px",
      }}
    >
      <h1>Update Location </h1>

      <Form submitHandler={onSubmit} defaultValues={defaultValues}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="locationName"  />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditLocationPage;
