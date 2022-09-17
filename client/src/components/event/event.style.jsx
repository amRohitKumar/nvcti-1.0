import {styled} from '@mui/system';

const Wrapper = styled('div')(({imageUrl}) => `
    /* border: 5px solid blue; */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
    height: 300px;
    
    .content{
        opacity: 0;
        color: black;
        font-size: 2em;
        transition: var(--transition);
        width: 100%;
        height: 100%;
        padding: 2em 2em;
    }
    
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-image: url(${imageUrl});
        z-index: -1;
        background-repeat: no-repeat;
        background-size: cover;
        transition: var(--transition);
    }
    
    &:hover{
        .content{
            opacity: 1;
        }
        &::after{
            opacity: 0.3;
            /* background-blend-mode: darken; */
        }
    }
`);

export default Wrapper;