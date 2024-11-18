import { useState } from "react";
import { Control, Controller, FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";
import Select, { CSSObjectWithLabel, SingleValue, StylesConfig, GroupBase } from 'react-select'
import { OptionsType } from "../CreateProduct/CreateProductContexts/SelectedValueContext";


interface SelectForFormProps<T extends FieldValues> {
    id?: string;
    registrationName: string;
    control: Control<T>;
    setValue: UseFormSetValue<T>;
    placeholder?: string;
    styles?: CSSObjectWithLabel;
    options: Array<OptionsType>;
    error?: boolean;
    defaultValue?: OptionsType;
    onChange?: (value: OptionsType) => void
}

export default function SelectForForm<T extends FieldValues>({ id, registrationName, setValue, control, placeholder, styles, options, error, defaultValue, onChange }: SelectForFormProps<T>) {
    const [selectedOption, setSelectedOption] = useState<OptionsType | null>(null)
    onChange && defaultValue && !selectedOption && onChange(defaultValue)

    const handleChange = (
        currentValue: SingleValue<OptionsType>
    ) => {
        setSelectedOption(currentValue!)
        setValue(registrationName as Path<T>, currentValue ? currentValue.value as PathValue<T, Path<T>> : '' as PathValue<T, Path<T>>)
        onChange && onChange(currentValue!)
    }

    const selectStyles = (error: boolean | undefined): StylesConfig => {
        return {
            control: (stylesControl) => (
                {
                    ...stylesControl,
                    ...styles,
                    border: error ? '1px solid rgb(253, 71, 71)' : '1px solid #ced4da',
                }
            )
        }
    }

    return (
        <Controller
            control={control}
            name={registrationName as Path<T>}
            render={({ field: { onChange, ...field } }) => (
                <Select
                    {...field}
                    defaultValue={!selectedOption && defaultValue}
                    placeholder={placeholder ? placeholder : ''}
                    id={id ? id : ''}
                    styles={selectStyles(error)}
                    options={options}
                    value={options.find(s => s.value === selectedOption?.value)}
                    onChange={(currentValue) => {
                        handleChange(currentValue as SingleValue<OptionsType>)
                        return onChange((currentValue as OptionsType).value);
                    }}
                ></Select>
            )}
        />
    )
}