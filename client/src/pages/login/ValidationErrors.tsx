import React from 'react';
import { Message } from 'semantic-ui-react';

interface Props {
    errors: any;
}

export default function ValidationErrors({ errors }: Props) {
    return (
        <Message negative>
            {errors && (
                <Message.List>
                    {errors.map((err: any, i: any) => (
                        <Message.Item key={i}>{err.message}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    );
}
