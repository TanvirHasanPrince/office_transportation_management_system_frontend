import { useLocationsQuery } from "@/redux/api/locationApi";
import { ILocation } from "@/types";
import FormSelectField, { SelectOptions } from "./FormSelectField";


type LocationFormFieldProps = {
  name: string;
  label: string;
};

const LocationFormSelectField = ({ name, label }: LocationFormFieldProps) => {
  const { data, isLoading } = useLocationsQuery({ limit: 100, page: 1 });
  const locations = data?.locations;
  const locationsOptions = Array.isArray(locations)
    ? locations.map((location: ILocation) => ({
        label: `${location.locationName}`,
        value: location._id,
      }))
    : [];

  return (
    <FormSelectField
      name={name}
      label={label}
      options={locationsOptions as SelectOptions[]}
    ></FormSelectField>
  );
};

export default LocationFormSelectField;
