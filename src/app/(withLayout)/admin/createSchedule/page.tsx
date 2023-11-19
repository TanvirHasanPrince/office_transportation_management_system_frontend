"use client";
import DriversFormField from "@/components/forms/DriversFormField";
import Form from "@/components/forms/Form";
import FormDatePicker from "@/components/forms/FormDatePicker";
import FormSelectField from "@/components/forms/FormSelectField";
import LocationFormSelectField from "@/components/forms/LocationFormSelectField";
import { dropOffOptions } from "@/constants/global";
import { useAddScheduleMutation } from "@/redux/api/scheduleApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";
import React from "react";

const CreateSchedulePage = () => {
  const [addSchedule] = useAddScheduleMutation();

  const onSubmit = async (data: any) => {
    try {
      await addSchedule(data);
      message.success("Schedule Added Successfully");
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
      <h1>Create Schedule</h1>
      <Form submitHandler={onSubmit}>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormDatePicker name="date" label="Date" />
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <DriversFormField
              name="driver"
              label="Select Driver"
            ></DriversFormField>
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <LocationFormSelectField
              name="location"
              label="Select Location"
            ></LocationFormSelectField>
          </Col>
          <Col span={8} style={{ margin: "10px 0" }}>
            <FormSelectField
              name="dropOffTime"
              label="Select Drop Off time"
              options={dropOffOptions}
            ></FormSelectField>
          </Col>
        </Row>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default CreateSchedulePage;
