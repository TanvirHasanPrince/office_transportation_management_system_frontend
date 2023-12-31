"use client";
import { Row, Col } from "antd";
import LoadingAnimation from "@/components/LoadingAnimation";
import TMSTable from "@/components/ui/TMSTable";
import { Button, Input, message } from "antd";
import React, { useState } from "react";
import { useDebounced } from "@/redux/hooks";
import dayjs from "dayjs";
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

const DriversPage = () => {
  const query: Record<string, any> = {};

  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
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

  const { data, isLoading } = useDriversQuery({ ...query });
  const [deleteDriver] = useDeleteDriverMutation();
  const drivers = data?.drivers;
  const meta = data?.meta;

  if (isLoading) {
    <LoadingAnimation></LoadingAnimation>;
  }

  const deleteHandler = async (id: string) => {
    try {
      await deleteDriver(id);
      message.success("Driver deleted Successfully");
    } catch (err: any) {
      message.error(err.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: function (data: Record<string, string>) {
        const fullName = `${data?.firstName} ${data?.middleName} ${data?.lastName}`;
        return <>{fullName}</>;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "NID",
      dataIndex: "nid",
    },
    {
      title: "Driving License",
      dataIndex: "licenseNumber",
    },

    {
      title: "Brand",
      dataIndex: "vehicle",
      render: function (data: Record<string, string>) {
        const brand = `${data?.brand}`;
        return <>{brand}</>;
      },
    },
    {
      title: "Model",
      dataIndex: "vehicle",
      render: function (data: Record<string, string>) {
        const brand = `${data?.model}`;
        return <>{brand}</>;
      },
    },
    {
      title: "Year",
      dataIndex: "vehicle",
      render: function (data: Record<string, string>) {
        const brand = `${data?.year}`;
        return <>{brand}</>;
      },
    },
    {
      title: "Plate Number",
      dataIndex: "vehicle",
      render: function (data: Record<string, string>) {
        const brand = `${data?.plateNumber}`;
        return <>{brand}</>;
      },
    },
    {
      title: "Color",
      dataIndex: "vehicle",
      render: function (data: Record<string, string>) {
        const brand = `${data?.color}`;
        return <>{brand}</>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: true,
      render: function (data: any) {
        return data && dayjs(data).format(" MMMM DD, YYYY hh:mm:ss A ");
      },
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

  return (
    <div
      style={{
        padding: "20px 20px",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>List of all Drivers</h1>
      <Row>
        <Col xs={24} sm={24} md={12} lg={5}>
          <Input
            style={{
              width: "100%", // Default width for mobile and tablet
              margin: "10px 0px",
              background: "white",
            }}
            type="text"
            size="large"
            placeholder="Search Drivers..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>
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
        dataSource={drivers}
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

export default DriversPage;
