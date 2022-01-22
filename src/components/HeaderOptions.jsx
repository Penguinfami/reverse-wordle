import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faQuestionCircle, faCog} from "@fortawesome/free-solid-svg-icons"

const HeaderOptions = (props) => {

  return (
    <div className="headerOptions w-100 d-flex justify-content-between px-2">
        <button className="border-0 fs-1" 
            onClick={() => props.toggleInfo(true)
        }>
            <i class="far fa-question-circle"></i>
        </button>
        <h1>Reverse Wordle</h1>
        <button className="border-0 fs-1" 
            onClick={() => props.toggleSettings(true)}>
            <FontAwesomeIcon icon={faCog}/>
        </button>
    </div>
);

};

export default HeaderOptions;
