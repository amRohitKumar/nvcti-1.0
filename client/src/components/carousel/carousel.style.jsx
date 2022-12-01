import {styled} from '@mui/system';

const Wrapper = styled('div')({
    // border: '1px solid red',
    marginTop: '6em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '.carousel-div': {
        // border: '5px solid yellow',
        width: '60%',
        height: '350px',
        padding: '1em 1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',

        '@media (max-width: 600px)': {
            width: '100%',
        }
    }
    
});

export default Wrapper;