const LetterTile = (props) => {

    return (
    <div key={props.id} style={{width: `${100 / props.cols}%`, minHeight: "2.8rem", maxHeight: "3.7rem", height: `calc(40vw / ${props.cols})`, maxWidth: "4rem", marginLeft: "0.2rem"}} className={`letterTile text-white text-capitalize fs-2 d-flex align-items-center justify-content-center border-3 flex-fill ${props.status}`}>
        {props.symbol}
    </div>
    );
};

export default LetterTile;
