import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { iconsData } from "../data";
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import '../App.css';
import { Button, Menu } from '@mui/material';
import AnimationIcon from '@mui/icons-material/Animation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.9),
        border: 0,
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));
const fonts = [
    {
        value: 'Arial',
        label: 'Arial',
    },
    {
        value: 'Bazooka',
        label: 'Bazooka',
    },
    {
        value: 'Boulder',
        label: 'Boulder',
    },
    {
        value: 'Coronet',
        label: 'Coronet',
    },
];
export default function MenuBar() {
    const [currentTab, setCurrentTab] = React.useState(0);
    const [options, setOptions] = React.useState(iconsData);
    const [openSidebar, setOpenSidebar] = React.useState(false);
    const [alignment, setAlignment] = React.useState('left');
    const [formats, setFormats] = React.useState(() => ['italic']);
    const [value, setValue] = React.useState(55);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleCloseSidebar = () => {
        setOpenSidebar(false);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    function handleSliderChange({ target }) {
        setOptions((prevOptions) => {
            return prevOptions.map((option, index) => {
                if (index !== currentTab) return option;
                return { ...option, value: target.value };
            });
        });

    }


    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };
    const VerticalLine = () => {
        return (
            <Box
                sx={{
                    height: '100%',
                    width: '1px',
                    borderRight: ' 1px solid #ccc',
                }}
            />
        );
    };
    return (
        <div>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    border: (theme) => `1px solid ${theme.palette.divider}`,
                    flexWrap: 'wrap',
                    marginTop: '40px',
                }}
            >
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { width: '23ch', marginTop: '2px', marginLeft: '2px', marginBottom: '2px' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <TextField
                            id="outlined-select-currency"
                            select
                            defaultValue="Arial"
                            size="small"
                            InputProps={{
                                style: {
                                    marginLeft: '2px',
                                    marginTop: '7px',
                                },
                            }}
                        >
                            {fonts.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </Box>
                <div style={{ alignItems: 'flex-start' }}>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            border: '1px solid #ccc',
                            margin: 0,
                            // paddingLeft: '4px',
                            // paddingRight: '4px',
                            marginLeft: '5px',
                            marginTop: '11px',
                            alignItems: 'center',
                            borderRadius: '4px',
                            height: '60%'
                        }}
                    >
                        <AddIcon sx={{ padding: '8px' }} fontSize='large' />
                        <VerticalLine />
                        <Typography sx={{ padding: '8px' }}>{value}</Typography>
                        <VerticalLine />

                        <RemoveIcon sx={{ padding: '8px' }} fontSize='large' />
                    </Box>
                </div>
                <StyledToggleButtonGroup
                    size="small"
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                >

                    <ToggleButton value="left" aria-label="left aligned">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                        <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                        <FormatAlignRightIcon />
                    </ToggleButton>
                    <ToggleButton value="justify" aria-label="justified">
                        <FormatAlignJustifyIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />
                <StyledToggleButtonGroup
                    size="small"
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                >

                    <ToggleButton value="bold" aria-label="bold">
                        <FormatBoldIcon />
                    </ToggleButton>

                    <ToggleButton value="list" aria-label='color'>
                        <FormatListBulletedIcon />
                    </ToggleButton>
                    <ToggleButton value="spacing" aria-label='spacing'>
                        <FormatLineSpacingIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Button variant="text" sx={{ textTransform: 'capitalize', color: 'black' }}>Effects</Button>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <AnimationIcon sx={{ marginTop: '2px' }} />
                    <Button variant="text" sx={{ textTransform: 'capitalize', color: 'black' }}>Animate</Button>
                </Box>
                <StyledToggleButtonGroup>
                    <ToggleButton id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <MoreHorizIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    <MenuItem onClick={handleClose}>
                        <StyledToggleButtonGroup>
                            <ToggleButton value="underlined" aria-label="underlined">
                                <FormatUnderlinedIcon />
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <StyledToggleButtonGroup>
                            <ToggleButton value="color" aria-label="color">
                                <FormatColorFillIcon />
                                <ArrowDropDownIcon />
                            </ToggleButton>
                        </StyledToggleButtonGroup>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <StyledToggleButtonGroup>
                            <ToggleButton value="italic" aria-label="italic">
                                <FormatItalicIcon />
                            </ToggleButton>
                        </StyledToggleButtonGroup>

                    </MenuItem>

                </Menu>


            </Paper>
        </div>
    )
}