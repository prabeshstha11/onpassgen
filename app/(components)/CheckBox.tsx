import { forwardRef } from "react";

type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement>;

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>((props, ref) => {
    return <input id="default-checkbox" type="checkbox" className="w-7 h-7 text-green bg-overlay0 border-overlay0 rounded-full focus:ring-overlay0 focus:ring-2 cursor-pointer" {...props} ref={ref} />;
});

export default CheckBox;
