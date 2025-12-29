import { ToolTip } from "../ui/ToolTip";

const Label = ({ children, htmlFor,toolTipText, className }: { children: React.ReactNode; htmlFor?: string; toolTipText?: string; className?: string }) => {
	return (
		<label htmlFor={htmlFor} className={`min-w-30 flex gap-2 items-stretch shrink-0 md:basis-auto basis-full text-base font-semibold capitalize ${className}`}>
			{children}
			{toolTipText && (<ToolTip text={toolTipText} />)}
		</label>
	);
};

export default Label;