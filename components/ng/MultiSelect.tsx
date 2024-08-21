import React, { useState, useRef, useEffect } from 'react';

interface Option {
    value: string;
    label: string;
}

interface MultiSelectProps {
    options: Option[];
    selectedValues: string[];
    onChange: (selectedValues: string[]) => void;
    name: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedValues, onChange, name }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleToggleOption = (option: Option) => {
        const isSelected = selectedValues.includes(option.value);
        if (isSelected) {
            onChange(selectedValues.filter((value) => value !== option.value));
        } else {
            onChange([...selectedValues, option.value]);
        }
    };

    const handleToggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative min-w-[180px]" ref={dropdownRef}>
            <div className="border border-input rounded-lg px-3 py-2 bg-background  cursor-pointer relative text-sm shadow-sm" onClick={handleToggleDropdown}>
                <span>
                    {selectedValues.length === 0 ? (
                        `Select ${name}`
                    ) : selectedValues.length === 1 ? (
                        options.find(option => option.value === selectedValues[0])?.label
                    ) : (
                        `${selectedValues.length} ${name}s selected`
                    )}
                </span>
                <i className="ri-expand-up-down-line absolute right-[12px]"></i>
            </div>
            {isOpen && (
                <div className="absolute top-full left-0 right-0 border border-input overflow-y-hidden mt-1 max-h-[232px] z-10 rounded-lg shadow-md">
                    <input type="text" className="w-full border-b border-input px-3 py-2 focus:outline-none bg-background text-sm" placeholder="Search..." value={searchTerm} onChange={handleSearch}/>
                    <div className="custom-scrollbar overflow-y-auto max-h-48 p-1 bg-background">
                        {options
                            .filter((option) => option.label.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((option) => (
                                <label key={option.value} className={`font-sm relative cursor-pointer flex items-center px-5 text-sm py-2 bg-background transition rounded-lg hover:bg-accent`}>
                                    <input type="checkbox" className="hidden mr-2 cursor-pointer" checked={selectedValues.includes(option.value)} onChange={() => handleToggleOption(option)}/>
                                    {option.label}
                                    <i className={`ri-check-line absolute right-[10px] ${selectedValues.includes(option.value) ? 'block' : 'hidden'}`}></i>
                                </label>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
