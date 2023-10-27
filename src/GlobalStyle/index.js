import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
    --primary: #02a40b;
}
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    .btn-primary {
        color: white !important;
    }
`;

export default GlobalStyle;
