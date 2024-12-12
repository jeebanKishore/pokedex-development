import React from "react";
import "./search.filter.scss";
import { Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";
type SearchFilterProps = {
    placeholder?: string,
    inputClass?: string,
    onChangeHandler?: (...args: any[]) => any,
    label?: any
};
const SearchFilter: React.FC<SearchFilterProps> = ({ placeholder, inputClass, onChangeHandler, ...props }) => {
    return (
        <>
            <div className="search-container">
                <div className="flex-col">
                    <div className="search-label">
                        <span>{props.label}</span>
                    </div>
                    <InputGroup {...props} inside className="mb-1">
                        <Input placeholder={placeholder} className={inputClass} size="lg" onChange={onChangeHandler} />
                        <InputGroup.Button>
                            <SearchIcon />
                        </InputGroup.Button>
                    </InputGroup>
                </div>
            </div>
        </>
    );
};
export default SearchFilter;
