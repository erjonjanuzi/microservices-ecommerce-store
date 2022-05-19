import { useField } from 'formik';
import { ChangeEventHandler } from 'react';
import { Form } from 'semantic-ui-react';
import { SemanticWIDTHSNUMBER } from 'semantic-ui-react/dist/commonjs/generic';

interface Props {
    name: string;
    type?: string;
    label?: string;
    multiple?: boolean;
    required?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>
    width?: SemanticWIDTHSNUMBER
}

export default function MyFileInput(props: Props) {
    const [field, meta] = useField(props.name); 
    return (
        <Form.Field error={meta.touched && !!meta.error} required={props.required} width={props.width ?? 16}>
            <label>{props.label}</label>
            <input {...field} {...props} onChange={props.onChange} multiple={props.multiple}/>
            {meta.touched && meta.error ? (
                <label>{meta.error}</label>
            ) : null}
        </Form.Field>
    )
}