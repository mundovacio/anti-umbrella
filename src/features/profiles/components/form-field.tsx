import React, { useState } from 'react';

interface FormFieldProps {
    label: string;
    name: string;
    defaultValue?: string;
    placeholder?: string;
    type?: 'text' | 'textarea';
    options?: string[]; // For datalist
    error?: string[];
    maxLength: number;
    required?: boolean;
}

export function FormField({
    label,
    name,
    defaultValue = '',
    placeholder,
    type = 'text',
    options,
    error,
    maxLength,
    required,
}: FormFieldProps) {
    const [value, setValue] = useState(defaultValue);
    const [isDirty, setIsDirty] = useState(false);
    const [limitError, setLimitError] = useState(false);
    const [prevError, setPrevError] = useState(error);

    // Reset dirty state when server error changes (new submission)
    if (error !== prevError) {
        setPrevError(error);
        setIsDirty(false);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
        if (!isDirty) {
            setIsDirty(true);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (
            value.length >= maxLength &&
            e.key.length === 1 &&
            !e.ctrlKey &&
            !e.metaKey &&
            !e.altKey
        ) {
            setLimitError(true);
            setTimeout(() => setLimitError(false), 2000);
        }
    };

    const currentLength = value.length;
    const hasError = (!isDirty && error && error.length > 0) || limitError;
    const inputClasses = `w-full ${type === 'textarea' ? 'textarea' : 'input input-bordered'} ${hasError ? (type === 'textarea' ? 'textarea-error' : 'input-error') : ''} ${type === 'text' && name === 'gender' ? 'text-gray-lighter' : ''}`;

    return (
        <div className="form-control w-full">
            <label className="label" htmlFor={name}>
                <span className="label-text text-gray-light">{label}</span>
            </label>

            {type === 'textarea' ? (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    className={inputClasses}
                    maxLength={maxLength}
                    required={required}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                />
            ) : (
                <>
                    <input
                        id={name}
                        name={name}
                        type="text"
                        list={options ? `${name}-options` : undefined}
                        value={value}
                        placeholder={placeholder}
                        className={inputClasses}
                        maxLength={maxLength}
                        required={required}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    {options && (
                        <datalist id={`${name}-options`}>
                            {options.map((opt) => (
                                <option key={opt} value={opt} />
                            ))}
                        </datalist>
                    )}
                </>
            )}

            <div className="flex justify-between items-center mt-1">
                <div>
                    {!limitError && !isDirty && error && (
                        <span className="label-text-alt text-error block">
                            {error[0]}
                        </span>
                    )}
                    {limitError && (
                        <span className="label-text-alt text-error block">
                            Límite de caracteres alcanzado
                        </span>
                    )}
                </div>
                <span className={`text-xs ${currentLength === maxLength ? 'text-error' : 'text-gray-500'}`}>
                    {currentLength}/{maxLength}
                </span>
            </div>
        </div>
    );
}
