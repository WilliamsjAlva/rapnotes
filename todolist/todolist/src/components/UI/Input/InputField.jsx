import PropTypes from "prop-types";

function InputField({ id, label, type, value, onChange, placeholder }) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-black dark:text-white">{label}</label>
            <input type={type} id={id} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full px-4 py-2 border border-black dark:border-white rounded-md text-black dark:text-white bg-transparent" placeholder={placeholder} required />
        </div>
    );
}

InputField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

InputField.defaultProps = {
    type: "text",
    placeholder: "",
};

export default InputField;
