import { Controller } from 'react-hook-form';
import type { Control, FieldValues, Path } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import FormField from './FormField';

interface BaseFieldProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label: string;
    disabled?: boolean;
    error?: string;
    rules?: any;
}

// 1. FormInput Component
interface FormInputProps<T extends FieldValues> extends BaseFieldProps<T> {
    placeholder?: string;
    type?: string;
    labelSize?: 'small' | 'large';
}
export function FormInput<T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = 'text',
    disabled,
    rules,
    error,
    labelSize,
}: FormInputProps<T>) {
    return (
        <FormField label={label} error={error} labelSize={labelSize}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <InputText
                        type={type}
                        value={field.value !== undefined && field.value !== null ? field.value.toString() : ''}
                        onChange={(e) => field.onChange(type === 'number' ? (e.target.value ? Number(e.target.value) : '') : e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-brand-primary"
                        disabled={disabled}
                    />
                )}
            />
        </FormField>
    );
}

// 2. FormDropdown Component
interface FormDropdownProps<T extends FieldValues> extends BaseFieldProps<T> {
    options: any[];
    optionLabel?: string;
    optionValue?: string;
    placeholder?: string;
    loading?: boolean;
    onChange?: (value: any) => void;
}
export function FormDropdown<T extends FieldValues>({
    name,
    control,
    label,
    options,
    optionLabel = 'name',
    optionValue = 'id',
    placeholder = 'Choose from Drop-down',
    loading,
    disabled,
    error,
    rules,
    onChange,
}: FormDropdownProps<T>) {
    return (
        <FormField label={label} error={error}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <Dropdown
                        id={field.name}
                        value={field.value}
                        options={options}
                        optionLabel={optionLabel}
                        optionValue={optionValue}
                        onChange={(e) => {
                            field.onChange(e.value);
                            if (onChange) onChange(e.value);
                        }}
                        placeholder={placeholder}
                        className="w-full text-sm"
                        loading={loading}
                        disabled={disabled}
                    />
                )}
            />
        </FormField>
    );
}

// 3. FormMultiSelect Component
interface FormMultiSelectProps<T extends FieldValues> extends BaseFieldProps<T> {
    options: any[];
    optionLabel?: string;
    optionValue?: string;
    placeholder?: string;
    onChange?: (value: any) => void;
}
export function FormMultiSelect<T extends FieldValues>({
    name,
    control,
    label,
    options,
    optionLabel = 'name',
    optionValue = 'id',
    placeholder = 'Choose from Drop-down',
    disabled,
    error,
    rules,
    onChange,
}: FormMultiSelectProps<T>) {
    return (
        <FormField label={label} error={error}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <MultiSelect
                        id={field.name}
                        value={field.value}
                        options={options}
                        optionLabel={optionLabel}
                        optionValue={optionValue}
                        onChange={(e) => {
                            field.onChange(e.value);
                            if (onChange) onChange(e.value);
                        }}
                        placeholder={placeholder}
                        className="w-full text-sm"
                        disabled={disabled}
                    />
                )}
            />
        </FormField>
    );
}

// 4. FormInputNumber Component
interface FormInputNumberProps<T extends FieldValues> extends BaseFieldProps<T> {
    labelSize?: 'small' | 'large';
    showButtons?: boolean;
    buttonLayout?: 'stacked' | 'horizontal' | 'vertical';
}
export function FormInputNumber<T extends FieldValues>({
    name,
    control,
    label,
    disabled,
    error,
    rules,
    labelSize,
    showButtons = true,
    buttonLayout = 'stacked',
}: FormInputNumberProps<T>) {
    return (
        <FormField label={label} error={error} labelSize={labelSize}>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <InputNumber
                        value={field.value}
                        onValueChange={(e) => field.onChange(e.value)}
                        showButtons={showButtons}
                        buttonLayout={buttonLayout}
                        disabled={disabled}
                    />
                )}
            />
        </FormField>
    );
}

// 5. FormRadioGroup Component
interface RadioOption {
    label: string;
    value: any;
    id: string;
}
interface FormRadioGroupProps<T extends FieldValues> extends BaseFieldProps<T> {
    options: RadioOption[];
}
export function FormRadioGroup<T extends FieldValues>({
    name,
    control,
    label,
    options,
    disabled,
    error,
    rules,
}: FormRadioGroupProps<T>) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-[13px] font-semibold text-slate-700">{label}</label>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={({ field }) => (
                    <div className="flex items-center gap-6 mt-1.5">
                        {options.map((opt) => (
                            <div key={opt.id} className="flex items-center gap-2">
                                <RadioButton
                                    inputId={opt.id}
                                    name={name}
                                    value={opt.value}
                                    onChange={(e) => field.onChange(e.value)}
                                    checked={field.value === opt.value}
                                    disabled={disabled}
                                />
                                <label htmlFor={opt.id} className="text-sm font-medium text-slate-600 cursor-pointer">
                                    {opt.label}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
            />
            {error && <span className="text-red-500 text-xs mt-0.5">{error}</span>}
        </div>
    );
}
