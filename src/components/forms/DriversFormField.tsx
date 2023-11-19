import { useDriversQuery } from "@/redux/api/driverApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import { IDriver } from "@/types";

type DriversFormFieldProps = {
  name: string;
  label: string;
};

const DriversFormField = ({ name, label }: DriversFormFieldProps) => {
  const { data, isLoading } = useDriversQuery({ limit: 100, page: 1 });
  const drivers = data?.drivers;
const driverOptions = Array.isArray(drivers)
  ? drivers.map((driver: IDriver) => ({
      label: `${driver.name.firstName} ${driver.name.middleName} ${driver.name.lastName}`,
      value: driver._id,
    }))
  : [];

  return (
    <FormSelectField
      name={name}
      label={label}
      options={driverOptions as SelectOptions[]}
    ></FormSelectField>
  );
};

export default DriversFormField;
