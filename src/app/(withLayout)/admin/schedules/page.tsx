"use client";
import { Row, Col } from "antd";
import LoadingAnimation from "@/components/LoadingAnimation";
import TMSTable from "@/components/ui/TMSTable";
import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import { Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import {
  useDeleteDriverMutation,
  useDriversQuery,
} from "@/redux/api/driverApi";
import {
  useDeleteScheduleMutation,
  useScheduleQuery,
  useSchedulesQuery,
} from "@/redux/api/scheduleApi";
import FormDatePicker from "@/components/forms/FormDatePicker";
import Form from "@/components/forms/Form";

const SchedulesPage = () => {
  const query: Record<string, any> = {};

  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [dropOffTime, setDropOffTime] = useState<string | null>(null);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["dropOffTime"] = dropOffTime;
  // query["searchTerm"] = searchTerm;

  const dropOffTimes = [
    { label: "Select Drop Off Time", value: null },
    { label: "10:15 PM", value: "10:15 PM" },
    { label: "11:15 PM", value: "11:15 PM" },
    { label: "12:15 AM", value: "12:15 AM" },
    { label: "01:15 AM", value: "01:15 AM" },
    { label: "02:15 AM", value: "02:15 AM" },
    { label: "03:15 AM", value: "03:15 AM" },
    { label: "04:15 AM", value: "04:15 AM" },
    { label: "05:15 AM", value: "05:15 AM" },
    { label: "06:15 AM", value: "06:15 AM" },
    { label: "07:30 AM", value: "07:30 AM" },
    { label: "08:30 AM", value: "08:30 AM" },
  ];

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  query["date"] = selectedDate?.format("YYYY-MM-DD");

  const { data, isLoading } = useSchedulesQuery({ ...query });
  const [deleteSchedule] = useDeleteScheduleMutation();
  const schedules = data?.schedules;
  const meta = data?.meta;

  if (isLoading) {
    <LoadingAnimation></LoadingAnimation>;
  }

  const deleteHandler = async (id: string) => {
    try {
      await deleteSchedule(id);
      message.success("Schedule deleted Successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Driver Name",
      dataIndex: "driver",
      render: function (data: Record<string, any>) {
        const fullName = `${data?.name?.firstName} ${data?.name?.middleName} ${data?.name?.lastName}`;
        return <>{fullName}</>;
      },
    },
    {
      title: "Driver's Phone Number",
      dataIndex: "driver",
      render: function (data: Record<string, any>) {
        const phoneNumber = `${data?.phoneNumber}`;
        return <>{phoneNumber}</>;
      },
    },
    {
      title: "Vehicle Plate Number",
      dataIndex: "driver",
      render: function (data: Record<string, any>) {
        const plateNumber = `${data?.vehicle?.plateNumber}`;
        return <>{plateNumber}</>;
      },
    },
    {
      title: "Location",
      dataIndex: "location",
      render: function (data: Record<string, string>) {
        const Location = `${data?.locationName}`;
        return <>{Location}</>;
      },
    },
    {
      title: "Drop Off time",
      dataIndex: "dropOffTime",
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <div>
            {/* <Button
              onClick={() => console.log(data)}
              type="primary"
              style={{ background: " #6D2D6C ", color: "white" }}
            >
              <EyeOutlined />
            </Button> */}
            {/* 
            <Link href={`/admin/drivers/edit/${data?._id}`}>
              <Button
                style={{ margin: "5px" }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link> */}
            <Button
              onClick={() => deleteHandler(data?._id)}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
    setSelectedDate(null);
    setDropOffTime(null);
  };

  const handleSubmit = (data: any) => {
    // Handle the form submission logic here
    console.log(data);
  };

  // const todayPlaceholder = dayjs().format("MMMM D, YYYY");

  return (
    <div
      style={{
        padding: "20px 20px",
      }}
    >
              <Row>
      <Col xs={24} sm={24} md={12} lg={5}>
      <h1 style={{ marginBottom: "10px" }}>List of all Drivers</h1>

      <div style={{ width: "100%" }}>
        <Form submitHandler={handleSubmit}>
          <FormDatePicker
            name="date"
            label={`Select Date`}
            // placeholder={` ${todayPlaceholder}`}
            value={selectedDate || undefined}
            onChange={handleDateChange}
          />
        </Form>
      </div>

      <Select
        style={{ width: "100%", margin: "10px 0px 10px 0px" }}
        placeholder="Select Drop Off Time"
        onChange={(value) => setDropOffTime(value)}
      >
        {dropOffTimes.map((time) => (
          <Select.Option key={time.value} value={time.value}>
            {time.label}
          </Select.Option>
        ))}
      </Select>
      </Col>
      </Row>
      <br></br>

      {/* <Input
        style={{ width: "20%", margin: "10px 0px", background: "white" }}
        type="text"
        size="large"
        placeholder="Search..."
        onChange={(e) => setSearchTerm(e.target.value)}
      /> */}
      {(!!sortBy ||
        !!sortOrder ||
        !!searchTerm ||
        selectedDate ||
        dropOffTime) && (
        <Button
          style={{ marginLeft: "5px", marginBottom: "10px" }}
          type="primary"
          onClick={resetFilters}
        >
          <ReloadOutlined />
        </Button>
      )}
      <TMSTable
        columns={columns}
        dataSource={schedules}
        pageSize={size}
        totalPages={meta?.total}
        showSizeChanger={true}
        onPaginationChange={onPaginationChange}
        onTableChange={onTableChange}
        showPagination={true}
      ></TMSTable>
    </div>
  );
};

export default SchedulesPage;
