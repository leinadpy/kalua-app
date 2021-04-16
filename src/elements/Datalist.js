import React, { useState, useMemo, useCallback } from "react";
import DataListInput from "react-datalist-input";

const DataClient = ({ clients }) => {
  // selectedItem
  const [item, setItem] = useState();

  /**
   * your callback function gets called if the user selects one option out of the drop down menu
   * @param selectedItem object (the selected item / option)
   */
  const onSelect = useCallback((selectedItem) => {
    console.log("selectedItem", selectedItem);
  }, []);

  // the array you want to pass to the react-data-list component
  // key and label are required properties
  const items = useMemo(
    () =>
      clients.map((oneItem) => ({
        // required: what to show to the user
        label: oneItem.name,
        // required: key to identify the item within the array
        key: oneItem.id,
        // feel free to add your own app logic to access those properties in the onSelect function
        // someAdditionalValue: oneItem.someAdditionalValue,
        // or just keep everything
        ...oneItem,
      })),
    [clients]
  );

  return (
    <DataListInput
      placeholder="Select an option from the drop down menu..."
      items={items}
      onSelect={onSelect}
    />
  );
};

export default DataClient;
