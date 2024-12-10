import PropTypes from "prop-types";

function ErrorMessage({ message, type = "error" }) {
    if (!message) return null;

    const textColor = type === "error" ? "text-red-500" : "text-green-500";

    return <p className={`text-center ${textColor}`}>{message}</p>;
}

ErrorMessage.propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf(["error", "success"]),
};

export default ErrorMessage;
