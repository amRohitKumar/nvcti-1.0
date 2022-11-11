import { Box } from "@mui/material";
import styled from "@emotion/styled";

const Wrapper = styled(Box)({
    height: 'max-content',
    margin: '0 auto',
    '.column-center': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    '.row-center': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    '.boldTypo': {
        fontSize: '1.2em',
        fontWeight: '500',
    },
    '.date-span': {
        display: 'flex',
        maxWidth: '200px',
        'flexWrap': 'wrap'
    },
});

export default Wrapper;