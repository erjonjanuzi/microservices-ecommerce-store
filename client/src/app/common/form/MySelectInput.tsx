import { useField } from 'formik';
import {
    Form,
    Select,
    SemanticWIDTHSNUMBER,
} from 'semantic-ui-react';

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
    width?: SemanticWIDTHSNUMBER;
    required?: boolean;
    disabled?: boolean;
}

export default function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name);
    return (
        <Form.Field
            error={meta.touched && !!meta.error}
            required={props.required}
            width={props.width ?? 16}
        >
            <label>{props.label}</label>
            <Select
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(e, d) => helpers.setValue(d.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? <label>{meta.error}</label> : null}
        </Form.Field>
    );
}
