import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle, faCog} from "@fortawesome/free-solid-svg-icons"

const HeaderOptions = (props) => {

  return (
    <div 
        className="headerOptions w-100 d-flex justify-content-between px-2">
        <button 
        style={{color: props.darkMode ? '#d6d6d6' : 'black', backgroundColor: props.darkMode ? '#3E3E3E' : 'white'}}
            className="headerButton border-0 fs-1" 
            onClick={() => props.toggleInfo(true)
        }>
            <i className="far fa-question-circle"></i>
        </button>
        <h1 className="appHeader mt-2">WORDLE ELDROW</h1>
        <button 
        style={{color: props.darkMode ? '#d6d6d6' : 'black', backgroundColor: props.darkMode ? '#3E3E3E' : 'white'}}
            className="headerButton border-0 fs-1" 
            onClick={() => props.toggleSettings(true)}>
            <FontAwesomeIcon icon={faCog}/>
        </button>
    </div>
);

};

export default HeaderOptions;
