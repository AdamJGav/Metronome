const Beat = ({index, beatNumber}) => {
    const getBackgroundColour = () => {
        return index+1 === beatNumber ? 'lightblue' : 'lightgreen';
    }

    return (
        <div key={index} className="Beat col mx-1" style={{ backgroundColor: getBackgroundColour() }}>
            {/* {index+1}
            {beatNumber} */}
        </div>
    );
};

export default Beat;