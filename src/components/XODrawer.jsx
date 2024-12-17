import './XODrawer.css';
import ODrawer from "../components/ODrawer";
import XDrawer from "../components/XDrawer";

const XODrawer = ({ value, alternate, width, height }) => {
    return <>
    <div style={{width: width, height: height}} className="XODrawer">
        <div style={{width: width, height: height}}> <ODrawer visible={value === 'O' ? !alternate : null}/> </div>
        <div style={{width: width, height: height}}> <XDrawer visible={value === 'X' ? !alternate : null}/> </div>
    </div>
    </>
}

export default XODrawer;