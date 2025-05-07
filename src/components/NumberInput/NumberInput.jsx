import { NumberField } from '@base-ui-components/react';
import React, { forwardRef, useId } from 'react';
import styles from './index.module.css';

export const NumberInput = forwardRef(function CustomNumberInput(props, ref) {
    const {
        label,
        min,
        max,
        step,
        value,
        onChange,
        name,
        required,
        ...rest
    } = props;

    const id = useId();

    const handleValueChange = (val) => {
        if (onChange && name) {
            onChange({
                target: {
                    name,
                    value: val,
                },
            });
        }
    };

    return (
        <NumberField.Root id={id}
            name={name}
            min={min}
            max={max}
            step={step}
            value={value}
            onValueChange={handleValueChange}
            required={required}
            className={styles.Field}
            {...rest}>
            <NumberField.ScrubArea className={styles.ScrubArea}>
                <label htmlFor={id} className={styles.Label}>
                    {label}
                </label>
                <NumberField.ScrubAreaCursor className={styles.ScrubAreaCursor}>
                    <CursorGrowIcon />
                </NumberField.ScrubAreaCursor>
            </NumberField.ScrubArea>

            <NumberField.Group className={styles.Group}>
                <NumberField.Decrement className={styles.Decrement}>
                    <MinusIcon />
                </NumberField.Decrement>
                <NumberField.Input className={styles.Input} />
                <NumberField.Increment className={styles.Increment}>
                    <PlusIcon />
                </NumberField.Increment>
            </NumberField.Group>
        </NumberField.Root>
    );
});

function CursorGrowIcon(props) {
    return (
        <svg
            width="26"
            height="14"
            viewBox="0 0 24 14"
            fill="black"
            stroke="white"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M19.5 5.5L6.49737 5.51844V2L1 6.9999L6.5 12L6.49737 8.5L19.5 8.5V12L25 6.9999L19.5 2V5.5Z" />
        </svg>
    );
}

function PlusIcon(props) {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.6"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M0 5H5M10 5H5M5 5V0M5 5V10" />
        </svg>
    );
}

function MinusIcon(props) {
    return (
        <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentcolor"
            strokeWidth="1.6"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path d="M0 5H10" />
        </svg>
    );
}