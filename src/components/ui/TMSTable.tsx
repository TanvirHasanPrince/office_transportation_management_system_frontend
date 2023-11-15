"use client";
import { Table } from "antd";

type TMSTableProps = {
  columns: any;
  dataSource: any;
  pageSize?: number;
  totalPage?: number;
  showSizeChanger?: boolean;
  onPaginationChange?: (page: number, pageSize: number) => void;
  onTableChange?: (pagination: any, filter: any, sorter: any) => void;
  showPagination?: boolean;
};

const TMSTable = ({
  columns,
  dataSource,
  pageSize,
  totalPage,
  showSizeChanger,
  onPaginationChange,
  onTableChange,
  showPagination = true,
}: TMSTableProps) => {
  const paginationConfig = showPagination
    ? {
        pageSize: 5,
        total: 10,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: true,
        onChange: onPaginationChange,
      }
    : false;

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={paginationConfig}
      onChange={onTableChange}
    />
  );
};

export default TMSTable;
