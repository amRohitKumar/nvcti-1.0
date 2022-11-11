import { useSelector } from 'react-redux';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';

// assets
import { AcceptedIcon, RejectedIcon } from '../../icons';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

const StatusIcon = ({msg}) => {
    const status = msg.split(' ').at(-1);
    if(status.toLowerCase() === "accepted") return <AcceptedIcon />
    else <RejectedIcon />
};

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
    const theme = useTheme();
    const {notification} = useSelector(store => store.user.user);
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {notification.map((message, idx) => (
                <>
                    <ListItemWrapper key={idx}>
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                <StatusIcon msg={message} />
                            </ListItemAvatar>
                            <ListItemText primary={message} />
                        </ListItem>
                    </ListItemWrapper>
                    <Divider />
                </>
            ))}
            
        </List>
    );
};

export default NotificationList;
