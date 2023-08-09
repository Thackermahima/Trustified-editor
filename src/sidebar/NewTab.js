import React from 'react';
import { sidebarComponents } from './sidebarComponents';
import { ArrowBackIos } from '@mui/icons-material';

const TabMtr = ({ handleCloseSidebar, selectedOption }) => {
    
    return (
        <div
            style={{
                background: "#293039",
                color: "white", 
                height: '100vh',
                width:'240px',
                position: 'relative', 
            }}
        >
            {
                sidebarComponents.map((doc, i) => {
                    if (doc.name === selectedOption.name) {
                        return (
                            <div  style={{marginTop:'50px', padding:'10px',width:'240px'}}>
                                {doc.components}
                            </div>
                        )
                    } 
                })
            }
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#293039",
                    height: "50px",
                    width: "50px",
                    top: '45%',
                    right: '-24px',
                    position: 'absolute',
                    borderRadius: '0px 25px',
                    transform: 'rotate(45deg)',
                    cursor: 'pointer',
                    zIndex:99
                }}
                onClick={handleCloseSidebar}
            >
                <ArrowBackIos style={{ transform: 'rotate(-40deg)' }} />
            </div>
        </div>
    );
};

export default TabMtr;
