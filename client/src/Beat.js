const Beat = ({index, beatNumber}) => {
    const getBackgroundColour = () => {
        return index+1 === beatNumber ? 'cornflowerblue' : 'lightgreen';
    }

    return (
        <div key={index} className="Beat col mx-1" style={{ backgroundColor: getBackgroundColour() }}>
        </div>
    );
};

export default Beat;