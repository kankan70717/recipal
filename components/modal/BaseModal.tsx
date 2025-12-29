'use client';

import { X } from "lucide-react";

const BaseModal = ({ title, isOpen, onClose, children }: { title: string, isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {

	return (
		<div
			className={`fixed inset-0 z-100 flex items-center justify-center bg-black/50 transition-opacity 
				${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
			onClick={onClose}>
			<div
				className={`md:max-h-none max-h-[70vh] bg-white md:p-10 p-5 md:rounded-2xl rounded-t-2xl md:static absolute md:w-auto w-full bottom-0 transform md:transition-none transition-transform duration-300 ease-out md:translate-y-none ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
				onClick={(e) => e.stopPropagation()}>
				<div className="absolute md:right-10 right-5 md:left-10 left-5 flex justify-between items-center bg-white">
					<h3 className="text-2xl font-semibold">{title}</h3>
					<X className="cursor-pointer" width={30} height={30} onClick={onClose} />
				</div>
				{children}
			</div>
		</div>
	);
};

export default BaseModal;