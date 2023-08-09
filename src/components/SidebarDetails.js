 
import { CloudUpload, GetApp } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react"; 



const SidebarDetails = ({ selectedOption, getImageStyle }) => { 
    const [image, setImage] = useState(""); 
    const upload = (e) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        console.log(image);
    };
    return (
        <>
            <div
                style={{ 
                    display: "flex",
                    justifyContent:'end',
                    alignItems: "center", 
                    background: "#eee",
                    marginLeft: "-31px",
                    marginTop:'16px',
                    padding:'10px'
                }}
            >
                <div className="">
                    <input
                        accept="image/*" 
                        id="contained-button-file" 
                        type="file"
                        onChange={upload}
                        style={{display:'none'}}
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            startIcon={<CloudUpload style={{ fontSize: "30px" }} />}
                             
                        >
                            Upload
                        </Button>
                    </label>
                </div>
                <Button
          variant="contained"
          color="primary"
          component="a"
          download
          href={image}
          startIcon={<GetApp style={{ fontSize: "30px" }} />} 
        >
          download
        </Button>
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: "90%",
                    flexDirection: "column",
                    marginTop: "40px",
                }}
            >
                <div  >
                    <img 
                        src={image}
                        alt=""
                        style={getImageStyle()}
                        
                    />
                </div>
                <div style={{ padding: "10px", textAlign: "center" }}>
                    <h1 style={{ fontStyle: "italic", color: "orangered" }}>
                        {selectedOption.name}
                    </h1>
                </div>
            </div>
        </>
    );
};

export default SidebarDetails;
