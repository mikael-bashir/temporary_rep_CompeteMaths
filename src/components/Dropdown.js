import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, placeholder, className, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev); // basic toggler

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm(''); // Clear search term on selection
    onSelect?.(option);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // Filter options based on search term
    const newFilteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(newFilteredOptions);
  }, [searchTerm, options]);

  useEffect(() => {
    // Close dropdown when clicking outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={className} ref={dropdownRef}>
      <div className="dropdown-header" onClick={toggleDropdown}>
        {selectedOption ? selectedOption.label : placeholder}
      </div>
      {isOpen && (
        <div className="dropdown-list">
          <input
            type="text"
            className="dropdown-search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="dropdown-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label} { /* display the label */}
            </div>
          ))}
          {filteredOptions.length === 0 && <div className="dropdown-option">No options available</div>}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
