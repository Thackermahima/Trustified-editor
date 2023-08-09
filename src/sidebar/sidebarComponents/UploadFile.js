import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import { InputBase } from '@mui/material';
import { Grid, Box, Typography, Tabs, Tab, Input, useTheme, CircularProgress, Backdrop } from '@mui/material';
import { blue } from '@mui/material/colors';
import PropTypes from 'prop-types';
import { storage, db } from '../../firebase';
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import 'firebase/compat/firestore';
import { sidebarContext } from "../../context/SidebarContext";
import SearchBar from './SearchBar';
import { CanvasContext } from '../../context/CanvasContext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

 
 


const StyledTab = styled(Tab)(({ theme }) => ({
  color: 'white', // Set the text color to white
  textTransform: 'capitalize',
  '&.Mui-selected': {
    color: 'white', // Set the text color to white for the active tab
  },
  '&.Mui-selected .MuiTab-wrapper': {
    borderBottom: `2px solid ${theme.palette.secondary.main}`, // Set the underline color for the active tab
  },
}));



const UploadButton = styled('label')(({ theme }) => ({ 
  cursor: 'pointer', 
  display:'flex',
  padding:'10px',
  width: '100%',
  margin:'2px auto',
  textAlign:'center',
  borderRadius: '5px',
  backgroundColor: '#334CFF', 
  '&:hover': {
    backgroundColor: blue[800],
  },
  '& input': {
    display: 'none', 
  }, 
  alignItems: 'center',
  justifyContent: 'center', 
})); 



const UploadFile = () => {
  const [file, setFile] = useState(null);
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [imgUrl, setImgUrl] = useState([]);
  const [gif, setGif] = useState([]);
  const [progress, setProgress] = useState(0);

  const SidebarContext = React.useContext(sidebarContext);
  const { selectCanvasElement } = SidebarContext;

  const canvasContext = React.useContext(CanvasContext);
  const {setSelectedElement} = canvasContext;

  const handleImageClick = (url) => {
    setSelectedElement(url); // This sets the selectedElement in the context
    console.log(url,"url");
  };
console.log(setSelectedElement,"uploadfile");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handlefile = (e) => {
    const file = e?.target?.files[0];
    setFile(file);
  };

  const handleSubmit = (e) => {
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          const dbRef = collection(db, 'uploads');
          console.log(dbRef);

          const data = {
            imgUrl: downloadURL,
            file: file.name || null
          };
          addDoc(dbRef, data)
            .then(docRef => {
              console.log("Document has been added successfully", docRef.id);
            })
            .catch(error => {
              console.log(error);
            })
            .finally(() => {
              setProgress(0);
            });
        });
      },
      (error) => {
        console.log(error, "error after getDownloadURL");
      }

    );
  }

  const getCollection = async () => {
    const colRef = collection(db, 'uploads');
    try {
      const docsSnap = await getDocs(colRef);
      if (docsSnap.docs.length > 0) {
        const imgUrlsArr = [];
        const gifArr = [];
        docsSnap.docs.forEach((doc) => {
          const data = doc.data();
          if (data.file) {
            if (data.file.endsWith('.jpg') || data.file.endsWith('.jpeg') || data.file.endsWith('.png')) {
              imgUrlsArr.push(data.imgUrl);
            } else if (data.file.endsWith('.gif')) {
              gifArr.push(data.imgUrl);
            }
          }
        });
        setImgUrl(imgUrlsArr);
        setGif(gifArr);
      }
    } catch (err) {
      console.log(err, "err from getCollection");
    }
  }
  const ImageGrid = ({ imgUrl, type }) => {
    const renderImage = (url) => {
      console.log(url,"url");
      return (
        <Grid item xs={12} sm={6} md={4} lg={4} spacing={2} key={url}> {/* Set columns based on type */}
          <img src={url} alt='uploaded file' height={70} width={50} onClick={() => handleImageClick(url)}  />
        </Grid>
      );
    };

    const renderGif = (url) => {
      return (
        <Grid item xs={12} key={url}>
          <Grid item xs={12} sm={6} md={4} lg={4} spacing={2} key={url}> {/* Set columns based on type */}
            <img src={url} alt='uploaded file' height={70} width={50} onClick={() => handleImageClick(url)}  />
          </Grid>
        </Grid>
      );
    };



    const renderFile = (url) => {
      switch (type) {
        case 'image':
          return renderImage(url);
        case 'gif':
          return renderGif(url);
        default:
          return null;
      }
    };

    return (
      <Grid container spacing={2}>
        {imgUrl.map((url) => renderFile(url))}
      </Grid>
    );
  };

  useEffect(() => {
    handleSubmit();
  }, [file]);

  useEffect(() => {
    getCollection();
    const unsubscribe = onSnapshot(collection(db, 'uploads'), (snapshot) => {
      const newImgUrlsArr = [];
      const newGifArr = [];
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.file) {
          if (data.file.endsWith('.jpg') || data.file.endsWith('.jpeg') || data.file.endsWith('.png')) {
            newImgUrlsArr.push(data.imgUrl);
          } else if (data.file.endsWith('.gif')) {
            newGifArr.push(data.imgUrl);
          }
        }
      });
      setImgUrl(newImgUrlsArr);
      setGif(newGifArr);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <SearchBar id="upload" />
      <UploadButton htmlFor="file-input">
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Upload Files</Typography>
        <Input
          id="file-input"
          type="file"
          accept=".jpg, .jpeg, .png, .gif"
          onChange={handlefile}
        />
      </UploadButton>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="full width tabs example"
      >
        <StyledTab label="Image" {...a11yProps(0)} />
        <StyledTab label="Gif" {...a11yProps(1)} /> 

      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <ImageGrid imgUrl={imgUrl} type="image" />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <ImageGrid imgUrl={gif} type="gif" />
      </TabPanel>
    </div>

  );
};

export default UploadFile;