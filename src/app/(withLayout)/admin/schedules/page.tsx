"use client";
import LoadingAnimation from "@/components/LoadingAnimation";
import TMSTable from "@/components/ui/TMSTable";
import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { useDebounced } from "@/redux/hooks";
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

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  // query["searchTerm"] = searchTerm;

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

            <Link href={`/admin/drivers/edit/${data?._id}`}>
              <Button
                style={{ margin: "5px" }}
                onClick={() => console.log(data)}
                type="primary"
              >
                <EditOutlined />
              </Button>
            </Link>
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
  };

  const handleSubmit = (data: any) => {
    // Handle the form submission logic here
    console.log(data);
  };

  return (
    <div
      style={{
        padding: "20px 20px",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>List of all Drivers</h1>

      <div style={{width:"20%"}}>
        <Form submitHandler={handleSubmit}>
          <FormDatePicker
            name="date"
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </Form>
      </div>

      <Input
        style={{ width: "20%", margin: "10px 0px", background: "white" }}
        type="text"
        size="large"
        placeholder="Search Drivers..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {(!!sortBy || !!sortOrder || !!searchTerm) && (
        <Button
          style={{ marginLeft: "5px" }}
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
