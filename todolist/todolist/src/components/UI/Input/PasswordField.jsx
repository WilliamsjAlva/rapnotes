import PropTypes from "prop-types";

function PasswordField({ label, value, onChange, placeholder }) {
    return (
        <div>
            <label className="block text-sm font-medium text-black dark:text-white">{label}</label>
            <input type="password" value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full px-4 py-2 border rounded-md text-white bg-transparent" placeholder={placeholder} required />
        </div>
    );
}

PasswordField.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default PasswordField;
