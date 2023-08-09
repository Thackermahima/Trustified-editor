import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";
import { sidebarContext } from "../../context/SidebarContext";

const Templates = () => {
  const [data, setdata] = useState();
  const [loading, setLoaing] = useState(false);

  const SidebarContext = React.useContext(sidebarContext);
  const { selectCanvasElement } = SidebarContext;

  const getTemplates = async () => {
    setLoaing(true);
    const array = [];
    const q = query(collection(db, "Templates"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setdata(doc.data());
      array.push(doc.data());
    }); 
    setdata(array);
    setLoaing(false);
  };

  useEffect(() => {
    getTemplates();
  }, []);
 

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p>Templates</p>
        </div>
      </div>
      <div style={{ overflow: "scroll", height: "100vh" }}>
        <Grid container spacing={2} className="imagesContainer">
          {loading && (
            <CircularProgress
              style={{ margin: "auto", marginTop: "60px" }}
            ></CircularProgress>
          )}
          {data &&
            data.map((temp, index) => (
              <Grid item key={index} xs={12} sm={8} md={8} lg={6}>
                <img
                  src={temp.preview}
                  alt={`Image ${index + 1}`}
                  style={{ width: "100%",minWidth:'100px',minHeight:'100px'}}
                  onClick={() => selectCanvasElement(temp.preview)}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default Templates;
