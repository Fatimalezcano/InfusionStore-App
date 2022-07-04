import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../../../redux/actions/index";
import { View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function Filtros({ setSelected }) {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    dispatch(setSort(e));
  };

  return (
    <View style={{ margin: 15 }}>
      <RNPickerSelect
        name="sort"
        id="sort"
        defaultValue="DEFAULT"
        onValueChange={(value) => {
          handleOnChange(value);
        }}
        items={[
          { label: "A-Z", value: "A-Z" },
          { label: "Z-A", value: "Z-A" },
          { label: "Precio Mayor a menor", value: "Highest SpoonScore" },
          { label: "Precio Menor a mayor", value: "Lowest SpoonScore" },
        ]}
        placeholder={{ label: "Filtros:", value: null }}
      />
    </View>
  );
}
