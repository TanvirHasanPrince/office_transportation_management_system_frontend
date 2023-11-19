"use client";
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
import { useAdminsQuery, useDeleteAdminMutation } from "@/redux/api/adminApi";
import { useDeleteEmployeeMutation, useEmployeesQuery } from "@/redux/api/employeeApi";

const EmployeesPage = () => {
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

  const { data, isLoading } = useEmployeesQuery({ ...query });
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const employees = data?.employees;
  const meta = data?.meta;

  if (isLoading) {
    <LoadingAnimation></LoadingAnimation>;
  }

  const deleteHandler = async (id: string) => {
    try {
      await deleteEmployee(id);
      message.success("Employee deleted Successfully");
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

            <Link href={`/admin/employees/edit/${data?._id}`}>
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
      <h1 style={{ marginBottom: "10px" }}>List of all Employees</h1>
      <Input
        style={{ width: "20%", margin: "10px 0px", background: "white" }}
        type="text"
        size="large"
        placeholder="Search Employees..."
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
        dataSource={employees}
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

export default EmployeesPage;
