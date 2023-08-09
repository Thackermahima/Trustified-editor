import Customize from "./Customize";
import Elements from "./Elements";
import Graphics from "./Graphics";
import Images from "./Images";
import Templates from "./Templates";
import Text from "./Text";
import UploadFile from "./UploadFile";

export const sidebarComponents=[
    {
        name:'Templates',
        components:<Templates/>
    },
    {
        name:'Elements',
        components:<Elements/>
    },
    {
        name:'Customize',
        components:<Customize/>
    },
    {
        name:'Images',
        components:<Images/>
    },
    {
        name:'Uploads',
        components:<UploadFile/>
    },
    {
        name:'Text',
        components:<Text/>
    }, 
    {
        name:'Graphics',
        components:<Graphics/>
    }
]