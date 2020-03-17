import React, { forwardRef } from 'react';
import Button from 'react-bootstrap/Button'

import './CompanyDetails.css';


export const CustomInput = (props, ref) => (
    <Button onClick = {props.onClick} variant="primary" size="lg">
            {props.value}
          </Button>
        );



export default forwardRef(CustomInput);
