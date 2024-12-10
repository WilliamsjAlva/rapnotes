import "../styles/background.css";

const Background = ({ theme }) => {
    return (
        <div className={`background ${theme}`}>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
            <div className="ball"></div>
        </div>
    );
};

export default Background;
