import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const categories = [
    "Arrays",
    "Strings",
    "Linked Lists",
    "Trees",
    "Dynamic Programming",
    "Depth-First Search (DFS)",
    "Breadth-First Search (BFS)",
    "Sorting",
    "Graphs",
    "Math",
    "Hashing",
    "Two Pointers",
    "Greedy",
    "Binary Search",
    "Recursion",
    "Backtracking",
    "Bit Manipulation",
    "Sliding Window",
    "Design",
    "SQL",
    "Database",
    "Object-Oriented Design",
    "Geometry"
];

const CategoryDropdown = ({ setCategories }) => {
    const handleCategoryChange = (event, newValue) => {
        setCategories(newValue);
    };

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={categories}
            disableCloseOnSelect
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => (
                <li {...props}>
                <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                />
                    {option}
                </li>
            )}
            style={{ width: '100%' }}
            onChange={handleCategoryChange}
            renderInput={(params) => (
                <TextField 
                    {...params} 
                    label="Question Categories" 
                    placeholder="Question Categories"
                />
            )}
        />
    );
}

export default CategoryDropdown;