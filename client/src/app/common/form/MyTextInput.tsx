import { useField } from 'formik';
import { Form } from 'semantic-ui-react';
import { SemanticWIDTHSNUMBER } from 'semantic-ui-react/dist/commonjs/generic';

interface Props {
    placeholder: string;
    name: string;
    type?: string;
    label?: string;
    required?: boolean;
    width?: SemanticWIDTHSNUMBER
}

export default function MyTextInput(props: Props) {
    const [field, meta] = useField(props.name); 
    return (
        <Form.Field error={meta.touched && !!meta.error} required={props.required} width={props.width ?? 16}>
            <label>{props.label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? (
                <label>{meta.error}</label>
            ) : null}
        </Form.Field>
    )
}