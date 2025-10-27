import Select from "react-select";

const ThemeToggle = ({ theme, setTheme }) => {
  const options = [
    { value: "light", label: "☀️ Light" },
    { value: "dark", label: "🌙 Dark" },
    { value: "brand", label: "💻 Brand" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "var(--background_header)",
      border: "none",
      boxShadow: "none",
      borderRadius: "0.5rem",
      minHeight: "2.5rem",
      cursor: "pointer",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "var(--background_header)",
      borderRadius: "0.5rem",
      zIndex: 20,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(255,255,255,0.15)"
        : "transparent",
      color: "var(--color_text_header)",
      cursor: "pointer",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "var(--color_text_header)",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "var(--color_text_header)",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "var(--color_text_header)",
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  return (
    <div className="w-full">
      <Select
        options={options}
        value={options.find((opt) => opt.value === theme)}
        onChange={(selected) => setTheme(selected.value)}
        styles={customStyles}
        isSearchable={false} // biar kayak select biasa, tanpa input ketik
      />
    </div>
  );
};

export default ThemeToggle;
