"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import TMSBreastCrumb from "@/components/ui/TMSBreastCrumb";
import { useAddLocationMutation } from "@/redux/api/locationApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import React from "react";

const CreateLocationsPage = () => {
  const [addLocation] = useAddLocationMutation();

  const onSubmit = async (data: any) => {
    try {
      await addLocation(data);
      message.success("Location Added Successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };
  const { role } = getUserInfo() as any;

  const base = role;

  return (
    <div
      style={{
        padding: "20px 20px",
      }}
    >
      <TMSBreastCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "Create Location", link: `/${base}/createLocations` },
        ]}
      />
      <h1>Create Location</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormInput name="locationName" label="Location Name" />
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default CreateLocationsPage;
<h1>Create Locations</h1>;
