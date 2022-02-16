import * as React from 'react';
// import  {useState} from 'react';

import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { styled } from '@mui/system';

const bg = {
    1: '#FFFF',
    2: '#ECA64E',
};

const CustomButtonRoot = styled('span')`
    font-size: 16px;
    background-color: ${bg[2]};
    padding: 12px 24px;
    border-radius: 37px;
    color: ${bg[1]};
    transition: all 150ms ease;
    cursor: pointer;
    border: none;
    }
`;


export default function UnstyledButtonsSpan(props) {
    // const [title, setItem] = useState( '')
    // callbackFunction = (childData) => {
    //     setMessage(childData)
    // },

    return (
        <ButtonUnstyled component={CustomButtonRoot} > Đăng nhập  </ButtonUnstyled > 
    );
} 