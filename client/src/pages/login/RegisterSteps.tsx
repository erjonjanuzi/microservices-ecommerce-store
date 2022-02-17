import { observer } from 'mobx-react-lite';
import React from 'react';
import { Step } from 'semantic-ui-react';

interface Props {
    step: number;
}

export default observer(function RegisterSteps({ step }: Props) {
    return (
        <Step.Group ordered fluid size='tiny'>
            <Step active={step === 1} completed={step !== 1}>
                <Step.Content>
                    <Step.Title>Personal Details</Step.Title>
                    <Step.Description>
                        Enter your personal information
                    </Step.Description>
                </Step.Content>
            </Step>

            <Step active={step === 2}>
                <Step.Content>
                    <Step.Title>Address</Step.Title>
                    <Step.Description>
                        Enter billing information
                    </Step.Description>
                </Step.Content>
            </Step>
        </Step.Group>
    );
});
